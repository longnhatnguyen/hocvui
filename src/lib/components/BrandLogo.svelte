<script lang="ts">
	interface Props {
		size?: string;
		showText?: boolean;
		className?: string;
	}

	let { size = 'size-8', showText = true, className = '' }: Props = $props();
</script>

<span class="flex items-center gap-2 font-semibold tracking-tight {className}">
	<svg class="{size} shrink-0" viewBox="0 0 64 64" aria-hidden="true">
		<defs>
			<linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="#38bdf8"></stop>
				<stop offset="1" stop-color="#4f46e5"></stop>
			</linearGradient>
		</defs>
		<rect width="64" height="64" rx="15" fill="url(#brand-grad)"></rect>
		<path fill="#fff" d="M30.2 22.5C25 19 18.5 17.6 12 18.1V40.6C18.5 40.1 25 41.9 30.2 45.4Z"></path>
		<path fill="#fff" d="M33.8 22.5C39 19 45.5 17.6 52 18.1V40.6C45.5 40.1 39 41.9 33.8 45.4Z"></path>
		<path fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" d="M15 47.5Q32 59 49 47.5"></path>
		<path fill="#fcd34d" d="M32 5.5Q32.9 10 37.5 11Q32.9 12 32 16.5Q31.1 12 26.5 11Q31.1 10 32 5.5Z"></path>
	</svg>
	{#if showText}
		<span class="font-bold text-lg tracking-tight">Học Vui</span>
	{/if}
</span>
