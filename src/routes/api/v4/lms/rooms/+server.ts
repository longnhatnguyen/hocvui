import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json({
		items: db.rooms,
		total_count: db.rooms.length
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { name, creator_id = 'guest', max_members = 15 } = body;

	if (!name) {
		throw error(400, 'Tên phòng không được để trống');
	}

	const newRoom = {
		id: `room_${Date.now()}`,
		name,
		creator_id,
		created_at: Date.now(),
		members_count: 1,
		max_members: Number(max_members) || 15,
		status: 'active' as const
	};

	db.rooms.unshift(newRoom);

	return json(newRoom);
};
