<script lang="ts">
	import { page } from '$app/state';
	import { appState } from '$lib/stores/appState.svelte';
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	import {
		LayoutDashboard,
		BookOpen,
		GraduationCap,
		Presentation,
		ShieldAlert,
		Video,
		Sun,
		Moon,
		LogOut,
		Home,
		User
	} from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const isLiveClassroom = $derived(page.url.pathname.startsWith('/app/live/'));

	const navGroups = [
		{
			title: 'Tổng quan',
			items: [
				{ href: '/app', label: 'Bảng điều khiển', icon: LayoutDashboard },
				{ href: '/rooms', label: 'Phòng họp', icon: Video }
			]
		},
		{
			title: 'Học tập',
			items: [{ href: '/app/learn', label: 'Lớp tôi đang học', icon: GraduationCap }]
		},
		{
			title: 'Giảng dạy',
			items: [{ href: '/app/teach/courses', label: 'Khóa học của tôi', icon: Presentation }]
		},
		{
			title: 'Sàn khóa học',
			items: [{ href: '/app/market', label: 'Quản trị & Kiểm duyệt', icon: ShieldAlert }]
		}
	];
</script>

{#if isLiveClassroom}
	{@render children()}
{:else}
	<div class="flex min-h-screen bg-background text-foreground">
		<!-- SIDEBAR -->
		<aside class="bg-card hidden w-64 shrink-0 flex-col border-r md:flex">
			<div class="flex h-16 items-center justify-between border-b px-5">
				<a href="/" aria-label="Học Vui">
					<BrandLogo />
				</a>
			</div>

			<nav class="flex-1 space-y-6 overflow-y-auto p-4 text-sm">
				{#each navGroups as group}
					<div class="space-y-1">
						<p class="text-muted-foreground px-3 text-[11px] font-bold tracking-wider uppercase">
							{group.title}
						</p>
						{#each group.items as item}
							{@const Icon = item.icon}
							{@const active = page.url.pathname === item.href}
							<a
								href={item.href}
								class="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium transition-colors {active
									? 'bg-primary text-white font-semibold shadow-xs'
									: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
							>
								<Icon class="size-4" />
								<span>{item.label}</span>
							</a>
						{/each}
					</div>
				{/each}
			</nav>

			<div class="border-t p-4 space-y-2">
				<a
					href="/courses"
					class="text-muted-foreground hover:bg-accent hover:text-foreground flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors"
				>
					<Home class="size-4" />
					<span>Trang công khai & Danh mục</span>
				</a>
			</div>
		</aside>

		<!-- MAIN CONTENT AREA -->
		<div class="flex flex-1 flex-col min-w-0">
			<!-- APP TOPBAR -->
			<header class="bg-background/85 sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6 backdrop-blur">
				<div class="flex items-center gap-3 md:hidden">
					<a href="/">
						<BrandLogo />
					</a>
				</div>
				<div class="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
					<span>Không gian học tập & giảng dạy trực tuyến</span>
				</div>

				<div class="flex items-center gap-2">
					<!-- Mobile quick nav -->
					<div class="flex md:hidden items-center gap-1 text-xs">
						<a href="/app/learn" class="rounded-lg border px-2.5 py-1 font-semibold">Học tập</a>
						<a href="/app/teach/courses" class="rounded-lg border px-2.5 py-1 font-semibold">Giảng dạy</a>
					</div>

					<button
						type="button"
						onclick={() => appState.toggleTheme()}
						class="hover:bg-muted text-muted-foreground hover:text-foreground flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors"
						aria-label="Đổi giao diện sáng/tối"
					>
						{#if appState.theme === 'dark'}
							<Sun class="size-4.5 text-amber-400" />
						{:else}
							<Moon class="size-4.5" />
						{/if}
					</button>

					{#if appState.user}
						<div class="flex items-center gap-2 pl-2 border-l">
							<div class="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
								<User class="size-3.5" />
								<span>{appState.user.display_name}</span>
							</div>
							<button
								type="button"
								onclick={() => appState.logout()}
								class="text-muted-foreground hover:text-destructive cursor-pointer p-1.5 transition-colors"
								title="Đăng xuất"
							>
								<LogOut class="size-4" />
							</button>
						</div>
					{:else}
						<a
							href="/login"
							class="bg-primary rounded-xl px-3.5 py-1.5 text-xs font-bold text-white"
						>
							Đăng nhập
						</a>
					{/if}
				</div>
			</header>

			<main class="flex-1">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
