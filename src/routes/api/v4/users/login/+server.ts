import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { login_id, password } = body;

	if (!login_id || !password) {
		throw error(400, 'Vui lòng nhập tên đăng nhập/email và mật khẩu');
	}

	const user = db.users.find(
		(u) => (u.username === login_id || u.email === login_id) && u.password_hash === password
	);

	if (!user) {
		throw error(401, 'Tên đăng nhập hoặc mật khẩu không chính xác');
	}

	return json({
		id: user.id,
		username: user.username,
		email: user.email,
		display_name: user.display_name,
		role: user.role,
		token: `tk_${user.id}_${Date.now()}`
	});
};
