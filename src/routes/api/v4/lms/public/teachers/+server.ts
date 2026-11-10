import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json({
		items: db.teachers,
		total_count: db.teachers.length
	});
};
