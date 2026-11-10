<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import { SEED_COURSES } from '$lib/data/seed-data';
	import { Video, Calendar, BookOpen, Clock, FileText, CheckCircle, ArrowRight } from 'lucide-svelte';

	const myCourses = $derived(SEED_COURSES.slice(0, 2));
</script>

<svelte:head>
	<title>Góc Học tập · Học Vui</title>
</svelte:head>

<div class="page-container py-10 space-y-8">
	<!-- HEADER WELCOME -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight">
				Chào mừng {appState.user?.display_name || 'Học viên'}!
			</h1>
			<p class="text-muted-foreground text-sm">
				Xem lịch học, bài tập và tham gia các buổi học trực tuyến đang diễn ra.
			</p>
		</div>

		<a
			href="/app/live/session_demo_01"
			class="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-bold text-white shadow-md hover:bg-red-700 transition-all text-sm animate-pulse"
		>
			<Video class="size-4" /> Vào lớp học trực tiếp ngay
		</a>
	</div>

	<!-- UPCOMING SESSIONS CARD -->
	<div class="rounded-3xl border bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg space-y-4">
		<div class="flex items-center gap-2 text-xs font-bold text-amber-300">
			<Calendar class="size-4" /> BUỔI HỌC SẮP DIỄN RA
		</div>
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
			<div>
				<h2 class="text-2xl font-bold">Toán tư duy cơ bản - Buổi 2: Phép cộng trừ trực quan</h2>
				<p class="text-sm text-blue-100">Giáo viên: Thầy Văn Lê • Thời gian: Hôm nay, 19:30 - 20:30</p>
			</div>
			<a
				href="/app/live/toan_lop1_buoi2"
				class="rounded-xl bg-white px-5 py-2.5 font-bold text-blue-700 hover:bg-blue-50 transition-all text-sm shadow-sm"
			>
				Vào lớp
			</a>
		</div>
	</div>

	<!-- MY ENROLLED COURSES -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold tracking-tight">Khóa học của tôi ({myCourses.length})</h2>

		<div class="grid gap-6 sm:grid-cols-2">
			{#each myCourses as course}
				<div class="rounded-2xl border bg-card p-5 space-y-4 shadow-xs flex flex-col justify-between">
					<div class="space-y-2">
						<span class="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
							{course.subject.name}
						</span>
						<h3 class="font-bold text-lg">{course.name}</h3>
						<p class="text-xs text-muted-foreground line-clamp-2">{course.headline}</p>
					</div>

					<!-- Progress -->
					<div class="space-y-1.5 text-xs">
						<div class="flex justify-between font-medium">
							<span>Tiến độ học tập:</span>
							<span class="font-bold text-primary">3 / {course.total_sessions} buổi</span>
						</div>
						<div class="h-2 w-full rounded-full bg-muted overflow-hidden">
							<div class="h-full bg-primary rounded-full w-[25%]"></div>
						</div>
					</div>

					<div class="pt-3 border-t flex items-center justify-between text-xs">
						<span class="text-muted-foreground">GV: {course.teacher.display_name}</span>
						<a
							href="/app/live/session_{course.id}"
							class="font-bold text-primary hover:underline flex items-center gap-1"
						>
							Phòng học <ArrowRight class="size-3.5" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
