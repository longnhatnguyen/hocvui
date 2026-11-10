<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import { goto } from '$app/navigation';
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	import { AlertCircle, Eye, EyeOff } from 'lucide-svelte';

	let loginId = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let errorMessage = $state('');
	let loading = $state(false);

	async function handleLogin(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = '';
		loading = true;

		try {
			const res = await fetch('/api/v4/users/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login_id: loginId, password })
			});

			const data = await res.json();
			if (!res.ok) {
				errorMessage = data.message || 'Tên đăng nhập hoặc mật khẩu không đúng.';
				return;
			}

			appState.setUser(data);
			if (data.role === 'teacher') {
				goto('/app/teach/courses');
			} else if (data.role === 'admin') {
				goto('/app/market');
			} else {
				goto('/app/learn');
			}
		} catch {
			errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng thử lại.';
		} finally {
			loading = false;
		}
	}

	function quickDemoLogin(id: string, pw: string) {
		loginId = id;
		password = pw;
	}
</script>

<svelte:head>
	<title>Đăng nhập hệ thống · Học Vui</title>
</svelte:head>

<div class="page-container flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
	<div class="bg-card w-full max-w-md space-y-6 rounded-3xl border p-8 shadow-lg">
		<div class="space-y-2 text-center">
			<div class="inline-block">
				<BrandLogo />
			</div>
			<h1 class="text-2xl font-extrabold tracking-tight">Đăng nhập hệ thống</h1>
			<p class="text-muted-foreground text-sm">Chào mừng bạn quay trở lại</p>
		</div>

		{#if errorMessage}
			<div
				class="bg-destructive/10 text-destructive flex items-center gap-2 rounded-xl p-3 text-xs font-semibold"
			>
				<AlertCircle class="size-4 shrink-0" />
				<span>{errorMessage}</span>
			</div>
		{/if}

		<form onsubmit={handleLogin} class="space-y-4">
			<div class="space-y-1.5">
				<label for="login-id" class="text-sm font-semibold">Tài khoản hoặc email</label>
				<input
					id="login-id"
					type="text"
					bind:value={loginId}
					required
					placeholder="ban@example.com"
					class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<div class="space-y-1.5">
				<div class="flex items-center justify-between">
					<label for="login-password" class="text-sm font-semibold">Mật khẩu</label>
					<a href="/forgot-password" class="text-primary text-xs font-medium hover:underline">
						Quên mật khẩu?
					</a>
				</div>
				<div class="relative">
					<input
						id="login-password"
						type={showPassword ? 'text' : 'password'}
						bind:value={password}
						required
						placeholder="Nhập mật khẩu của bạn"
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
			</div>

			<button
				type="submit"
				disabled={loading}
				class="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-all disabled:opacity-50"
			>
				{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
			</button>
		</form>

		<!-- Quick Demo Accounts -->
		<div class="bg-muted/50 space-y-2 rounded-2xl border p-3.5 text-xs">
			<p class="font-semibold text-foreground">Tài khoản dùng thử nhanh (1-click điền sẵn):</p>
			<div class="grid grid-cols-3 gap-2">
				<button
					type="button"
					onclick={() => quickDemoLogin('hocvien.demo', '123456')}
					class="bg-card hover:border-primary cursor-pointer rounded-lg border px-2 py-1.5 font-semibold transition-colors"
				>
					Học viên
				</button>
				<button
					type="button"
					onclick={() => quickDemoLogin('nguyen.van.hieu', '123456')}
					class="bg-card hover:border-primary cursor-pointer rounded-lg border px-2 py-1.5 font-semibold transition-colors"
				>
					Giáo viên
				</button>
				<button
					type="button"
					onclick={() => quickDemoLogin('admin', '123456')}
					class="bg-card hover:border-primary cursor-pointer rounded-lg border px-2 py-1.5 font-semibold transition-colors"
				>
					Quản trị
				</button>
			</div>
		</div>

		<p class="text-muted-foreground text-center text-sm">
			Chưa có tài khoản?
			<a href="/register" class="text-primary font-semibold hover:underline">Tạo tài khoản</a>
		</p>
	</div>
</div>
