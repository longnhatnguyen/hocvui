<script lang="ts">
	import { page } from '$app/state';
	import { SEED_COURSES } from '$lib/data/seed-data';
	import { appState } from '$lib/stores/appState.svelte';
	import { goto } from '$app/navigation';
	import {
		BookOpen,
		Clock,
		Star,
		BadgeCheck,
		Video,
		Presentation,
		MessagesSquare,
		Calendar,
		ArrowRight,
		CheckCircle2,
		ShieldCheck
	} from 'lucide-svelte';

	const slug = $derived(page.params.slug);
	const course = $derived(SEED_COURSES.find((c) => c.slug === slug || c.id === slug) || SEED_COURSES[0]);

	let enrolled = $state(false);

	function handleEnroll() {
		if (!appState.user) {
			goto('/login');
			return;
		}
		enrolled = true;
	}
</script>

<svelte:head>
	<title>{course.name} · Học Vui</title>
</svelte:head>

<div class="page-container py-10 space-y-10">
	<!-- BREADCRUMBS -->
	<nav class="flex items-center gap-2 text-xs text-muted-foreground">
		<a href="/" class="hover:text-foreground">Trang chủ</a>
		<span>/</span>
		<a href="/courses" class="hover:text-foreground">Khóa học</a>
		<span>/</span>
		<span class="text-foreground font-semibold">{course.subject.name}</span>
	</nav>

	<!-- MAIN DETAIL GRID -->
	<div class="grid gap-10 lg:grid-cols-[1.8fr_1fr]">
		<!-- LEFT: COURSE INFO & SYLLABUS -->
		<div class="space-y-8">
			<div class="space-y-4">
				<div class="inline-flex items-center gap-2 rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
					{course.subject.name} • {course.level === 'BEGINNER' ? 'Cơ bản' : 'Nâng cao'}
				</div>

				<h1 class="text-3xl font-extrabold tracking-tight md:text-4xl leading-tight">
					{course.name}
				</h1>

				<p class="text-lg text-muted-foreground leading-relaxed">
					{course.headline}
				</p>

				<!-- STATS BAR -->
				<div class="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
					<div class="flex items-center gap-1.5 text-amber-500">
						<Star class="size-4.5 fill-amber-500" />
						<span class="font-extrabold text-foreground">{course.rating_avg.toFixed(1)}</span>
						<span>({course.rating_count} đánh giá)</span>
					</div>

					<div class="flex items-center gap-1.5">
						<BookOpen class="size-4" />
						<span>{course.total_sessions} buổi học</span>
					</div>

					<div class="flex items-center gap-1.5">
						<Clock class="size-4" />
						<span>{course.duration_per_session} phút/buổi</span>
					</div>
				</div>
			</div>

			<!-- COVER IMAGE ON MOBILE -->
			<div class="lg:hidden rounded-2xl overflow-hidden aspect-video border bg-muted">
				<img src={course.cover_image_url} alt={course.name} class="size-full object-cover" />
			</div>

			<!-- OVERVIEW -->
			<div class="space-y-4 pt-6 border-t">
				<h2 class="text-2xl font-bold tracking-tight">Mô tả khóa học</h2>
				<p class="text-muted-foreground leading-relaxed whitespace-pre-line">
					{course.description || course.headline}
				</p>
			</div>

			<!-- SYLLABUS -->
			<div class="space-y-6 pt-6 border-t">
				<h2 class="text-2xl font-bold tracking-tight">Nội dung chi tiết (Đề cương)</h2>
				
				{#if course.syllabus && course.syllabus.length > 0}
					<div class="space-y-4">
						{#each course.syllabus as section, idx}
							<div class="rounded-2xl border bg-card p-5 space-y-3">
								<h3 class="font-bold text-base text-primary flex items-center gap-2">
									<span class="size-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">{idx + 1}</span>
									{section.title}
								</h3>
								<div class="divide-y divide-border/60 pl-8">
									{#each section.sessions as sess}
										<div class="py-3 text-sm space-y-1">
											<div class="font-semibold flex items-center justify-between">
												<span>Buổi {sess.session_num}: {sess.topic}</span>
												<span class="text-xs text-muted-foreground font-normal">Trực tuyến</span>
											</div>
											<p class="text-xs text-muted-foreground">{sess.description}</p>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="rounded-2xl border p-5 space-y-2 text-sm text-muted-foreground">
						<p>Đề cương khóa học bao gồm {course.total_sessions} buổi học trực tiếp qua bảng trắng và trao đổi phản xạ.</p>
					</div>
				{/if}
			</div>

			<!-- TEACHER SECTION -->
			<div class="space-y-4 pt-6 border-t">
				<h2 class="text-2xl font-bold tracking-tight">Giáo viên phụ trách</h2>
				<div class="rounded-2xl border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
					<div class="size-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-md">
						{course.teacher.display_name.charAt(0)}
					</div>
					<div class="space-y-1.5 flex-1">
						<div class="flex items-center gap-2">
							<h3 class="font-bold text-lg">{course.teacher.display_name}</h3>
							<span class="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full">
								<BadgeCheck class="size-3.5" /> Đã xác minh
							</span>
						</div>
						<p class="text-xs text-muted-foreground">
							Giáo viên đã được kiểm duyệt viên xác minh năng lực qua video dạy học thực tế.
						</p>
						<a href="/teachers/{course.teacher.username}" class="text-xs font-bold text-primary hover:underline inline-block pt-1">
							Xem toàn bộ hồ sơ giáo viên →
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- RIGHT: PRICING & ENROLL CARD -->
		<div>
			<div class="sticky top-24 rounded-3xl border bg-card p-6 shadow-xl space-y-6">
				<!-- Cover image on Desktop -->
				<div class="hidden lg:block rounded-2xl overflow-hidden aspect-video border bg-muted shadow-sm">
					<img src={course.cover_image_url} alt={course.name} class="size-full object-cover" />
				</div>

				<!-- Price -->
				<div class="space-y-1">
					<span class="text-xs font-semibold text-muted-foreground uppercase">Học phí</span>
					<div class="flex items-baseline gap-2">
						{#if course.price_type === 'FREE'}
							<span class="text-3xl font-extrabold text-green-600">MIỄN PHÍ</span>
						{:else}
							<span class="text-3xl font-extrabold text-primary">
								{Number(course.price).toLocaleString('vi-VN')} đ
							</span>
							<span class="text-sm text-muted-foreground">/ buổi</span>
						{/if}
					</div>
					<p class="text-xs text-muted-foreground">
						Học viên không phải trả bất kỳ khoản phí nền tảng nào.
					</p>
				</div>

				<!-- Enroll CTA -->
				{#if enrolled}
					<div class="space-y-3 rounded-2xl bg-green-500/10 p-4 border border-green-500/30 text-center">
						<CheckCircle2 class="size-8 mx-auto text-green-600" />
						<h4 class="font-bold text-green-700 dark:text-green-300">Đăng ký lớp thành công!</h4>
						<p class="text-xs text-muted-foreground">
							Lớp học đã được thêm vào mục học tập của bạn.
						</p>
						<a
							href="/app/live/session_demo_01"
							class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-green-700 transition-all"
						>
							<Video class="size-4" /> Vào phòng học trực tiếp ngay
						</a>
					</div>
				{:else}
					<button
						type="button"
						onclick={handleEnroll}
						class="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-white shadow-md hover:bg-primary/90 transition-all"
					>
						Đăng ký học ngay <ArrowRight class="size-5" />
					</button>
				{/if}

				<!-- Guarantee highlights -->
				<div class="space-y-3 pt-4 border-t text-xs text-muted-foreground">
					<div class="flex items-center gap-2.5">
						<ShieldCheck class="size-4.5 text-blue-500 shrink-0" />
						<span>Đánh giá 100% minh bạch từ học viên thực tế</span>
					</div>
					<div class="flex items-center gap-2.5">
						<Presentation class="size-4.5 text-blue-500 shrink-0" />
						<span>Lớp học video HD + Bảng trắng tương tác</span>
					</div>
					<div class="flex items-center gap-2.5">
						<MessagesSquare class="size-4.5 text-blue-500 shrink-0" />
						<span>Phòng chat lớp học trao đổi trực tiếp 24/7</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
