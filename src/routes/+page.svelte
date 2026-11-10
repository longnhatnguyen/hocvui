<script lang="ts">
	import {
		Search,
		Video,
		Presentation,
		MessagesSquare,
		House,
		BadgeCheck,
		ThumbsUp,
		PiggyBank,
		CalendarDays,
		ClipboardCheck,
		Star,
		GraduationCap,
		ArrowRight,
		Sigma,
		PenTool,
		Languages,
		BookOpen,
		Clock
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { SEED_SUBJECTS, SEED_COURSES } from '$lib/data/seed-data';
	import { appState } from '$lib/stores/appState.svelte';

	let searchQuery = $state('');

	const rootSubjects = $derived(
		SEED_SUBJECTS.filter((s) => !s.parent_id).map((root) => {
			const children = SEED_SUBJECTS.filter((c) => c.parent_id === root.id);
			const totalCourses =
				root.course_count + children.reduce((sum, c) => sum + c.course_count, 0);
			return {
				...root,
				children,
				totalCourses
			};
		})
	);

	const topRatedCourses = $derived(
		[...SEED_COURSES].sort((a, b) => b.rating_avg - a.rating_avg)
	);

	const startingSoonCourses = $derived(
		[...SEED_COURSES]
			.filter((c) => c.open_class_count > 0)
			.sort((a, b) => a.next_class_start - b.next_class_start)
	);

	function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		if (searchQuery.trim()) {
			goto(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
		} else {
			goto('/courses');
		}
	}

	function formatStartDate(ts: number) {
		return new Date(ts).toLocaleDateString('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Học trực tiếp với giáo viên giỏi · Học Vui</title>
	<meta
		name="description"
		content="Học Vui — học trực tuyến trực tiếp với giáo viên giỏi, mọi môn: lớp học video, bảng trắng, trò chuyện theo lớp, lịch học rõ ràng, đánh giá minh bạch."
	/>
</svelte:head>

<div>
	<!-- HERO SECTION -->
	<section
		class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-white md:py-24"
	>
		<div
			class="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-amber-300/20 blur-3xl"
			aria-hidden="true"
		></div>

		<div class="page-container grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center 2xl:gap-20">
			<div class="space-y-7">
				<p class="text-sm font-semibold tracking-wide text-blue-100 uppercase">Học Vui</p>
				<h1 class="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
					Học trực tiếp cùng <span class="text-amber-300">giáo viên giỏi</span>
				</h1>
				<p class="max-w-xl text-lg leading-relaxed text-blue-50/90">
					Lớp học trực tuyến mọi môn — học ngay tại nhà, không mất thời gian đi lại. Mọi giáo viên
					đều được đội ngũ xác minh và được chính học viên đã tham gia đánh giá.
				</p>

				<!-- SEARCH BAR -->
				<form
					onsubmit={handleSearch}
					class="m-0 flex min-w-0 max-w-xl items-center gap-2 rounded-2xl border-0 bg-white p-2 shadow-lg"
				>
					<Search class="ml-2 size-5 shrink-0 text-zinc-400" />
					<input
						type="search"
						bind:value={searchQuery}
						placeholder="Bạn muốn học gì?"
						aria-label="Bạn muốn học gì?"
						class="min-w-0 flex-1 bg-transparent px-2 py-2 text-base text-zinc-900 outline-none placeholder:text-zinc-400"
					/>
					<button
						type="submit"
						class="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
					>
						Tìm kiếm
					</button>
				</form>

				<!-- ACTION BUTTONS -->
				<div class="flex flex-wrap gap-3 text-sm">
					<a
						href="/courses"
						class="inline-flex items-center gap-2 rounded-xl border border-transparent bg-white/20 px-4 py-2.5 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/30"
					>
						Khám phá khóa học
					</a>
					<a
						href="/teach"
						class="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-transparent px-4 py-2.5 text-base font-semibold text-white transition-all hover:bg-white/10"
					>
						Dạy học cùng chúng tôi
					</a>
				</div>
			</div>

			<!-- HERO LIVE ROOM ILLUSTRATION (1:1 SSR Match) -->
			<div class="relative hidden lg:block" aria-hidden="true">
				<div class="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
					<div class="mb-3 flex items-center gap-1.5 px-1">
						<span class="size-2.5 rounded-full bg-white/40"></span>
						<span class="size-2.5 rounded-full bg-white/40"></span>
						<span class="size-2.5 rounded-full bg-white/40"></span>
						<span class="ml-3 h-2 w-24 rounded-full bg-white/25"></span>
						<span
							class="ml-auto inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-semibold"
						>
							<span class="size-1.5 animate-pulse rounded-full bg-white"></span>LIVE
						</span>
					</div>

					<div class="grid grid-cols-[1.6fr_1fr] gap-3">
						<!-- Whiteboard Illustration -->
						<div
							class="relative aspect-4/3 overflow-hidden rounded-2xl bg-white p-4 text-zinc-800 shadow-inner"
						>
							<Presentation class="absolute top-3 right-3 size-5 text-blue-500" />
							<svg viewBox="0 0 200 130" class="size-full" fill="none" stroke-linecap="round">
								<path
									d="M10 100 C40 20 70 20 90 70 S140 120 190 30"
									stroke="#2563eb"
									stroke-width="4"
								></path>
								<path d="M20 118 H120" stroke="#f59e0b" stroke-width="4"></path>
								<circle cx="150" cy="95" r="16" stroke="#6366f1" stroke-width="4"></circle>
								<path d="M20 30 H70 M20 44 H52" stroke="#d4d4d8" stroke-width="4"></path>
							</svg>
						</div>

						<!-- Participant Video Tiles -->
						<div class="grid grid-rows-3 gap-2.5">
							<div
								class="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-orange-500"
							>
								<span
									class="absolute bottom-0 left-1/2 size-10 -translate-x-1/2 translate-y-3 rounded-full bg-white/60"
								></span>
								<span
									class="absolute bottom-0 left-1/2 h-4 w-14 -translate-x-1/2 translate-y-2 rounded-t-full bg-white/60"
								></span>
							</div>
							<div
								class="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-400 to-teal-500"
							>
								<span
									class="absolute bottom-0 left-1/2 size-10 -translate-x-1/2 translate-y-3 rounded-full bg-white/60"
								></span>
								<span
									class="absolute bottom-0 left-1/2 h-4 w-14 -translate-x-1/2 translate-y-2 rounded-t-full bg-white/60"
								></span>
							</div>
							<div
								class="relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-500"
							>
								<span
									class="absolute bottom-0 left-1/2 size-10 -translate-x-1/2 translate-y-3 rounded-full bg-white/60"
								></span>
								<span
									class="absolute bottom-0 left-1/2 h-4 w-14 -translate-x-1/2 translate-y-2 rounded-t-full bg-white/60"
								></span>
							</div>
						</div>
					</div>

					<!-- Chat Skeleton Bars -->
					<div class="mt-3 space-y-2 rounded-2xl bg-white/10 p-3">
						<div class="flex items-center gap-2">
							<span class="size-5 rounded-full bg-amber-300"></span>
							<span class="h-2.5 w-2/3 rounded-full bg-white/50"></span>
						</div>
						<div class="flex items-center gap-2">
							<span class="size-5 rounded-full bg-green-300"></span>
							<span class="h-2.5 w-1/2 rounded-full bg-white/40"></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 3 FEATURES UNDER HERO -->
		<ul
			class="page-container mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3"
			aria-label="Lớp học trực tiếp có gì"
		>
			<li class="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
				<span class="rounded-xl bg-white/20 p-2.5">
					<Video class="size-5" />
				</span>
				<div>
					<p class="font-semibold text-white">Video trực tiếp</p>
					<p class="text-sm text-blue-100/80">Gặp giáo viên và bạn học mặt đối mặt mỗi buổi.</p>
				</div>
			</li>
			<li class="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
				<span class="rounded-xl bg-white/20 p-2.5">
					<Presentation class="size-5" />
				</span>
				<div>
					<p class="font-semibold text-white">Bảng trắng chung</p>
					<p class="text-sm text-blue-100/80">Cùng vẽ, giải bài và ghi chú theo thời gian thực.</p>
				</div>
			</li>
			<li class="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
				<span class="rounded-xl bg-white/20 p-2.5">
					<MessagesSquare class="size-5" />
				</span>
				<div>
					<p class="font-semibold text-white">Phòng chat lớp học</p>
					<p class="text-sm text-blue-100/80">Hỏi bài, chia sẻ tài liệu giữa các buổi học.</p>
				</div>
			</li>
		</ul>
	</section>

	<!-- SECTION: VÌ SAO HỌC TRÊN HỌC VUI -->
	<section class="py-16 md:py-24">
		<div class="page-container space-y-10">
			<div class="max-w-2xl space-y-3">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">Vì sao học trên Học Vui</h2>
				<p class="text-muted-foreground text-lg leading-relaxed">
					Chất lượng giảng dạy bạn tự kiểm chứng được — mà không cần ra khỏi nhà.
				</p>
			</div>

			<ul class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
				<li class="bg-card space-y-3 rounded-2xl border p-6 shadow-xs">
					<span class="inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
						<House class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Học tại nhà, không phải đi lại</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Không kẹt xe, không mất thời gian di chuyển. Vào lớp học trực tuyến ở bất cứ đâu và dành
						thời gian tiết kiệm được để học thêm.
					</p>
				</li>

				<li class="bg-card space-y-3 rounded-2xl border p-6 shadow-xs">
					<span
						class="inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-600 dark:text-indigo-400"
					>
						<BadgeCheck class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Giáo viên được đội ngũ kiểm tra</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Năng lực của từng giáo viên được kiểm duyệt viên xác minh qua video buổi dạy thật — và
						bạn cũng xem được những video đó.
					</p>
				</li>

				<li class="bg-card space-y-3 rounded-2xl border p-6 shadow-xs">
					<span
						class="inline-flex rounded-xl bg-green-500/10 p-3 text-green-700 dark:text-green-400"
					>
						<ThumbsUp class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Đánh giá không thể mua</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Chỉ học viên đã đăng ký và vào học trực tuyến mới được đánh giá. Sự hài lòng được giành
						lấy trong lớp học, không thể mua bằng tiền.
					</p>
				</li>

				<li class="bg-card space-y-3 rounded-2xl border p-6 shadow-xs">
					<span
						class="inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-700 dark:text-amber-400"
					>
						<PiggyBank class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Học viên không trả phí nền tảng</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Bạn chỉ trả học phí do giáo viên đặt. Giáo viên trả phí nền tảng theo số học viên họ
						dạy.
					</p>
				</li>
			</ul>
		</div>
	</section>

	<!-- SECTION: KHÁM PHÁ THEO MÔN HỌC -->
	<section class="border-t py-14 md:py-20">
		<div class="page-container space-y-8">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div class="space-y-1.5">
					<h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">Khám phá theo môn học</h2>
					<p class="text-muted-foreground text-base">
						Từ ngoại ngữ, học thuật đến kỹ năng và nghệ thuật.
					</p>
				</div>
				<a
					href="/courses"
					class="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold"
				>
					Xem tất cả <ArrowRight class="size-4" />
				</a>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each rootSubjects as subj}
					<div
						class="bg-card hover:border-primary/40 group flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md"
					>
						<div class="space-y-3">
							<div class="flex items-center justify-between gap-3">
								<a
									href="/subjects/{subj.slug}"
									class="flex items-center gap-3 font-bold text-lg group-hover:text-primary transition-colors"
								>
									<span class="bg-primary/10 text-primary inline-flex rounded-xl p-2.5">
										{#if subj.icon === 'sigma'}
											<Sigma class="size-5" />
										{:else if subj.icon === 'pen-tool'}
											<PenTool class="size-5" />
										{:else}
											<Languages class="size-5" />
										{/if}
									</span>
									<span>{subj.name}</span>
								</a>
								<span class="text-muted-foreground rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
									{subj.totalCourses} khóa học
								</span>
							</div>

							{#if subj.children.length > 0}
								<div class="flex flex-wrap gap-1.5 pt-1">
									{#each subj.children.slice(0, 6) as child}
										<a
											href="/subjects/{child.slug}"
											class="bg-muted/70 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg px-2.5 py-1 text-xs font-medium transition-colors"
										>
											{child.name}
										</a>
									{/each}
									{#if subj.children.length > 6}
										<a
											href="/subjects/{subj.slug}"
											class="text-primary px-2 py-1 text-xs font-semibold hover:underline"
										>
											+{subj.children.length - 6} môn khác
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- SECTION: ĐƯỢC HỌC VIÊN HÀI LÒNG NHẤT -->
	<section class="border-t py-14 md:py-20">
		<div class="page-container space-y-8">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div class="space-y-1.5">
					<h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">
						Được học viên hài lòng nhất
					</h2>
					<p class="text-muted-foreground text-base">Những khóa học học viên yêu thích nhất.</p>
				</div>
				<a
					href="/courses?sort=rating"
					class="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold"
				>
					Xem tất cả <ArrowRight class="size-4" />
				</a>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each topRatedCourses as course}
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
		</div>
	</section>

	<!-- SECTION: SẮP KHAI GIẢNG -->
	<section class="border-t py-14 md:py-20">
		<div class="page-container space-y-8">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div class="space-y-1.5">
					<h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">Sắp khai giảng</h2>
					<p class="text-muted-foreground text-base">Đăng ký ngay để kịp buổi học đầu tiên.</p>
				</div>
				<a
					href="/courses?sort=starting_soon"
					class="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold"
				>
					Xem tất cả <ArrowRight class="size-4" />
				</a>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each startingSoonCourses as course}
					<article
						class="bg-card group flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md"
					>
						<div class="space-y-3">
							<div class="flex items-center justify-between gap-2">
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-700 dark:text-green-400"
								>
									<CalendarDays class="size-3.5" />
									Khai giảng {formatStartDate(course.next_class_start)}
								</span>
								<span class="text-muted-foreground text-xs font-medium">
									{course.open_class_count} lớp đang mở
								</span>
							</div>

							<a href="/courses/{course.slug}" class="block">
								<h3 class="group-hover:text-primary text-lg font-bold transition-colors">
									{course.name}
								</h3>
							</a>

							<p class="text-muted-foreground line-clamp-2 text-sm">
								{course.headline}
							</p>
						</div>

						<div class="mt-4 flex items-center justify-between border-t pt-4">
							<div class="text-xs">
								<p class="text-muted-foreground">Giáo viên</p>
								<p class="font-semibold">{course.teacher.display_name}</p>
							</div>
							<a
								href="/courses/{course.slug}"
								class="bg-primary/10 text-primary hover:bg-primary rounded-xl px-3.5 py-2 text-xs font-bold transition-colors hover:text-white"
							>
								Đăng ký lớp
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- SECTION: LỚP HỌC TRỰC TIẾP, ĐẦY ĐỦ CÔNG CỤ -->
	<section class="bg-muted/40 border-y py-16 md:py-24">
		<div class="page-container">
			<div class="mb-12 max-w-2xl space-y-2">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">
					Lớp học trực tiếp, đầy đủ công cụ
				</h2>
				<p class="text-muted-foreground">
					Không cần ứng dụng khác — mọi thứ diễn ra ngay trên trình duyệt.
				</p>
			</div>

			<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<li class="bg-card rounded-2xl border p-6 shadow-xs">
					<span
						class="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400"
					>
						<Video class="size-6" />
					</span>
					<h3 class="mb-1 text-lg font-bold">Video HD trực tiếp</h3>
					<p class="text-muted-foreground text-sm">
						Lớp học video với chia sẻ màn hình, không cần cài đặt.
					</p>
				</li>

				<li class="bg-card rounded-2xl border p-6 shadow-xs">
					<span
						class="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400"
					>
						<Presentation class="size-6" />
					</span>
					<h3 class="mb-1 text-lg font-bold">Bảng trắng mỗi buổi</h3>
					<p class="text-muted-foreground text-sm">
						Mỗi buổi học có bảng trắng riêng, lưu lại để ôn tập sau.
					</p>
				</li>

				<li class="bg-card rounded-2xl border p-6 shadow-xs">
					<span
						class="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400"
					>
						<MessagesSquare class="size-6" />
					</span>
					<h3 class="mb-1 text-lg font-bold">Phòng chat của lớp</h3>
					<p class="text-muted-foreground text-sm">
						Trò chuyện, gửi tệp và thông báo cho cả lớp 24/7.
					</p>
				</li>

				<li class="bg-card rounded-2xl border p-6 shadow-xs">
					<span
						class="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400"
					>
						<CalendarDays class="size-6" />
					</span>
					<h3 class="mb-1 text-lg font-bold">Lịch học rõ ràng</h3>
					<p class="text-muted-foreground text-sm">
						Mọi buổi học hiện trên lịch của bạn, kèm thông báo nhắc lịch.
					</p>
				</li>

				<li class="bg-card rounded-2xl border p-6 shadow-xs">
					<span
						class="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400"
					>
						<ClipboardCheck class="size-6" />
					</span>
					<h3 class="mb-1 text-lg font-bold">Điểm danh tự động</h3>
					<p class="text-muted-foreground text-sm">
						Tham gia buổi học là được tự động ghi nhận có mặt.
					</p>
				</li>

				<li class="bg-card rounded-2xl border p-6 shadow-xs">
					<span
						class="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400"
					>
						<Star class="size-6" />
					</span>
					<h3 class="mb-1 text-lg font-bold">Nhận xét hai chiều</h3>
					<p class="text-muted-foreground text-sm">
						Giáo viên nhận xét học viên, học viên đánh giá khóa học.
					</p>
				</li>
			</ul>
		</div>
	</section>

	<!-- SECTION: BẮT ĐẦU CHỈ VỚI VÀI BƯỚC -->
	<section class="py-16 md:py-24">
		<div class="page-container">
			<h2 class="mb-12 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
				Bắt đầu chỉ với vài bước
			</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				<!-- DÀNH CHO HỌC VIÊN -->
				<div class="bg-card rounded-2xl border p-8 shadow-xs">
					<div class="mb-6 flex items-center gap-3">
						<span class="bg-primary/10 text-primary rounded-xl p-3">
							<GraduationCap class="size-6" />
						</span>
						<h3 class="text-xl font-bold">Dành cho học viên</h3>
					</div>
					<ol class="space-y-5">
						<li class="flex gap-4">
							<span
								class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								>1</span
							>
							<div>
								<p class="font-semibold">Tìm khóa học</p>
								<p class="text-muted-foreground text-sm">
									Lọc theo môn, giá và lịch học phù hợp với bạn.
								</p>
							</div>
						</li>
						<li class="flex gap-4">
							<span
								class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								>2</span
							>
							<div>
								<p class="font-semibold">Đăng ký lớp</p>
								<p class="text-muted-foreground text-sm">Chọn lớp, giữ chỗ và nhận lịch học ngay.</p>
							</div>
						</li>
						<li class="flex gap-4">
							<span
								class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								>3</span
							>
							<div>
								<p class="font-semibold">Vào học trực tiếp</p>
								<p class="text-muted-foreground text-sm">
									Tham gia buổi học bằng video, bảng trắng và chat.
								</p>
							</div>
						</li>
					</ol>
					<a
						href="/courses"
						class="text-primary hover:text-primary/80 mt-6 inline-flex items-center gap-1 text-sm font-semibold"
					>
						Tìm khóa học <ArrowRight class="size-4" />
					</a>
				</div>

				<!-- DÀNH CHO GIÁO VIÊN -->
				<div class="bg-card rounded-2xl border p-8 shadow-xs">
					<div class="mb-6 flex items-center gap-3">
						<span class="bg-primary/10 text-primary rounded-xl p-3">
							<Presentation class="size-6" />
						</span>
						<h3 class="text-xl font-bold">Dành cho giáo viên</h3>
					</div>
					<ol class="space-y-5">
						<li class="flex gap-4">
							<span
								class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								>1</span
							>
							<div>
								<p class="font-semibold">Cho thấy cách bạn dạy</p>
								<p class="text-muted-foreground text-sm">
									Chia sẻ video các buổi đã dạy; kiểm duyệt viên xác minh năng lực của bạn.
								</p>
							</div>
						</li>
						<li class="flex gap-4">
							<span
								class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								>2</span
							>
							<div>
								<p class="font-semibold">Tạo khóa học và mở lớp</p>
								<p class="text-muted-foreground text-sm">
									Mô tả nội dung và học phí, đặt lịch và mở đăng ký.
								</p>
							</div>
						</li>
						<li class="flex gap-4">
							<span
								class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
								>3</span
							>
							<div>
								<p class="font-semibold">Dạy và nhận xét</p>
								<p class="text-muted-foreground text-sm">
									Dạy trực tiếp, điểm danh tự động và nhận xét học viên.
								</p>
							</div>
						</li>
					</ol>
					<a
						href="/teach"
						class="text-primary hover:text-primary/80 mt-6 inline-flex items-center gap-1 text-sm font-semibold"
					>
						Trở thành giáo viên <ArrowRight class="size-4" />
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- SECTION: CALL TO ACTION -->
	<section class="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
		<div class="page-container flex flex-col items-center gap-6 text-center">
			<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">
				Sẵn sàng cho buổi học đầu tiên?
			</h2>
			<p class="max-w-xl text-blue-100">
				Học viên không trả phí nền tảng — chỉ trả học phí do giáo viên đặt. Học tại nhà và dành
				thời gian tiết kiệm được cho việc học.
			</p>
			<div class="flex flex-wrap justify-center gap-3">
				{#if appState.user}
					<a
						href="/app"
						class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-base font-semibold text-blue-700 shadow-xs hover:bg-blue-50"
					>
						Vào bảng điều khiển
					</a>
				{:else}
					<a
						href="/register"
						class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-base font-semibold text-blue-700 shadow-xs hover:bg-blue-50"
					>
						Tạo tài khoản học viên
					</a>
					<a
						href="/teach"
						class="inline-flex items-center justify-center rounded-xl border border-white/50 bg-transparent px-5 py-2.5 text-base font-semibold text-white hover:bg-white/10"
					>
						Tôi là giáo viên
					</a>
				{/if}
			</div>
		</div>
	</section>
</div>
