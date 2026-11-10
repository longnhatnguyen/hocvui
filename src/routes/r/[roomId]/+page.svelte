<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const roomId = page.params.roomId;
		goto(`/app/live/${roomId}`);
	});
</script>

<div class="flex items-center justify-center min-h-screen">
	<p class="text-sm text-muted-foreground animate-pulse">Đang kết nối vào phòng họp {page.params.roomId}...</p>
</div>
