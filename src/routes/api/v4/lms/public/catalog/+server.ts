import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q')?.toLowerCase() || '';
	const subjectSlug = url.searchParams.get('subject') || '';
	const level = url.searchParams.get('level') || '';
	const priceType = url.searchParams.get('price_type') || '';
	const sort = url.searchParams.get('sort') || '';

	let items = db.courses.filter((course) => {
		if (q) {
			const matchTitle = course.name.toLowerCase().includes(q);
			const matchHeadline = course.headline.toLowerCase().includes(q);
			const matchTeacher = course.teacher.display_name.toLowerCase().includes(q);
			if (!matchTitle && !matchHeadline && !matchTeacher) return false;
		}

		if (subjectSlug && course.subject.slug !== subjectSlug) {
			return false;
		}

		if (level && course.level !== level) {
			return false;
		}

		if (priceType && course.price_type !== priceType) {
			return false;
		}

		return true;
	});

	if (sort === 'starting_soon') {
		items = [...items].sort((a, b) => a.next_class_start - b.next_class_start);
	}

	return json({
		items,
		total_count: items.length
	});
};
