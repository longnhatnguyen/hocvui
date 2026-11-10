import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json({
		items: db.subjects,
		total_count: db.subjects.length
	});
};
