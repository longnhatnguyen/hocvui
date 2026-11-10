<script lang="ts">
	import { page } from '$app/state';
	import { SEED_SUBJECTS, SEED_COURSES } from '$lib/data/seed-data';
	import {
		Search,
		Star,
		Clock,
		BookOpen,
		BadgeCheck,
		CheckCircle2,
		CalendarDays,
		X
	} from 'lucide-svelte';

	let searchQuery = $state(page.url.searchParams.get('q') || '');
	let selectedSubject = $state(page.url.searchParams.get('subject') || 'all');
	let selectedLevel = $state(page.url.searchParams.get('level') || 'all');
	let selectedPrice = $state(page.url.searchParams.get('price') || 'all');
	let sortBy = $state(page.url.searchParams.get('sort') || 'rating');
	let openOnly = $state(false);

	// Course Request Modal / Form state
	let showRequestForm = $state(false);
	let requestKind = $state<'COURSE' | 'CLASS'>('COURSE');
	let requestWhat = $state('');
	let requestDetails = $state('');
	let requestSent = $state(false);

	const rootSubjects = $derived(SEED_SUBJECTS.filter((s) => !s.parent_id));

	const filteredCourses = $derived.by(() => {
		const list = SEED_COURSES.filter((course) => {
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase();
				const matchName = course.name.toLowerCase().includes(q);
				const matchHeadline = course.headline.toLowerCase().includes(q);
				const matchTeacher = course.teacher.display_name.toLowerCase().includes(q);
				const matchSubject = course.subject.name.toLowerCase().includes(q);
				if (!matchName && !matchHeadline && !matchTeacher && !matchSubject) return false;
			}

			if (selectedSubject !== 'all') {
				const isDirect = course.subject.slug === selectedSubject;
				const parentSubj = SEED_SUBJECTS.find((s) => s.slug === selectedSubject);
				const isChild = parentSubj
					? SEED_SUBJECTS.some(
							(s) => s.parent_id === parentSubj.id && s.slug === course.subject.slug
						)
					: false;
				if (!isDirect && !isChild) return false;
			}

			if (selectedLevel !== 'all' && course.level !== selectedLevel) {
				return false;
			}

			if (selectedPrice === 'free' && course.price_type !== 'FREE') {
				return false;
			}
			if (selectedPrice === 'paid' && course.price_type === 'FREE') {
				return false;
			}

			if (openOnly && course.open_class_count <= 0) {
				return false;
			}

			return true;
		});

		return [...list].sort((a, b) => {
			if (sortBy === 'starting_soon') return a.next_class_start - b.next_class_start;
			if (sortBy === 'price_asc') return Number(a.price) - Number(b.price);
			if (sortBy === 'price_desc') return Number(b.price) - Number(a.price);
			if (sortBy === 'newest') return b.published_at - a.published_at;
			return b.rating_avg - a.rating_avg;
		});
	});

	function clearFilters() {
		searchQuery = '';
		selectedSubject = 'all';
		selectedLevel = 'all';
		selectedPrice = 'all';
		openOnly = false;
	}

	function submitCourseRequest(e: SubmitEvent) {
		e.preventDefault();
		if (requestWhat.trim().length >= 3) {
			requestSent = true;
			requestWhat = '';
			requestDetails = '';
		}
	}
</script>

<svelte:head>
	<title>Khóa học · Học Vui</title>
</svelte:head>

<div class="page-container space-y-8 py-10">
	<!-- HEADER TITLE & SEARCH -->
	<div class="space-y-4">
		<h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">Khóa học</h1>
		<p class="text-muted-foreground max-w-2xl leading-relaxed">
			Các lớp học trực tuyến do giáo viên đã xác minh giảng dạy. Học tại nhà — học viên không trả
			phí nền tảng.
		</p>

		<!-- SEARCH BOX -->
		<div class="relative max-w-xl">
			<Search class="text-muted-foreground absolute top-1/2 left-3.5 size-5 -translate-y-1/2" />
			<input
				type="search"
				bind:value={searchQuery}
				placeholder="Tìm theo khóa học, chủ đề hoặc giáo viên..."
				aria-label="Tìm theo khóa học, chủ đề hoặc giáo viên..."
				class="bg-card w-full rounded-xl border py-3 pr-4 pl-11 text-sm shadow-xs outline-none focus:ring-2 focus:ring-primary"
			/>
		</div>
	</div>

	<!-- SUBJECT PILLS -->
	<div class="flex items-center gap-2 overflow-x-auto pb-1">
		<button
			type="button"
			onclick={() => (selectedSubject = 'all')}
			class="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all {selectedSubject ===
			'all'
				? 'bg-primary text-white shadow-xs'
				: 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'}"
		>
			Tất cả môn học
		</button>
		{#each rootSubjects as subj}
			<button
				type="button"
				onclick={() => (selectedSubject = subj.slug)}
				class="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all {selectedSubject ===
				subj.slug
					? 'bg-primary text-white shadow-xs'
					: 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'}"
			>
				{subj.name}
			</button>
		{/each}
	</div>

	<!-- FILTERS BAR -->
	<div class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
		<div class="flex flex-wrap items-center gap-3 text-sm">
			<!-- Trình độ -->
			<select
				bind:value={selectedLevel}
				aria-label="Trình độ"
				class="bg-card rounded-xl border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="all">Tất cả trình độ</option>
				<option value="BEGINNER">Cơ bản</option>
				<option value="INTERMEDIATE">Trung bình</option>
				<option value="ADVANCED">Nâng cao</option>
				<option value="EXPERT">Chuyên gia</option>
			</select>

			<!-- Học phí -->
			<select
				bind:value={selectedPrice}
				aria-label="Học phí"
				class="bg-card rounded-xl border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="all">Tất cả mức giá</option>
				<option value="free">Miễn phí</option>
				<option value="paid">Có phí</option>
			</select>

			<!-- Sắp xếp -->
			<select
				bind:value={sortBy}
				aria-label="Sắp xếp theo"
				class="bg-card rounded-xl border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="rating">Đánh giá cao nhất</option>
				<option value="starting_soon">Sắp khai giảng</option>
				<option value="price_asc">Giá: thấp đến cao</option>
				<option value="price_desc">Giá: cao đến thấp</option>
				<option value="newest">Mới nhất</option>
			</select>

			<!-- Chỉ khóa còn lớp đang mở -->
			<label class="inline-flex cursor-pointer items-center gap-2 text-xs font-medium">
				<input
					type="checkbox"
					bind:checked={openOnly}
					class="accent-primary size-4 rounded"
				/>
				<span>Chỉ khóa còn lớp đang mở</span>
			</label>

			{#if searchQuery || selectedSubject !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all' || openOnly}
				<button
					type="button"
					onclick={clearFilters}
					class="text-primary inline-flex cursor-pointer items-center gap-1 text-xs font-semibold hover:underline"
				>
					<X class="size-3.5" /> Xóa bộ lọc
				</button>
			{/if}
		</div>

		<div class="text-muted-foreground text-sm font-medium">
			{filteredCourses.length} khóa học
		</div>
	</div>

	<!-- COURSE GRID -->
	{#if filteredCourses.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredCourses as course}
				<article
					class="bg-card group flex flex-col overflow-hidden rounded-2xl border shadow-xs transition-all duration-200 hover:shadow-md"
				>
					<!-- Cover Image -->
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
						{#if course.open_class_count > 0}
							<span
								class="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-lg bg-green-600/90 px-2.5 py-1 text-[11px] font-bold text-white"
							>
								<CalendarDays class="size-3" /> Còn {course.open_class_count} lớp đang mở
							</span>
						{/if}
					</a>

					<!-- Content -->
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
							{:else}
								<span class="text-muted-foreground">Chưa có đánh giá</span>
							{/if}
						</div>

						<a href="/courses/{course.slug}">
							<h2
								class="group-hover:text-primary line-clamp-1 text-lg leading-snug font-bold transition-colors"
							>
								{course.name}
							</h2>
						</a>

						<p class="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
							{course.headline}
						</p>

						<!-- Teacher & Price -->
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
		<div class="bg-muted/20 space-y-3 rounded-2xl border py-16 text-center">
			<BookOpen class="text-muted-foreground mx-auto size-12" />
			<h3 class="text-lg font-bold">Không tìm thấy khóa học</h3>
			<p class="text-muted-foreground mx-auto max-w-md text-sm">
				Hãy thử từ khóa khác hoặc bỏ bớt bộ lọc để xem thêm khóa học.
			</p>
			<button
				type="button"
				onclick={clearFilters}
				class="bg-primary mt-2 cursor-pointer rounded-xl px-4 py-2 text-xs font-bold text-white"
			>
				Xóa bộ lọc
			</button>
		</div>
	{/if}

	<!-- COURSE REQUEST CTA & FORM -->
	<section class="bg-card mt-12 rounded-3xl border p-6 md:p-8 shadow-xs">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="space-y-1">
				<h2 class="text-xl font-bold">Không tìm thấy khóa học bạn cần?</h2>
				<p class="text-muted-foreground text-sm">
					Hãy cho chúng tôi biết bạn đang tìm gì, đội ngũ sẽ tìm giáo viên có thể mở khóa học đó.
				</p>
			</div>
			{#if !showRequestForm}
				<button
					type="button"
					onclick={() => (showRequestForm = true)}
					class="bg-primary hover:bg-primary/90 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-xs transition-all"
				>
					Gửi yêu cầu tìm khóa học
				</button>
			{/if}
		</div>

		{#if showRequestForm}
			<div class="mt-6 border-t pt-6">
				{#if requestSent}
					<div
						class="flex items-center gap-2 rounded-xl bg-green-500/15 p-4 text-sm font-semibold text-green-700 dark:text-green-300"
					>
						<CheckCircle2 class="size-5 shrink-0" />
						<span>Đã gửi yêu cầu. Đội ngũ sẽ tìm giáo viên và phản hồi bạn.</span>
					</div>
				{:else}
					<form onsubmit={submitCourseRequest} class="max-w-2xl space-y-4">
						<h3 class="text-base font-bold">Yêu cầu một khóa học hoặc lớp học</h3>
						<div class="space-y-2">
							<span class="text-xs font-semibold">Tôi đang tìm</span>
							<div class="grid gap-2 sm:grid-cols-2">
								<label
									class="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-xs font-medium {requestKind ===
									'COURSE'
										? 'border-primary bg-primary/5'
										: ''}"
								>
									<input
										type="radio"
										name="kind"
										value="COURSE"
										bind:group={requestKind}
										class="accent-primary"
									/>
									<span>Một khóa học chưa có ai mở</span>
								</label>
								<label
									class="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-xs font-medium {requestKind ===
									'CLASS'
										? 'border-primary bg-primary/5'
										: ''}"
								>
									<input
										type="radio"
										name="kind"
										value="CLASS"
										bind:group={requestKind}
										class="accent-primary"
									/>
									<span>Một lớp học (giờ học, trình độ) của một khóa học</span>
								</label>
							</div>
						</div>

						<div class="space-y-1.5">
							<label for="req-what" class="text-xs font-semibold">Bạn muốn học gì?</label>
							<input
								id="req-what"
								type="text"
								required
								minlength="3"
								bind:value={requestWhat}
								placeholder="Ví dụ: piano cho người lớn, IELTS speaking 6.5"
								class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						<div class="space-y-1.5">
							<label for="req-details" class="text-xs font-semibold"
								>Chi tiết (không bắt buộc)</label
							>
							<textarea
								id="req-details"
								rows="3"
								bind:value={requestDetails}
								placeholder="Trình độ hiện tại, mục tiêu, ngày giờ có thể học, ngân sách…"
								class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
							></textarea>
							<p class="text-muted-foreground text-xs">
								Càng nhiều thông tin, chúng tôi càng tìm được giáo viên phù hợp nhanh hơn.
							</p>
						</div>

						<div class="flex gap-2">
							<button
								type="submit"
								class="bg-primary hover:bg-primary/90 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-bold text-white"
							>
								Gửi yêu cầu
							</button>
							<button
								type="button"
								onclick={() => (showRequestForm = false)}
								class=" hover:bg-accent cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium"
							>
								Hủy
							</button>
						</div>
					</form>
				{/if}
			</div>
		{/if}
	</section>
</div>
