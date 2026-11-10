<script lang="ts">
	import { SEED_SUBJECTS, SEED_COURSES, SEED_TEACHERS, SEED_FEE_SCHEDULE } from '$lib/data/seed-data';
	import { Shield, BookOpen, Users, DollarSign, CheckCircle2, XCircle } from 'lucide-svelte';

	let activeTab = $state<'overview' | 'teachers' | 'subjects' | 'fees'>('overview');
</script>

<svelte:head>
	<title>Quản trị Marketplace & Kiểm duyệt · Học Vui</title>
</svelte:head>

<div class="page-container py-10 space-y-8">
	<div class="flex items-center justify-between border-b pb-6">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight">Hệ thống Quản trị & Kiểm duyệt</h1>
			<p class="text-muted-foreground text-sm">
				Kiểm duyệt năng lực giáo viên, quản lý 56 môn học phân cấp và bảng biểu phí nền tảng.
			</p>
		</div>
		<span class="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-primary">
			<Shield class="size-4" /> Moderator Access
		</span>
	</div>

	<!-- TABS -->
	<div class="flex gap-2 border-b pb-2">
		<button
			type="button"
			onclick={() => (activeTab = 'overview')}
			class="px-4 py-2 text-sm font-semibold rounded-xl transition-all {activeTab === 'overview' ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground hover:bg-muted'}"
		>
			Tổng quan
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'teachers')}
			class="px-4 py-2 text-sm font-semibold rounded-xl transition-all {activeTab === 'teachers' ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground hover:bg-muted'}"
		>
			Kiểm duyệt Giáo viên ({SEED_TEACHERS.length})
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'subjects')}
			class="px-4 py-2 text-sm font-semibold rounded-xl transition-all {activeTab === 'subjects' ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground hover:bg-muted'}"
		>
			Môn học ({SEED_SUBJECTS.length})
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'fees')}
			class="px-4 py-2 text-sm font-semibold rounded-xl transition-all {activeTab === 'fees' ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground hover:bg-muted'}"
		>
			Biểu phí nền tảng
		</button>
	</div>

	<!-- TAB CONTENT -->
	{#if activeTab === 'overview'}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-2xl border bg-card p-6 space-y-2">
				<span class="text-xs text-muted-foreground font-semibold">TỔNG KHÓA HỌC</span>
				<div class="text-3xl font-extrabold text-foreground">{SEED_COURSES.length}</div>
				<p class="text-xs text-green-600 font-medium">100% hoạt động</p>
			</div>
			<div class="rounded-2xl border bg-card p-6 space-y-2">
				<span class="text-xs text-muted-foreground font-semibold">GIÁO VIÊN ĐÃ DUYỆT</span>
				<div class="text-3xl font-extrabold text-foreground">{SEED_TEACHERS.length}</div>
				<p class="text-xs text-blue-600 font-medium">Đã xác minh video dạy thật</p>
			</div>
			<div class="rounded-2xl border bg-card p-6 space-y-2">
				<span class="text-xs text-muted-foreground font-semibold">DANH MỤC MÔN HỌC</span>
				<div class="text-3xl font-extrabold text-foreground">{SEED_SUBJECTS.length}</div>
				<p class="text-xs text-muted-foreground">Phân cấp Toán, Văn, Ngoại ngữ</p>
			</div>
			<div class="rounded-2xl border bg-card p-6 space-y-2">
				<span class="text-xs text-muted-foreground font-semibold">TỶ LỆ HỌC VIÊN HÀI LÒNG</span>
				<div class="text-3xl font-extrabold text-amber-500">4.9 / 5.0</div>
				<p class="text-xs text-muted-foreground">Đánh giá minh bạch</p>
			</div>
		</div>
	{:else if activeTab === 'teachers'}
		<div class="rounded-2xl border bg-card divide-y">
			{#each SEED_TEACHERS as t}
				<div class="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<div class="size-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
							{t.display_name.charAt(0)}
						</div>
						<div>
							<h3 class="font-bold text-sm">{t.display_name} ({t.username})</h3>
							<p class="text-xs text-muted-foreground">{t.headline}</p>
						</div>
					</div>
					<div class="flex items-center gap-2 text-xs">
						<span class="px-2.5 py-1 rounded-full bg-green-500/15 text-green-700 dark:text-green-300 font-bold">
							✓ Đã phê duyệt
						</span>
					</div>
				</div>
			{/each}
		</div>
	{:else if activeTab === 'subjects'}
		<div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each SEED_SUBJECTS as s}
				<div class="rounded-xl border bg-card p-3.5 text-xs flex items-center justify-between">
					<span class="font-semibold text-foreground">{s.name}</span>
					<span class="text-muted-foreground text-[11px]">{s.slug}</span>
				</div>
			{/each}
		</div>
	{:else if activeTab === 'fees'}
		<div class="rounded-2xl border bg-card p-6 space-y-4 max-w-xl text-sm">
			<h3 class="font-bold text-base">Cấu hình Biểu phí {SEED_FEE_SCHEDULE.current.name}</h3>
			<ul class="space-y-2 text-muted-foreground">
				<li>• <strong>Phí học viên:</strong> 0 VND (Hoàn toàn miễn phí nền tảng)</li>
				<li>• <strong>Phí phòng họp tự do:</strong> Miễn phí cho 2 người (tối đa 60 phút)</li>
				<li>• <strong>Đơn giá người-giờ:</strong> 800 VND / người-giờ</li>
				<li>• <strong>Chiết khấu nền tảng:</strong> 10% sau 4 buổi đầu tiên</li>
			</ul>
		</div>
	{/if}
</div>
