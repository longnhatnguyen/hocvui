import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { username, email, password, display_name, role = 'student' } = body;

	if (!username || !email || !password || !display_name) {
		throw error(400, 'Vui lòng điền đầy đủ thông tin');
	}

	const existingUser = db.users.find((u) => u.username === username || u.email === email);
	if (existingUser) {
		throw error(409, 'Tên đăng nhập hoặc email đã được sử dụng');
	}

	const newUser = {
		id: `usr_${Date.now()}`,
		username,
		email,
		password_hash: password,
		display_name,
		role: role as 'student' | 'teacher',
		created_at: Date.now()
	};

	db.users.push(newUser);

	// If teacher, also create a teacher profile
	if (role === 'teacher') {
		db.teachers.push({
			id: newUser.id,
			username: newUser.username,
			display_name: newUser.display_name,
			headline: 'Giáo viên mới gia nhập Học Vui',
			rating_avg: 5.0,
			rating_count: 0,
			student_count: 0,
			course_count: 0,
			last_picture_update: Date.now(),
			verified: false,
			subjects: []
		});
	}

	return json({
		id: newUser.id,
		username: newUser.username,
		email: newUser.email,
		display_name: newUser.display_name,
		role: newUser.role,
		token: `tk_${newUser.id}_${Date.now()}`
	});
};
