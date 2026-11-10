<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const isAppOrLiveRoute = $derived(
		page.url.pathname.startsWith('/app') || page.url.pathname.startsWith('/r/')
	);
</script>

{#if isAppOrLiveRoute}
	<div class="flex min-h-screen flex-col bg-background text-foreground">
		{@render children()}
	</div>
{:else}
	<div class="flex min-h-screen flex-col bg-background text-foreground">
		<Header />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}
