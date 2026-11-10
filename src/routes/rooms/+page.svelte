<script lang="ts">
	import {
		Video,
		Presentation,
		MessagesSquare,
		Users,
		Clock,
		Plus,
		ArrowRight,
		CheckCircle2,
		ExternalLink
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { appState } from '$lib/stores/appState.svelte';
	import { onMount } from 'svelte';

	let roomName = $state('');
	let membersCount = $state(2);
	let durationMinutes = $state(60);
	let activePhase = $state<'upcoming' | 'live' | 'past'>('live');
	let roomsList = $state<any[]>([]);
	let creating = $state(false);

	// Pricing calculation based on SEED_ROOMS_OFFER:
	// free_members: 2, free_minutes: 60, person_hour_price: 800 VND, min paid: 2000 VND
	const calculatedPrice = $derived.by(() => {
		if (membersCount <= 2 && durationMinutes <= 60) {
			return 0;
		}
		if (membersCount <= 2 && durationMinutes > 60) {
			const extraHours = (durationMinutes - 60) / 60;
			return Math.max(2000, Math.round(membersCount * extraHours * 800));
		}
		const hours = durationMinutes / 60;
		return Math.max(2000, Math.round(membersCount * hours * 800));
	});

	onMount(async () => {
		await loadRooms();
	});

	async function loadRooms() {
		try {
			const res = await fetch('/api/v4/lms/rooms');
			if (res.ok) {
				const data = await res.json();
				roomsList = data.items || [];
			}
		} catch {}
	}

	async function handleCreateRoom(e: SubmitEvent) {
		e.preventDefault();
		creating = true;
		const name = roomName.trim() || `Phòng học nhóm ${Math.floor(100 + Math.random() * 900)}`;

		try {
			const res = await fetch('/api/v4/lms/rooms', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					max_members: membersCount,
					duration_minutes: durationMinutes,
					host_name: appState.user?.display_name || 'Chủ phòng'
				})
			});
			if (res.ok) {
				const room = await res.json();
				goto(`/r/${room.id}?name=${encodeURIComponent(room.name)}`);
				return;
			}
		} catch {}

		const fallbackId = `room_${Math.random().toString(36).substring(2, 8)}`;
		goto(`/r/${fallbackId}?name=${encodeURIComponent(name)}`);
	}
</script>

<svelte:head>
	<title>Phòng họp · Học Vui</title>
	<meta
		name="description"
		content="Gọi video, bảng trắng và trò chuyện cùng một nơi, cho nhóm học, dự án hay buổi gặp mặt. Phòng nhỏ được miễn phí."
	/>
</svelte:head>

<div class="space-y-16 pb-16">
	<!-- HERO SECTION -->
	<section
		class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-white md:py-20"
	>
		<div class="page-container max-w-4xl space-y-6">
			<p class="text-sm font-semibold tracking-wide text-blue-100 uppercase">Phòng họp</p>
			<h1 class="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
				Phòng riêng cho nhóm của bạn trên Học Vui
			</h1>
			<p class="max-w-2xl text-lg leading-relaxed text-blue-50/90">
				Gọi video, bảng trắng và trò chuyện cùng một nơi, cho nhóm học, dự án hay buổi gặp mặt.
				Phòng nhỏ được miễn phí.
			</p>
			<div class="flex flex-wrap gap-3 pt-1">
				<a
					href="#book"
					class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50"
				>
					Đặt phòng
				</a>
				<a
					href="#pricing"
					class="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-transparent px-5 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
				>
					Xem giá
				</a>
			</div>
		</div>
	</section>

	<!-- 3 BENEFITS -->
	<section class="page-container">
		<div class="grid gap-6 md:grid-cols-3">
			<div class="bg-card rounded-2xl border p-6 space-y-2.5 shadow-xs">
				<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
					<Video class="size-6" />
				</span>
				<h2 class="text-lg font-bold">Gọi video</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Mọi người nhìn thấy và nghe nhau, và có thể chia sẻ màn hình.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-2.5 shadow-xs">
				<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
					<Presentation class="size-6" />
				</span>
				<h2 class="text-lg font-bold">Bảng trắng</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Cùng vẽ, viết và giải bài trực tiếp.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-2.5 shadow-xs">
				<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
					<MessagesSquare class="size-6" />
				</span>
				<h2 class="text-lg font-bold">Trò chuyện</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Khung trò chuyện riêng của phòng, được xóa khi phòng kết thúc.
				</p>
			</div>
		</div>
	</section>

	<!-- 4 STEPS: CÁCH HOẠT ĐỘNG -->
	<section class="bg-muted/40 border-y py-14">
		<div class="page-container space-y-8">
			<h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">Cách hoạt động</h2>
			<ol class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<li class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<span
						class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-xs font-bold"
						>1</span
					>
					<p class="text-sm font-medium leading-relaxed">
						Đặt phòng: tên, số người và thời lượng.
					</p>
				</li>
				<li class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<span
						class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-xs font-bold"
						>2</span
					>
					<p class="text-sm font-medium leading-relaxed">
						Phòng miễn phí mở ngay; phòng tính phí mở khi khoản chuyển của bạn về.
					</p>
				</li>
				<li class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<span
						class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-xs font-bold"
						>3</span
					>
					<p class="text-sm font-medium leading-relaxed">
						Thêm người bằng email, tên đăng nhập hoặc gửi liên kết mời khách.
					</p>
				</li>
				<li class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<span
						class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-xs font-bold"
						>4</span
					>
					<p class="text-sm font-medium leading-relaxed">
						Cùng vào phòng. Thời gian tính từ cuộc gọi đầu tiên và không tạm dừng.
					</p>
				</li>
			</ol>
		</div>
	</section>

	<!-- PRICING & BOOKING FORM -->
	<section id="book" class="page-container scroll-mt-20 space-y-10">
		<div class="max-w-2xl space-y-2">
			<h2 class="text-3xl font-extrabold tracking-tight">Đặt phòng</h2>
			<p class="text-muted-foreground text-sm leading-relaxed">
				Đặt tên, chọn số người và thời lượng. Phòng miễn phí mở ngay; phòng tính phí mở khi bạn
				thanh toán xong.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
			<!-- BOOKING FORM -->
			<div class="bg-card rounded-3xl border p-6 md:p-8 space-y-6 shadow-xs">
				<form onsubmit={handleCreateRoom} class="space-y-5">
					<div class="space-y-1.5">
						<label for="room-name" class="text-sm font-semibold">Tên phòng</label>
						<input
							id="room-name"
							type="text"
							maxlength="100"
							bind:value={roomName}
							placeholder="Ví dụ: Học nhóm Toán 12, Họp dự án cuối kỳ..."
							class="bg-background w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
						/>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<div class="space-y-1.5">
							<label for="room-members" class="text-sm font-semibold">Số người</label>
							<input
								id="room-members"
								type="number"
								min="2"
								max="50"
								bind:value={membersCount}
								class="bg-background w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
							/>
							<p class="text-muted-foreground text-xs">Tính cả bạn, tối đa 50.</p>
						</div>

						<div class="space-y-1.5">
							<label for="room-minutes" class="text-sm font-semibold">Thời lượng</label>
							<select
								id="room-minutes"
								bind:value={durationMinutes}
								class="bg-background w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
							>
								<option value={60}>1 giờ (60 phút)</option>
								<option value={120}>2 giờ (120 phút)</option>
								<option value={180}>3 giờ (180 phút)</option>
								<option value={240}>4 giờ (240 phút)</option>
							</select>
							<p class="text-muted-foreground text-xs">Tính từ cuộc gọi đầu tiên, không tạm dừng.</p>
						</div>
					</div>

					<div class="rounded-2xl border bg-muted/30 p-4 space-y-1.5">
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold">Giá</span>
							<span
								class="text-xl font-extrabold {calculatedPrice === 0
									? 'text-green-600 dark:text-green-400'
									: 'text-primary'}"
							>
								{calculatedPrice === 0
									? 'Miễn phí'
									: `${calculatedPrice.toLocaleString('vi-VN')} ₫`}
							</span>
						</div>
						<p class="text-muted-foreground text-xs">
							{calculatedPrice === 0
								? 'Phòng mở ngay khi bạn đặt.'
								: 'Bạn chuyển khoản ở bước tiếp theo, phòng mở khi tiền về.'}
						</p>
					</div>

					<button
						type="submit"
						disabled={creating}
						class="bg-primary hover:bg-primary/90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition-all disabled:opacity-50"
					>
						<Plus class="size-4" />
						{calculatedPrice === 0 ? 'Tạo phòng' : 'Tiếp tục thanh toán & Mở phòng'}
					</button>
				</form>
			</div>

			<!-- PRICING TERMS -->
			<div id="pricing" class="bg-card rounded-3xl border p-6 md:p-8 space-y-5 shadow-xs scroll-mt-20">
				<h3 class="text-xl font-bold">Giá phòng</h3>
				<ul class="space-y-3 text-sm leading-relaxed">
					<li class="flex items-start gap-2.5">
						<CheckCircle2 class="mt-0.5 size-4 shrink-0 text-green-600" />
						<span>Phòng tối đa <strong>2 người</strong> được <strong>miễn phí 60 phút</strong>.</span>
					</li>
					<li class="flex items-start gap-2.5">
						<CheckCircle2 class="mt-0.5 size-4 shrink-0 text-blue-600" />
						<span>
							Quá mức đó, mỗi người trả <strong>800 ₫</strong> cho mỗi giờ của phòng.
						</span>
					</li>
					<li class="flex items-start gap-2.5">
						<CheckCircle2 class="mt-0.5 size-4 shrink-0 text-blue-600" />
						<span>Phòng có phí tốn ít nhất <strong>2.000 ₫</strong> tổng cộng.</span>
					</li>
					<li class="flex items-start gap-2.5">
						<CheckCircle2 class="mt-0.5 size-4 shrink-0 text-blue-600" />
						<span>
							Mỗi phòng chứa tối đa <strong>50 người</strong>, đặt theo số giờ nguyên, tối đa
							<strong>4 giờ</strong>.
						</span>
					</li>
				</ul>

				<div class="border-t pt-4 space-y-2 text-xs">
					<p class="font-semibold text-foreground">Ví dụ minh họa:</p>
					<div class="grid grid-cols-2 gap-2">
						<div class="rounded-xl bg-muted/50 p-3">
							<p class="font-bold">2 người, 60 phút</p>
							<p class="text-green-600 font-bold mt-0.5">Miễn phí</p>
						</div>
						<div class="rounded-xl bg-muted/50 p-3">
							<p class="font-bold">5 người, 2 giờ</p>
							<p class="text-primary font-bold mt-0.5">8.000 ₫</p>
						</div>
					</div>
					<p class="text-muted-foreground pt-2">
						Phòng giữ nguyên giá lúc đặt. Phòng không được hoàn tiền: phòng không dùng sẽ đóng sau
						bảy ngày.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- MY ROOMS LIST -->
	<section class="page-container space-y-4">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div>
				<h2 class="text-xl font-bold">Phòng họp của tôi</h2>
				<p class="text-muted-foreground text-xs">
					Đặt một phòng rồi gửi liên kết cho những người bạn muốn mời, phòng sẽ hiện ở đây.
				</p>
			</div>

			<div class="bg-muted flex rounded-xl p-1 text-xs font-semibold">
				<button
					type="button"
					onclick={() => (activePhase = 'live')}
					class="cursor-pointer rounded-lg px-3 py-1.5 transition-all {activePhase === 'live'
						? 'bg-card text-foreground shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					Đang diễn ra
				</button>
				<button
					type="button"
					onclick={() => (activePhase = 'upcoming')}
					class="cursor-pointer rounded-lg px-3 py-1.5 transition-all {activePhase === 'upcoming'
						? 'bg-card text-foreground shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					Sắp tới
				</button>
				<button
					type="button"
					onclick={() => (activePhase = 'past')}
					class="cursor-pointer rounded-lg px-3 py-1.5 transition-all {activePhase === 'past'
						? 'bg-card text-foreground shadow-xs'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					Đã qua
				</button>
			</div>
		</div>

		{#if roomsList.length > 0}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each roomsList as room}
					<div class="bg-card flex items-center justify-between rounded-2xl border p-5 shadow-xs">
						<div class="space-y-1">
							<div class="flex items-center gap-2">
								<span class="size-2 rounded-full bg-green-500"></span>
								<h3 class="font-bold text-sm">{room.name}</h3>
							</div>
							<p class="text-muted-foreground text-xs">
								{room.max_members} người · {room.duration_minutes} phút · Của {room.host_name}
							</p>
						</div>
						<a
							href="/r/{room.id}?name={encodeURIComponent(room.name)}"
							class="bg-primary/10 text-primary hover:bg-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors hover:text-white"
						>
							Vào phòng <ExternalLink class="size-3.5" />
						</a>
					</div>
				{/each}
			</div>
		{:else}
			<div class="bg-muted/20 rounded-2xl border py-10 text-center text-sm text-muted-foreground">
				Không có phòng nào đang mở. Hãy đặt phòng mới ở phía trên.
			</div>
		{/if}
	</section>
</div>
