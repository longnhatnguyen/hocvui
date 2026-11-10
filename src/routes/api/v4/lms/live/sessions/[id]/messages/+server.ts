import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const messages = db.messages.filter((m) => m.channel_id === id);
	return json({ items: messages });
};

export const POST: RequestHandler = async ({ params, request }) => {
	const { id } = params;
	const body = await request.json();
	const { sender_id = 'user', sender_name = 'Người dùng', sender_role = 'student', content } = body;

	if (!content || !content.trim()) {
		throw error(400, 'Nội dung tin nhắn không được rỗng');
	}

	const newMsg = {
		id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
		channel_id: id,
		sender_id,
		sender_name,
		sender_role,
		content: content.trim(),
		timestamp: Date.now()
	};

	db.messages.push(newMsg);
	return json(newMsg);
};
