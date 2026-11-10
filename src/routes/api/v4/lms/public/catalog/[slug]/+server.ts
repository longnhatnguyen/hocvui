import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;
	const course = db.courses.find((c) => c.slug === slug || c.id === slug);

	if (!course) {
		throw error(404, 'Khóa học không tồn tại');
	}

	return json(course);
};
