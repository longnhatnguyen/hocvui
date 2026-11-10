import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const room = db.rooms.find((r) => r.id === id);

	if (!room) {
		// Auto-create room if not found to allow joining any room link!
		const autoRoom = {
			id,
			name: `Phòng học ${id}`,
			creator_id: 'host',
			created_at: Date.now(),
			members_count: 1,
			max_members: 20,
			status: 'active' as const
		};
		db.rooms.push(autoRoom);
		return json(autoRoom);
	}

	return json(room);
};
