<script lang="ts">
	import { SEED_TEACHERS, SEED_SUBJECTS } from '$lib/data/seed-data';
	import { BadgeCheck, Star, Users, BookOpen, Search, ArrowRight, X } from 'lucide-svelte';

	let searchQuery = $state('');
	let selectedSubject = $state('all');
	let sortBy = $state<'rating' | 'students' | 'courses'>('rating');

	const rootSubjects = $derived(SEED_SUBJECTS.filter((s) => !s.parent_id));

	const filteredTeachers = $derived.by(() => {
		const list = SEED_TEACHERS.filter((t) => {
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase();
				const matchName = t.display_name.toLowerCase().includes(q);
				const matchHeadline = t.headline.toLowerCase().includes(q);
				const matchSubj = t.subjects.some((s) => s.name.toLowerCase().includes(q));
				if (!matchName && !matchHeadline && !matchSubj) return false;
			}
			if (selectedSubject !== 'all') {
				const parent = SEED_SUBJECTS.find((s) => s.slug === selectedSubject);
				const match = t.subjects.some((ts) => {
					if (ts.slug === selectedSubject) return true;
					const fullSub = SEED_SUBJECTS.find((s) => s.id === ts.id);
					return parent && fullSub?.parent_id === parent.id;
				});
				if (!match) return false;
			}
			return true;
		});

		return [...list].sort((a, b) => {
			if (sortBy === 'students') return b.student_count - a.student_count;
			if (sortBy === 'courses') return b.course_count - a.course_count;
			return b.rating_avg - a.rating_avg;
		});
	});
</script>

<svelte:head>
	<title>Giáo viên · Học Vui</title>
</svelte:head>

<div class="page-container space-y-8 py-10">
	<div class="space-y-4">
		<h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">Giáo viên trên Học Vui</h1>
		<p class="text-muted-foreground max-w-2xl leading-relaxed">
			Mỗi giáo viên đều được đội ngũ xác minh và được chính các học viên đã tham gia lớp đánh giá.
		</p>

		<!-- SEARCH & FILTERS -->
		<div class="flex flex-wrap items-center gap-3 pt-2">
			<div class="relative min-w-[260px] flex-1 max-w-md">
				<Search class="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
				<input
					type="search"
					bind:value={searchQuery}
					placeholder="Tìm theo tên hoặc chủ đề..."
					aria-label="Tìm theo tên hoặc chủ đề..."
					class="bg-card w-full rounded-xl border py-2.5 pr-4 pl-10 text-sm shadow-xs outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<select
				bind:value={selectedSubject}
				aria-label="Môn học"
				class="bg-card rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="all">Tất cả môn học</option>
				{#each rootSubjects as subj}
					<option value={subj.slug}>{subj.name}</option>
				{/each}
			</select>

			<select
				bind:value={sortBy}
				aria-label="Sắp xếp"
				class="bg-card rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="rating">Đánh giá cao nhất</option>
				<option value="students">Nhiều học viên nhất</option>
				<option value="courses">Nhiều khóa học nhất</option>
			</select>

			{#if searchQuery || selectedSubject !== 'all'}
				<button
					type="button"
					onclick={() => {
						searchQuery = '';
						selectedSubject = 'all';
					}}
					class="text-primary inline-flex cursor-pointer items-center gap-1 text-xs font-semibold hover:underline"
				>
					<X class="size-3.5" /> Xóa bộ lọc
				</button>
			{/if}
		</div>
	</div>

	<div class="text-muted-foreground text-sm font-medium">
		{filteredTeachers.length} giáo viên
	</div>

	{#if filteredTeachers.length > 0}
		<div class="grid gap-6 md:grid-cols-2">
			{#each filteredTeachers as teacher}
				<div
					class="bg-card flex flex-col justify-between space-y-5 rounded-2xl border p-6 shadow-xs transition-shadow hover:shadow-md"
				>
					<div class="space-y-4">
						<div class="flex items-center gap-4">
							<div
								class="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-sm"
							>
								{teacher.display_name.charAt(0)}
							</div>
							<div class="space-y-1">
								<div class="flex flex-wrap items-center gap-2">
									<a href="/teachers/{teacher.username}" class="hover:text-primary font-bold text-lg">
										{teacher.display_name}
									</a>
									{#if teacher.verified}
										<span
											class="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400"
										>
											<BadgeCheck class="size-3.5" /> Đã xác minh
										</span>
									{/if}
								</div>
								<div class="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
									<div class="flex items-center gap-1 font-semibold text-amber-500">
										<Star class="size-3.5 fill-amber-400 text-amber-400" />
										<span>{teacher.rating_avg.toFixed(1)}</span>
										<span class="text-muted-foreground">({teacher.rating_count})</span>
									</div>
									<span>·</span>
									<div class="flex items-center gap-1">
										<Users class="size-3.5" />
										<span>{teacher.student_count} học viên</span>
									</div>
									<span>·</span>
									<div class="flex items-center gap-1">
										<BookOpen class="size-3.5" />
										<span>{teacher.course_count} khóa học</span>
									</div>
								</div>
							</div>
						</div>

						<p class="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
							{teacher.headline}
						</p>

						<div class="flex flex-wrap gap-1.5 pt-1">
							{#each teacher.subjects as sub}
								<a
									href="/subjects/{sub.slug}"
									class="bg-muted hover:bg-primary/10 hover:text-primary rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors"
								>
									{sub.name}
								</a>
							{/each}
						</div>
					</div>

					<div class="flex items-center justify-between border-t pt-4">
						<span class="text-muted-foreground text-xs font-medium">
							{teacher.years_experience || 5}+ năm giảng dạy
						</span>
						<a
							href="/teachers/{teacher.username}"
							class="text-primary inline-flex items-center gap-1 text-sm font-bold hover:underline"
						>
							Xem hồ sơ <ArrowRight class="size-4" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="bg-muted/20 space-y-2 rounded-2xl border py-16 text-center">
			<h3 class="text-lg font-bold">Không tìm thấy giáo viên</h3>
			<p class="text-muted-foreground text-sm">
				Hãy thử từ khóa hoặc môn học khác để tìm giáo viên phù hợp.
			</p>
		</div>
	{/if}
</div>
