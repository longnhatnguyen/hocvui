<script lang="ts">
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	import { CheckCircle2, ArrowLeft } from 'lucide-svelte';

	let email = $state('');
	let sent = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (email.trim()) {
			sent = true;
		}
	}
</script>

<svelte:head>
	<title>Quên mật khẩu · Học Vui</title>
</svelte:head>

<div class="page-container flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
	<div class="bg-card w-full max-w-md space-y-6 rounded-3xl border p-8 shadow-lg">
		<div class="space-y-2 text-center">
			<div class="inline-block">
				<BrandLogo />
			</div>
			<h1 class="text-2xl font-extrabold tracking-tight">Quên mật khẩu</h1>
			<p class="text-muted-foreground text-sm">
				Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
			</p>
		</div>

		{#if sent}
			<div
				class="space-y-3 rounded-2xl bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-300"
			>
				<div class="flex items-center gap-2 font-bold">
					<CheckCircle2 class="size-5 shrink-0" />
					<span>Kiểm tra hộp thư của bạn</span>
				</div>
				<p class="text-xs leading-relaxed">
					Nếu địa chỉ email đã đăng ký tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.
				</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="space-y-1.5">
					<label for="forgot-email" class="text-sm font-semibold">Email</label>
					<input
						id="forgot-email"
						type="email"
						bind:value={email}
						required
						placeholder="ban@example.com"
						class="bg-background w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>

				<button
					type="submit"
					class="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-xl py-3 text-sm font-bold text-white shadow-sm transition-all"
				>
					Gửi liên kết đặt lại
				</button>
			</form>
		{/if}

		<div class="text-center">
			<a
				href="/login"
				class="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
			>
				<ArrowLeft class="size-4" /> Quay lại đăng nhập
			</a>
		</div>
	</div>
</div>
