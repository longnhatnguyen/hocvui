<script lang="ts">
	import { page } from '$app/state';
	import { SEED_SUBJECTS, SEED_COURSES } from '$lib/data/seed-data';
	import {
		ChevronRight,
		BookOpen,
		Star,
		BadgeCheck,
		Sigma,
		PenTool,
		Languages,
		ArrowRight
	} from 'lucide-svelte';

	const slug = $derived(page.params.slug || '');

	const subject = $derived(SEED_SUBJECTS.find((s) => s.slug === slug));
	const parentSubject = $derived(
		subject?.parent_id ? SEED_SUBJECTS.find((s) => s.id === subject.parent_id) : null
	);
	const childSubjects = $derived(
		subject ? SEED_SUBJECTS.filter((s) => s.parent_id === subject.id) : []
	);

	const subjectCourses = $derived(
		SEED_COURSES.filter((c) => {
			if (!subject) return false;
			if (c.subject.id === subject.id || c.subject.slug === subject.slug) return true;
			return childSubjects.some((child) => child.id === c.subject.id || child.slug === c.subject.slug);
		})
	);
</script>

<svelte:head>
	<title>{subject ? `${subject.name} · Môn học · Học Vui` : 'Môn học · Học Vui'}</title>
</svelte:head>

<div class="page-container space-y-8 py-10">
	{#if subject}
		<!-- BREADCRUMB -->
		<nav class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm" aria-label="Breadcrumb">
			<a href="/courses" class="hover:text-foreground transition-colors">Khóa học</a>
			{#if parentSubject}
				<ChevronRight class="size-4" />
				<a href="/subjects/{parentSubject.slug}" class="hover:text-foreground transition-colors">
					{parentSubject.name}
				</a>
			{/if}
			<ChevronRight class="size-4" />
			<span class="text-foreground font-semibold">{subject.name}</span>
		</nav>

		<!-- SUBJECT HEADER -->
		<div class="bg-card flex flex-wrap items-center justify-between gap-6 rounded-3xl border p-8 shadow-xs">
			<div class="flex items-center gap-4">
				<span class="bg-primary/10 text-primary inline-flex rounded-2xl p-4">
					{#if subject.icon === 'sigma'}
						<Sigma class="size-8" />
					{:else if subject.icon === 'pen-tool'}
						<PenTool class="size-8" />
					{:else}
						<Languages class="size-8" />
					{/if}
				</span>
				<div class="space-y-1">
					<h1 class="text-3xl font-extrabold tracking-tight">{subject.name}</h1>
					<p class="text-muted-foreground text-sm">
						{subjectCourses.length} khóa học trực tuyến đang mở · Học trực tiếp với giáo viên đã xác minh
					</p>
				</div>
			</div>
			<a
				href="/courses?subject={subject.slug}"
				class="bg-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary/90"
			>
				Lọc nâng cao trong danh mục <ArrowRight class="size-4" />
			</a>
		</div>

		<!-- SUB-SUBJECTS -->
		{#if childSubjects.length > 0}
			<section class="space-y-4">
				<h2 class="text-lg font-bold">Môn học thuộc {subject.name}</h2>
				<div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{#each childSubjects as child}
						<a
							href="/subjects/{child.slug}"
							class="bg-card hover:border-primary/40 flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold shadow-xs transition-all hover:shadow-sm"
						>
							<span>{child.name}</span>
							<span class="text-muted-foreground text-xs">{child.course_count} khóa</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- COURSES IN THIS SUBJECT -->
		<section class="space-y-4">
			<h2 class="text-xl font-bold">Các khóa học {subject.name}</h2>
			{#if subjectCourses.length > 0}
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each subjectCourses as course}
						<article
							class="bg-card group flex flex-col overflow-hidden rounded-2xl border shadow-xs transition-all hover:shadow-md"
						>
							<a href="/courses/{course.slug}" class="bg-muted relative aspect-video overflow-hidden">
								<img
									src={course.cover_image_url}
									alt={course.name}
									class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<span
									class="absolute top-3 left-3 rounded-lg bg-black/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur"
								>
									{course.subject.name}
								</span>
							</a>

							<div class="flex flex-1 flex-col space-y-3 p-5">
								<div class="flex items-center justify-between gap-2 text-xs">
									<span class="text-muted-foreground font-medium">
										{course.total_sessions} buổi · {course.duration_per_session} phút/buổi
									</span>
									{#if course.rating_count > 0}
										<span class="inline-flex items-center gap-1 font-semibold text-amber-500">
											<Star class="size-3.5 fill-amber-400 text-amber-400" />
											{course.rating_avg.toFixed(1)}
											<span class="text-muted-foreground">({course.rating_count})</span>
										</span>
									{/if}
								</div>

								<a href="/courses/{course.slug}" class="block">
									<h3 class="group-hover:text-primary line-clamp-1 text-lg font-bold transition-colors">
										{course.name}
									</h3>
								</a>

								<p class="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
									{course.headline}
								</p>

								<div class="mt-auto flex items-center justify-between border-t pt-3">
									<a
										href="/teachers/{course.teacher.username}"
										class="flex items-center gap-2 text-xs font-medium hover:underline"
									>
										<span
											class="flex size-7 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white"
										>
											{course.teacher.display_name.charAt(0)}
										</span>
										<span>{course.teacher.display_name}</span>
										{#if course.teacher.verified}
											<BadgeCheck class="size-3.5 text-blue-600 dark:text-blue-400" />
										{/if}
									</a>

									<span
										class="text-sm font-extrabold {course.price_type === 'FREE'
											? 'text-green-600 dark:text-green-400'
											: 'text-foreground'}"
									>
										{course.price_type === 'FREE'
											? 'Miễn phí'
											: `${Number(course.price).toLocaleString('vi-VN')} ₫ / buổi`}
									</span>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{:else}
				<div class="bg-muted/20 space-y-3 rounded-2xl border py-14 text-center">
					<BookOpen class="text-muted-foreground mx-auto size-10" />
					<h3 class="text-lg font-bold">Chưa có khóa học nào trong môn {subject.name}</h3>
					<p class="text-muted-foreground mx-auto max-w-md text-sm">
						Hãy gửi yêu cầu tìm khóa học ở trang Danh mục khóa học, đội ngũ sẽ tìm giáo viên có thể mở khóa học đó.
					</p>
					<a
						href="/courses"
						class="bg-primary mt-2 inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white"
					>
						Xem tất cả khóa học
					</a>
				</div>
			{/if}
		</section>
	{:else}
		<div class="space-y-4 py-16 text-center">
			<h1 class="text-2xl font-bold">Không tìm thấy môn học</h1>
			<a href="/courses" class="text-primary font-semibold hover:underline">Quay về danh mục khóa học</a>
		</div>
	{/if}
</div>
