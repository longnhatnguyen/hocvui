<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import { SEED_COURSES } from '$lib/data/seed-data';
	import { Plus, Video, Users, BookOpen, Clock, Settings, ArrowRight } from 'lucide-svelte';

	let showNewModal = $state(false);
	let newCourseName = $state('');
	let newCourseHeadline = $state('');
	let newCoursePrice = $state('50000');
	let coursesList = $state([...SEED_COURSES]);

	function handleCreateCourse(e: SubmitEvent) {
		e.preventDefault();
		if (!newCourseName.trim()) return;

		const created = {
			id: `course_${Date.now()}`,
			slug: `course-${Date.now()}`,
			name: newCourseName,
			headline: newCourseHeadline || 'Khóa học tương tác mới mở',
			level: 'BEGINNER' as const,
			language: 'vi',
			cover_image_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80',
			price: newCoursePrice,
			price_type: 'PER_LESSON' as const,
			currency: 'VND',
			total_sessions: 8,
			duration_per_session: 60,
			rating_avg: 5.0,
			rating_count: 0,
			subject: {
				id: 'toan',
				name: 'Toán học',
				slug: 'toan',
				icon: 'sigma'
			},
			teacher: {
				id: appState.user?.id || 'teacher_1',
				username: appState.user?.username || 'teacher',
				display_name: appState.user?.display_name || 'Giáo viên',
				rating_avg: 5.0,
				rating_count: 0,
				student_count: 0,
				course_count: 1,
				last_picture_update: Date.now(),
				verified: true
			},
			next_class_start: Date.now() + 86400000 * 2,
			open_class_count: 1,
			published_at: Date.now(),
			update_at: Date.now()
		};

		coursesList.unshift(created);
		showNewModal = false;
		newCourseName = '';
		newCourseHeadline = '';
	}
</script>

<svelte:head>
	<title>Quản lý Giảng dạy · Học Vui</title>
</svelte:head>

<div class="page-container py-10 space-y-8">
	<!-- HEADER -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight">Cổng Quản lý Giáo viên</h1>
			<p class="text-muted-foreground text-sm">
				Quản lý khóa học, đề cương, lớp học trực tiếp và điểm danh học viên.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<a
				href="/app/live/teacher_room_01"
				class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-bold text-white shadow-sm hover:bg-blue-700 transition-all text-sm"
			>
				<Video class="size-4" /> Mở phòng dạy ngay
			</a>
			<button
				type="button"
				onclick={() => (showNewModal = true)}
				class="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-bold text-white shadow-sm hover:bg-primary/90 transition-all text-sm"
			>
				<Plus class="size-4" /> Tạo khóa học mới
			</button>
		</div>
	</div>

	<!-- COURSES LIST -->
	<div class="space-y-4">
		<h2 class="text-2xl font-bold tracking-tight">Danh sách Khóa học đang mở ({coursesList.length})</h2>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each coursesList as course}
				<div class="bg-card rounded-2xl border p-5 flex flex-col justify-between space-y-4 shadow-xs">
					<div class="space-y-2">
						<div class="flex justify-between items-start">
							<span class="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">
								{course.subject.name}
							</span>
							<span class="text-xs font-bold text-primary">
								{Number(course.price).toLocaleString('vi-VN')} đ/buổi
							</span>
						</div>
						<h3 class="font-bold text-lg leading-snug line-clamp-1">{course.name}</h3>
						<p class="text-xs text-muted-foreground line-clamp-2">{course.headline}</p>
					</div>

					<div class="space-y-2 pt-3 border-t text-xs text-muted-foreground">
						<div class="flex items-center justify-between">
							<span>Số buổi: {course.total_sessions} buổi</span>
							<span>Thời lượng: {course.duration_per_session} phút</span>
						</div>
					</div>

					<div class="pt-2 flex gap-2">
						<a
							href="/app/live/session_{course.id}"
							class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600/10 py-2 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
						>
							<Video class="size-3.5" /> Vào lớp dạy
						</a>
						<a
							href="/courses/{course.slug}"
							class="inline-flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold hover:bg-accent transition-all"
						>
							Xem trang
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- MODAL TẠO KHÓA HỌC MỚI -->
	{#if showNewModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
			<div class="w-full max-w-lg rounded-3xl border bg-card p-6 shadow-2xl space-y-5">
				<h3 class="text-xl font-bold">Tạo Khóa học mới</h3>

				<form onsubmit={handleCreateCourse} class="space-y-4 text-sm">
					<div class="space-y-1.5">
						<label for="c-name" class="font-semibold text-xs">Tên khóa học</label>
						<input
							id="c-name"
							type="text"
							required
							bind:value={newCourseName}
							placeholder="Ví dụ: Ôn tập Toán nâng cao lớp 5..."
							class="w-full rounded-xl border bg-background px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary shadow-xs"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="c-headline" class="font-semibold text-xs">Mô tả ngắn gọn</label>
						<textarea
							id="c-headline"
							rows="3"
							bind:value={newCourseHeadline}
							placeholder="Mục tiêu khóa học và đối tượng học sinh..."
							class="w-full rounded-xl border bg-background px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary shadow-xs"
						></textarea>
					</div>

					<div class="space-y-1.5">
						<label for="c-price" class="font-semibold text-xs">Học phí mỗi buổi (VND)</label>
						<input
							id="c-price"
							type="number"
							bind:value={newCoursePrice}
							step="5000"
							class="w-full rounded-xl border bg-background px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary shadow-xs"
						/>
					</div>

					<div class="flex justify-end gap-2 pt-3 border-t">
						<button
							type="button"
							onclick={() => (showNewModal = false)}
							class="cursor-pointer rounded-xl border px-4 py-2 text-xs font-semibold hover:bg-accent"
						>
							Hủy bỏ
						</button>
						<button
							type="submit"
							class="cursor-pointer rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primary/90"
						>
							Tạo khóa học
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
