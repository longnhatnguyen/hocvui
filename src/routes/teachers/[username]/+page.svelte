<script lang="ts">
	import { page } from '$app/state';
	import { SEED_TEACHERS, SEED_COURSES } from '$lib/data/seed-data';
	import { BadgeCheck, Star, Users, BookOpen, Clock, Video, ArrowRight, ShieldCheck } from 'lucide-svelte';

	const username = $derived(page.params.username);
	const teacher = $derived(
		SEED_TEACHERS.find((t) => t.username === username || t.id === username) || SEED_TEACHERS[0]
	);

	const teacherCourses = $derived(SEED_COURSES.filter((c) => c.teacher.id === teacher.id));
</script>

<svelte:head>
	<title>{teacher.display_name} · Giáo viên Học Vui</title>
</svelte:head>

<div class="page-container py-10 space-y-10">
	<!-- TEACHER HEADER CARD -->
	<div class="rounded-3xl border bg-card p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
		<div class="size-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-extrabold text-white shrink-0 shadow-md">
			{teacher.display_name.charAt(0)}
		</div>

		<div class="space-y-2 flex-1">
			<div class="flex flex-wrap items-center gap-2">
				<h1 class="text-3xl font-extrabold">{teacher.display_name}</h1>
				{#if teacher.verified}
					<span class="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
						<BadgeCheck class="size-4" /> Đã xác minh năng lực
					</span>
				{/if}
			</div>

			<p class="text-muted-foreground text-base max-w-2xl leading-relaxed">
				{teacher.headline}
			</p>

			<div class="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
				<div class="flex items-center gap-1.5 text-amber-500 font-bold">
					<Star class="size-4 fill-amber-500" />
					<span>{teacher.rating_avg.toFixed(1)}</span>
					<span class="text-muted-foreground font-normal">({teacher.rating_count} đánh giá)</span>
				</div>
				<div class="flex items-center gap-1.5">
					<Users class="size-4" />
					<span>{teacher.student_count} học viên đã học</span>
				</div>
				<div class="flex items-center gap-1.5">
					<Clock class="size-4" />
					<span>{teacher.years_experience} năm kinh nghiệm</span>
				</div>
			</div>
		</div>
	</div>

	<!-- BIO & EXPERTISE -->
	<div class="grid gap-8 lg:grid-cols-3">
		<div class="lg:col-span-2 space-y-6">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Giới thiệu bản thân & Phương pháp</h2>
				<p class="text-muted-foreground leading-relaxed">
					{teacher.bio || teacher.headline}
				</p>
			</div>

			<!-- COURSES TAUGHT -->
			<div class="space-y-4 pt-6 border-t">
				<h2 class="text-2xl font-bold tracking-tight">Các khóa học đang giảng dạy ({teacherCourses.length})</h2>
				
				<div class="grid gap-4 sm:grid-cols-2">
					{#each teacherCourses as course}
						<a
							href="/courses/{course.slug}"
							class="group rounded-2xl border bg-card p-4 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
						>
							<div class="space-y-2">
								<span class="inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">
									{course.subject.name}
								</span>
								<h3 class="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">
									{course.name}
								</h3>
								<p class="text-xs text-muted-foreground line-clamp-2">
									{course.headline}
								</p>
							</div>

							<div class="pt-2 border-t flex items-center justify-between text-xs">
								<span class="font-bold text-primary">
									{course.price_type === 'FREE' ? 'Miễn phí' : `${Number(course.price).toLocaleString('vi-VN')} đ/buổi`}
								</span>
								<span class="text-muted-foreground">{course.total_sessions} buổi</span>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- RIGHT SIDEBAR: EXPERTISE -->
		<div class="space-y-6">
			<div class="rounded-2xl border bg-card p-6 space-y-4 shadow-xs">
				<h3 class="font-bold text-lg">Chuyên môn</h3>
				<ul class="space-y-2">
					{#each teacher.expertise || ['Toán học', 'Tiếng Anh', 'Tư duy logic'] as exp}
						<li class="flex items-center gap-2 text-sm text-muted-foreground">
							<ShieldCheck class="size-4 text-primary" />
							<span>{exp}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="rounded-2xl border bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 space-y-3">
				<h4 class="font-bold text-base">Bạn muốn học cùng thầy cô?</h4>
				<p class="text-xs text-muted-foreground leading-relaxed">
					Đăng ký một trong các khóa học trên hoặc liên hệ để được tư vấn lớp học riêng.
				</p>
				<a
					href="/courses"
					class="w-full inline-flex items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-xs hover:bg-primary/90 transition-all"
				>
					Khám phá các lớp đang mở
				</a>
			</div>
		</div>
	</div>
</div>
