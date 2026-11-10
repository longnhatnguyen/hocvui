import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { username } = params;
	const teacher = db.teachers.find((t) => t.username === username || t.id === username);

	if (!teacher) {
		throw error(404, 'Giáo viên không tồn tại');
	}

	const courses = db.courses.filter((c) => c.teacher.id === teacher.id);

	return json({
		...teacher,
		courses
	});
};
