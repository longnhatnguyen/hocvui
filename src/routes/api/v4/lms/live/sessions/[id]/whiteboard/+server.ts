import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const wb = db.getWhiteboard(id);
	return json(wb);
};

export const POST: RequestHandler = async ({ params, request }) => {
	const { id } = params;
	const body = await request.json();
	const { lines = [], text_elements = [], locked = false } = body;

	const updated = db.saveWhiteboard(id, lines, text_elements, locked);
	return json(updated);
};

export const PUT: RequestHandler = async ({ params, request }) => {
	const { id } = params;
	const body = await request.json();
	const { lines = [], text_elements = [], locked = false } = body;

	const updated = db.saveWhiteboard(id, lines, text_elements, locked);
	return json(updated);
};
