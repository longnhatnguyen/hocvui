<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import { SEED_COURSES, SEED_TEACHERS } from '$lib/data/seed-data';
	import {
		GraduationCap,
		Presentation,
		ShieldAlert,
		Video,
		CalendarDays,
		ArrowRight,
		BookOpen,
		Users
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>Tổng quan · Học Vui</title>
</svelte:head>

<div class="page-container space-y-8 py-8">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-extrabold tracking-tight md:text-3xl">
				Xin chào, {appState.user?.display_name || 'bạn'}
			</h1>
			<p class="text-muted-foreground text-sm">
				Bảng điều khiển học tập, giảng dạy và quản lý lớp học trực tuyến trên Học Vui.
			</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<a
				href="/app/live/session_demo_01"
				class="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
			>
				<Video class="size-4" /> Vào phòng học trực tuyến ngay
			</a>
			<a
				href="/courses"
				class="bg-card hover:bg-accent inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all"
			>
				Khám phá khóa học
			</a>
		</div>
	</div>

	<!-- PLATFORM METRICS -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="bg-card rounded-2xl border p-5 space-y-1 shadow-xs">
			<p class="text-muted-foreground text-xs font-medium">Khóa học đã đăng</p>
			<p class="text-2xl font-extrabold">{SEED_COURSES.length}</p>
		</div>
		<div class="bg-card rounded-2xl border p-5 space-y-1 shadow-xs">
			<p class="text-muted-foreground text-xs font-medium">Giáo viên đã xác minh</p>
			<p class="text-2xl font-extrabold">{SEED_TEACHERS.length}</p>
		</div>
		<div class="bg-card rounded-2xl border p-5 space-y-1 shadow-xs">
			<p class="text-muted-foreground text-xs font-medium">Buổi học 7 ngày tới</p>
			<p class="text-2xl font-extrabold text-primary">5</p>
		</div>
		<div class="bg-card rounded-2xl border p-5 space-y-1 shadow-xs">
			<p class="text-muted-foreground text-xs font-medium">Mức hài lòng trung bình</p>
			<p class="text-2xl font-extrabold text-amber-500">4.9 ★</p>
		</div>
	</div>

	<!-- PORTAL SHORTCUTS -->
	<div class="grid gap-6 md:grid-cols-3">
		<a
			href="/app/learn"
			class="bg-card hover:border-primary/40 group rounded-2xl border p-6 space-y-3 shadow-xs transition-all hover:shadow-md"
		>
			<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
				<GraduationCap class="size-6" />
			</span>
			<h2 class="group-hover:text-primary text-lg font-bold transition-colors">
				Không gian Học viên
			</h2>
			<p class="text-muted-foreground text-xs leading-relaxed">
				Xem lịch học sắp tới, vào phòng học trực tiếp, xem lại bảng trắng và nhận xét của giáo
				viên.
			</p>
			<span class="text-primary inline-flex items-center gap-1 text-xs font-bold">
				Mở Lớp tôi đang học <ArrowRight class="size-3.5" />
			</span>
		</a>

		<a
			href="/app/teach/courses"
			class="bg-card hover:border-primary/40 group rounded-2xl border p-6 space-y-3 shadow-xs transition-all hover:shadow-md"
		>
			<span class="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 inline-flex rounded-xl p-3">
				<Presentation class="size-6" />
			</span>
			<h2 class="group-hover:text-primary text-lg font-bold transition-colors">
				Không gian Giáo viên
			</h2>
			<p class="text-muted-foreground text-xs leading-relaxed">
				Tạo khóa học mới, soạn giáo trình từng buổi, mở lớp và bắt đầu buổi dạy trực tiếp.
			</p>
			<span class="text-primary inline-flex items-center gap-1 text-xs font-bold">
				Quản lý Khóa học của tôi <ArrowRight class="size-3.5" />
			</span>
		</a>

		<a
			href="/app/market"
			class="bg-card hover:border-primary/40 group rounded-2xl border p-6 space-y-3 shadow-xs transition-all hover:shadow-md"
		>
			<span class="bg-amber-500/10 text-amber-600 dark:text-amber-400 inline-flex rounded-xl p-3">
				<ShieldAlert class="size-6" />
			</span>
			<h2 class="group-hover:text-primary text-lg font-bold transition-colors">
				Sàn khóa học & Quản trị
			</h2>
			<p class="text-muted-foreground text-xs leading-relaxed">
				Xác minh hồ sơ giáo viên, kiểm duyệt đánh giá, quản lý danh mục môn học và gói phí nền
				tảng.
			</p>
			<span class="text-primary inline-flex items-center gap-1 text-xs font-bold">
				Vào trang Quản trị <ArrowRight class="size-3.5" />
			</span>
		</a>
	</div>
</div>
