<script lang="ts">
	import {
		BadgeCheck,
		House,
		Users,
		PiggyBank,
		ThumbsUp,
		Eye,
		Video,
		Play,
		ArrowRight
	} from 'lucide-svelte';

	let showVideo = $state(false);
</script>

<svelte:head>
	<title>Giới thiệu · Học Vui</title>
	<meta
		name="description"
		content="Học Vui kết nối học viên với các giáo viên đã được xác minh qua những lớp học trực tuyến quy mô nhỏ, học trực tiếp từ bất cứ đâu."
	/>
</svelte:head>

<div class="space-y-16 py-12 md:py-20">
	<!-- HERO & STORY -->
	<section class="page-container max-w-4xl space-y-6">
		<p class="text-primary text-xs font-bold tracking-wider uppercase">Về Học Vui</p>
		<h1 class="text-3xl leading-tight font-extrabold tracking-tight md:text-5xl">
			Lớp học trực tuyến cho mọi người, do những giáo viên giỏi dẫn dắt
		</h1>
		<p class="text-foreground text-lg font-medium leading-relaxed md:text-xl">
			Học Vui kết nối học viên với các giáo viên đã được xác minh qua những lớp học trực tuyến quy
			mô nhỏ, học trực tiếp từ bất cứ đâu.
		</p>

		<div class="text-muted-foreground space-y-4 pt-2 text-base leading-relaxed">
			<p>
				Chúng tôi xây dựng Học Vui vì người thầy giỏi quan trọng hơn bất kỳ công cụ nào — nhưng hầu
				hết mọi người chỉ gặp được vài giáo viên quanh nơi mình sống, còn việc tự tìm lớp trên mạng
				lại khó biết trước chất lượng thật sự của buổi học.
			</p>
			<p>
				Trên Học Vui, mỗi giáo viên đều được đội ngũ xác minh qua hồ sơ năng lực và video một buổi
				dạy thật trước khi mở khóa học. Khi đã vào lớp, chỉ những học viên thực sự tham gia buổi
				học mới có thể đánh giá — vì vậy mỗi con số về mức độ hài lòng bạn thấy đều đến từ người đã
				ngồi trong lớp đó.
			</p>
			<p>
				Mỗi buổi học diễn ra trực tiếp ngay trên trình duyệt với video, bảng trắng nhiều trang và
				phòng trò chuyện của lớp. Học viên học tại nhà, tiết kiệm thời gian đi lại, và không trả
				phí nền tảng; giáo viên giữ quyền định học phí và chỉ trả một khoản phí nền tảng minh bạch
				theo quy mô giảng dạy của mình.
			</p>
		</div>
	</section>

	<!-- 3 PILLARS -->
	<section class="page-container">
		<div class="grid gap-6 md:grid-cols-3">
			<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
				<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
					<BadgeCheck class="size-6" />
				</span>
				<h2 class="text-lg font-bold">Giáo viên được xác minh và đánh giá</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Kiểm duyệt viên xem hồ sơ và video buổi dạy thật của từng giáo viên; đánh giá chỉ đến từ
					học viên đã vào học.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
				<span class="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 inline-flex rounded-xl p-3">
					<House class="size-6" />
				</span>
				<h2 class="text-lg font-bold">Học trực tuyến tại nhà</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Video, bảng trắng và phòng chat ngay trên trình duyệt — không cần đi lại, không cần cài
					phần mềm.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
				<span class="bg-amber-500/10 text-amber-600 dark:text-amber-400 inline-flex rounded-xl p-3">
					<Users class="size-6" />
				</span>
				<h2 class="text-lg font-bold">Mở cho mọi giáo viên giỏi</h2>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Ai có chuyên môn và khả năng giảng dạy đều có thể đăng ký, được góp ý rõ ràng và mở lớp
					cho học viên khắp nơi.
				</p>
			</div>
		</div>
	</section>

	<!-- VIDEO SECTION -->
	<section class="bg-muted/40 border-y py-16">
		<div class="page-container max-w-4xl space-y-6 text-center">
			<div class="space-y-2">
				<p class="text-primary text-xs font-bold tracking-wider uppercase">Video giới thiệu</p>
				<h2 class="text-3xl font-extrabold tracking-tight">Xem Học Vui hoạt động</h2>
				<p class="text-muted-foreground mx-auto max-w-2xl">
					Một vòng ngắn qua Học Vui — cách học viên tìm lớp và tham gia buổi học trực tiếp, và cách
					giáo viên mở lớp của mình.
				</p>
			</div>

			<div class="relative aspect-video overflow-hidden rounded-3xl border bg-zinc-950 shadow-xl">
				{#if showVideo}
					<iframe
						class="size-full"
						src="https://www.youtube-nocookie.com/embed/oWIhaROQiK4?autoplay=1"
						title="Video giới thiệu: Xem Học Vui hoạt động"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<button
						type="button"
						onclick={() => (showVideo = true)}
						class="group relative size-full cursor-pointer"
						aria-label="Phát video: Xem Học Vui hoạt động"
					>
						<img
							src="https://i.ytimg.com/vi/oWIhaROQiK4/hqdefault.jpg"
							alt="Xem Học Vui hoạt động"
							class="size-full object-cover opacity-80 transition-opacity group-hover:opacity-95"
						/>
						<div class="absolute inset-0 flex items-center justify-center bg-black/30">
							<span
								class="flex size-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-transform group-hover:scale-110"
							>
								<Play class="ml-1 size-7 fill-white" />
							</span>
						</div>
					</button>
				{/if}
			</div>
		</div>
	</section>

	<!-- 4 COMMITMENTS -->
	<section class="page-container space-y-8">
		<h2 class="text-2xl font-extrabold tracking-tight md:text-3xl">Cam kết của chúng tôi</h2>
		<div class="grid gap-6 sm:grid-cols-2">
			<div class="bg-card rounded-2xl border p-6 space-y-2 shadow-xs">
				<div class="flex items-center gap-2.5">
					<PiggyBank class="size-5 text-green-600" />
					<h3 class="text-lg font-bold">Học viên không mất phí nền tảng</h3>
				</div>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Học viên chỉ trả đúng học phí của khóa học do giáo viên đặt ra.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-2 shadow-xs">
				<div class="flex items-center gap-2.5">
					<ThumbsUp class="size-5 text-blue-600" />
					<h3 class="text-lg font-bold">Đánh giá thật</h3>
				</div>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Không có đánh giá ẩn danh hay mua điểm — mỗi đánh giá gắn với một học viên đã tham gia
					lớp.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-2 shadow-xs">
				<div class="flex items-center gap-2.5">
					<Eye class="size-5 text-indigo-600" />
					<h3 class="text-lg font-bold">Phí giáo viên minh bạch</h3>
				</div>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Có mức miễn phí hằng tháng, bảng phí công khai và mỗi lớp giữ nguyên mức phí lúc mở lớp.
				</p>
			</div>

			<div class="bg-card rounded-2xl border p-6 space-y-2 shadow-xs">
				<div class="flex items-center gap-2.5">
					<Video class="size-5 text-amber-600" />
					<h3 class="text-lg font-bold">Học trực tiếp</h3>
				</div>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Lớp học diễn ra theo thời gian thực giữa giáo viên và học viên, có bảng trắng lưu lại sau
					mỗi buổi để ôn tập.
				</p>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="page-container">
		<div
			class="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white space-y-5 md:p-12"
		>
			<h2 class="text-2xl font-extrabold md:text-3xl">Bắt đầu học hoặc dạy trên Học Vui</h2>
			<p class="mx-auto max-w-xl text-blue-100">
				Khám phá các khóa học đang mở hoặc chia sẻ chuyên môn của bạn với học viên khắp nơi.
			</p>
			<div class="flex flex-wrap justify-center gap-3 pt-1">
				<a
					href="/courses"
					class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-xs hover:bg-blue-50"
				>
					Khám phá khóa học <ArrowRight class="size-4" />
				</a>
				<a
					href="/teach"
					class="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
				>
					Tìm hiểu về dạy học
				</a>
			</div>
		</div>
	</section>
</div>
