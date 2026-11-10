<script lang="ts">
	import { page } from '$app/state';
	import { appState } from '$lib/stores/appState.svelte';
	import { goto } from '$app/navigation';
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	import {
		AlertCircle,
		GraduationCap,
		Presentation,
		CheckCircle2,
		Eye,
		EyeOff
	} from 'lucide-svelte';

	let role = $state<'student' | 'teacher'>(
		page.url.searchParams.get('role') === 'teacher' ? 'teacher' : 'student'
	);
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);
	let errorMessage = $state('');
	let loading = $state(false);

	async function handleRegister(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = '';

		if (password.length < 8) {
			errorMessage = 'Mật khẩu phải có ít nhất 8 ký tự.';
			return;
		}
		if (password !== confirmPassword) {
			errorMessage = 'Mật khẩu xác nhận không khớp.';
			return;
		}

		loading = true;
		const displayName = [lastName.trim(), firstName.trim()].filter(Boolean).join(' ') || firstName.trim();
		const username = email.split('@')[0].replace(/[^a-zA-Z0-9._-]/g, '') + Math.floor(10 + Math.random() * 89);

		try {
			const res = await fetch('/api/v4/lms/public/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					email,
					display_name: displayName,
					password,
					role
				})
			});

			const data = await res.json();
			if (!res.ok) {
				errorMessage = data.message || 'Không thể tạo tài khoản. Vui lòng thử lại.';
				return;
			}

			appState.setUser(data);
			if (role === 'teacher') {
				goto('/app/teach/courses');
			} else {
				goto('/app/learn');
			}
		} catch {
			errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Tạo tài khoản · Học Vui</title>
</svelte:head>

<div class="page-container py-12">
	<div class="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
		<!-- SIGNUP FORM -->
		<div class="bg-card space-y-6 rounded-3xl border p-8 shadow-lg">
			<div class="space-y-1.5">
				<div class="mb-2">
					<BrandLogo />
				</div>
				{#if role === 'teacher'}
					<p class="text-primary text-xs font-bold">Bước 1/3 · Tài khoản</p>
				{/if}
				<h1 class="text-2xl font-extrabold tracking-tight">Tạo tài khoản</h1>
				<p class="text-muted-foreground text-sm">Miễn phí, chỉ mất một phút.</p>
			</div>

			<!-- ROLE SELECTOR: BẠN MUỐN -->
			<div class="space-y-2">
				<span class="text-sm font-semibold">Bạn muốn</span>
				<div class="grid gap-3 sm:grid-cols-2">
					<button
						type="button"
						onclick={() => (role = 'student')}
						class="cursor-pointer rounded-2xl border p-4 text-left transition-all {role === 'student'
							? 'border-primary bg-primary/5 ring-2 ring-primary/20'
							: 'hover:bg-accent'}"
					>
						<div class="flex items-center gap-2 font-bold text-sm">
							<GraduationCap class="size-4 text-primary" />
							<span>Học</span>
						</div>
						<p class="text-muted-foreground mt-1 text-xs leading-relaxed">
							Tìm khóa học và tham gia lớp học trực tiếp.
						</p>
					</button>

					<button
						type="button"
						onclick={() => (role = 'teacher')}
						class="cursor-pointer rounded-2xl border p-4 text-left transition-all {role === 'teacher'
							? 'border-primary bg-primary/5 ring-2 ring-primary/20'
							: 'hover:bg-accent'}"
					>
						<div class="flex items-center gap-2 font-bold text-sm">
							<Presentation class="size-4 text-primary" />
							<span>Dạy học</span>
						</div>
						<p class="text-muted-foreground mt-1 text-xs leading-relaxed">
							Mở khóa học, lên lịch lớp và dạy trực tuyến.
						</p>
					</button>
				</div>
			</div>

			{#if errorMessage}
				<div
					class="bg-destructive/10 text-destructive flex items-center gap-2 rounded-xl p-3 text-xs font-semibold"
				>
					<AlertCircle class="size-4 shrink-0" />
					<span>{errorMessage}</span>
				</div>
			{/if}

			<form onsubmit={handleRegister} class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-1.5">
						<label for="first-name" class="text-sm font-semibold">Tên</label>
						<input
							id="first-name"
							type="text"
							bind:value={firstName}
							required
							placeholder="Tên của bạn"
							class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					<div class="space-y-1.5">
						<label for="last-name" class="text-sm font-semibold">Họ (không bắt buộc)</label>
						<input
							id="last-name"
							type="text"
							bind:value={lastName}
							placeholder="Họ của bạn"
							class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>
				</div>

				<div class="space-y-1.5">
					<label for="reg-email" class="text-sm font-semibold">Email</label>
					<input
						id="reg-email"
						type="email"
						bind:value={email}
						required
						placeholder="ban@example.com"
						class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
					/>
					<p class="text-muted-foreground text-xs">
						Bạn sẽ dùng địa chỉ này để đăng nhập và nhận thông báo lớp học.
					</p>
				</div>

				<div class="space-y-1.5">
					<label for="reg-password" class="text-sm font-semibold">Mật khẩu</label>
					<div class="relative">
						<input
							id="reg-password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							required
							minlength="8"
							placeholder="Ít nhất 8 ký tự"
							class="bg-background w-full rounded-xl border py-2.5 pr-10 pl-3.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
							aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
						>
							{#if showPassword}
								<EyeOff class="size-4" />
							{:else}
								<Eye class="size-4" />
							{/if}
						</button>
					</div>
					<p class="text-muted-foreground text-xs">Ít nhất 8 ký tự.</p>
				</div>

				<div class="space-y-1.5">
					<label for="reg-confirm-password" class="text-sm font-semibold">Xác nhận mật khẩu</label>
					<input
						id="reg-confirm-password"
						type={showPassword ? 'text' : 'password'}
						bind:value={confirmPassword}
						required
						placeholder="Nhập lại mật khẩu"
						class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				<p class="text-muted-foreground text-xs leading-relaxed">
					Khi tạo tài khoản, bạn đồng ý với
					<a href="/terms" class="text-primary hover:underline">Điều khoản sử dụng</a>
					và
					<a href="/privacy" class="text-primary hover:underline">Chính sách quyền riêng tư</a>.
				</p>

				<button
					type="submit"
					disabled={loading}
					class="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-all disabled:opacity-50"
				>
					{loading
						? 'Đang tạo tài khoản...'
						: role === 'teacher'
							? 'Tiếp tục'
							: 'Tạo tài khoản'}
				</button>
			</form>

			<p class="text-muted-foreground text-center text-sm">
				Đã có tài khoản?
				<a href="/login" class="text-primary font-semibold hover:underline">Đăng nhập</a>
			</p>
		</div>

		<!-- ROLE BENEFITS PANEL -->
		<div class="bg-muted/40 space-y-5 rounded-3xl border p-6 md:p-8">
			{#if role === 'student'}
				<h2 class="text-lg font-extrabold">Khi là học viên, bạn có</h2>
				<ul class="space-y-4 text-sm">
					<li class="flex items-start gap-3">
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-blue-600" />
						<span>
							Lớp học trực tuyến với video, bảng trắng và phòng chat ngay trên trình duyệt
						</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-blue-600" />
						<span>Lịch học cá nhân và nhắc lịch trước mỗi buổi học</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-blue-600" />
						<span>Nhận xét trực tiếp từ giáo viên sau từng buổi và cuối khóa</span>
					</li>
				</ul>
			{:else}
				<h2 class="text-lg font-extrabold">Khi là giáo viên, bạn có</h2>
				<ul class="space-y-4 text-sm">
					<li class="flex items-start gap-3">
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-blue-600" />
						<span>Trang cá nhân công khai và danh mục khóa học của riêng bạn</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-blue-600" />
						<span>Phòng học trực tuyến sẵn sàng: video, bảng trắng nhiều trang, chat lớp</span>
					</li>
					<li class="flex items-start gap-3">
						<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-blue-600" />
						<span>Quản lý lớp, lịch học, điểm danh và doanh thu ở một nơi</span>
					</li>
				</ul>
			{/if}
		</div>
	</div>
</div>
