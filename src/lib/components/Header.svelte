<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import BrandLogo from './BrandLogo.svelte';
	import { Moon, Sun, Menu, X, User, LogOut, BookOpen, GraduationCap, Video } from 'lucide-svelte';

	const navLinks = [
		{ href: '/courses', label: 'Khóa học' },
		{ href: '/teachers', label: 'Giáo viên' },
		{ href: '/teach', label: 'Dạy học' },
		{ href: '/rooms', label: 'Phòng họp' },
		{ href: '/about', label: 'Giới thiệu' }
	];
</script>

<header class="bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 border-b backdrop-blur">
	<div class="page-container flex h-16 items-center gap-3">
		<a href="/" class="shrink-0" aria-label="Học Vui — Trang chủ">
			<BrandLogo />
		</a>

		<nav class="hidden items-center gap-1 md:flex ml-6" aria-label="Điều hướng chính">
			{#each navLinks as link}
				<a
					href={link.href}
					class="rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors text-muted-foreground hover:bg-accent hover:text-foreground"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-2">
			<!-- Language switch -->
			<div class="border-input bg-background/80 hidden shrink-0 rounded-lg border p-0.5 text-xs font-semibold sm:flex" role="group" aria-label="Ngôn ngữ">
				<button
					type="button"
					onclick={() => appState.setLocale('vi')}
					class="cursor-pointer rounded-md px-2 py-1 transition-all {appState.locale === 'vi' ? 'bg-primary text-white font-bold' : 'text-muted-foreground hover:text-foreground'}"
				>
					VI
				</button>
				<button
					type="button"
					onclick={() => appState.setLocale('en')}
					class="cursor-pointer rounded-md px-2 py-1 transition-all {appState.locale === 'en' ? 'bg-primary text-white font-bold' : 'text-muted-foreground hover:text-foreground'}"
				>
					EN
				</button>
			</div>

			<!-- Theme toggle -->
			<button
				type="button"
				onclick={() => appState.toggleTheme()}
				class="hover:bg-muted text-muted-foreground hover:text-foreground flex size-9 items-center justify-center rounded-lg border border-transparent transition-colors"
				aria-label="Đổi giao diện sáng/tối"
			>
				{#if appState.theme === 'dark'}
					<Sun class="size-4.5 text-amber-400" />
				{:else}
					<Moon class="size-4.5" />
				{/if}
			</button>

			<!-- Auth button -->
			{#if appState.user}
				<div class="flex items-center gap-2">
					<a
						href={appState.user.role === 'teacher' ? '/app/teach/courses' : '/app/learn'}
						class="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary/20 transition-all"
					>
						<User class="size-4" />
						<span>{appState.user.display_name}</span>
					</a>
					<button
						onclick={() => appState.logout()}
						class="p-2 text-muted-foreground hover:text-destructive transition-colors"
						title="Đăng xuất"
					>
						<LogOut class="size-4" />
					</button>
				</div>
			{:else}
				<a
					href="/login"
					class="hidden sm:inline-flex items-center justify-center rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
				>
					Đăng nhập
				</a>
				<a
					href="/register?role=student"
					class="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-white shadow-xs hover:bg-primary/90 transition-all"
				>
					Đăng ký
				</a>
			{/if}

			<!-- Mobile menu button -->
			<button
				type="button"
				onclick={() => (appState.mobileMenuOpen = !appState.mobileMenuOpen)}
				class="md:hidden flex size-9 items-center justify-center rounded-lg border border-border"
				aria-label="Menu"
			>
				{#if appState.mobileMenuOpen}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile drawer -->
	{#if appState.mobileMenuOpen}
		<div class="border-b bg-background p-4 md:hidden animate-in slide-in-from-top duration-200">
			<nav class="flex flex-col gap-2">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={() => (appState.mobileMenuOpen = false)}
						class="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
					>
						{link.label}
					</a>
				{/each}
				<hr class="my-2 border-border" />
				{#if !appState.user}
					<div class="grid grid-cols-2 gap-2">
						<a
							href="/login"
							onclick={() => (appState.mobileMenuOpen = false)}
							class="flex justify-center items-center rounded-lg border py-2 text-sm font-medium"
						>
							Đăng nhập
						</a>
						<a
							href="/register?role=student"
							onclick={() => (appState.mobileMenuOpen = false)}
							class="flex justify-center items-center rounded-lg bg-primary py-2 text-sm font-medium text-white"
						>
							Đăng ký
						</a>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
</header>
