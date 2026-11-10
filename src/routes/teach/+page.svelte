<script lang="ts">
	import {
		Presentation,
		Video,
		Users,
		CalendarDays,
		Star,
		PiggyBank,
		BadgeCheck,
		Play,
		ArrowRight,
		GraduationCap,
		MessageSquareText,
		Eye,
		Calculator
	} from 'lucide-svelte';
	import { SEED_FEE_SCHEDULE } from '$lib/data/seed-data';
	import { appState } from '$lib/stores/appState.svelte';

	let showVideo = $state(false);

	// Interactive fee estimator state
	let numClasses = $state(2);
	let learnersPerClass = $state(8);
	let sessionsPerClass = $state(8);
	let hoursPerSession = $state(1.5);

	const totalClassHours = $derived(Math.round(numClasses * sessionsPerClass * hoursPerSession));
	const totalLearnerHours = $derived(
		Math.round(numClasses * learnersPerClass * sessionsPerClass * hoursPerSession)
	);

	function computeBandCost(
		units: number,
		bands: { from_units: number; unit_price: string }[]
	): number {
		let total = 0;
		for (let i = 0; i < bands.length; i++) {
			const from = bands[i].from_units;
			const to = i + 1 < bands.length ? bands[i + 1].from_units : Infinity;
			if (units > from) {
				const billable = Math.min(units, to) - from;
				total += billable * Number(bands[i].unit_price);
			}
		}
		return total;
	}

	const estimatedFee = $derived(
		computeBandCost(totalLearnerHours, SEED_FEE_SCHEDULE.current.learner_hours) +
			computeBandCost(totalClassHours, SEED_FEE_SCHEDULE.current.class_hours)
	);
</script>

<svelte:head>
	<title>Dạy học trên Học Vui · Mở lớp học trực tuyến của bạn</title>
	<meta
		name="description"
		content="Tạo khóa học, mở lớp theo lịch của bạn và dạy trực tiếp bằng video, bảng trắng và phòng chat ngay trên trình duyệt. Mở cho mọi giáo viên giỏi."
	/>
</svelte:head>

<div>
	<!-- HERO SECTION -->
	<section
		class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 text-white md:py-24"
	>
		<div class="page-container grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
			<div class="space-y-6">
				<p class="text-sm font-semibold tracking-wide text-blue-100 uppercase">
					Dành cho giáo viên
				</p>
				<h1 class="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
					Biến chuyên môn của bạn thành lớp học trực tuyến trên Học Vui
				</h1>
				<p class="max-w-xl text-lg leading-relaxed text-blue-50/90">
					Tạo khóa học một lần, mở nhiều lớp theo lịch của bạn, và dạy trực tiếp bằng video, bảng
					trắng và phòng chat ngay trên trình duyệt.
				</p>
				<div class="flex flex-wrap gap-3 pt-2">
					{#if appState.user}
						<a
							href="/app/teach/courses"
							class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50"
						>
							Vào trang giảng dạy <ArrowRight class="size-4" />
						</a>
					{:else}
						<a
							href="/register?role=teacher"
							class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50"
						>
							Bắt đầu dạy
						</a>
					{/if}
					<a
						href="#fees"
						class="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-transparent px-5 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
					>
						Xem gói phí
					</a>
				</div>
			</div>

			<!-- 3 STEPS SUMMARY CARD -->
			<div class="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur md:p-8">
				<ol class="space-y-5">
					<li class="flex gap-4">
						<span
							class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-sm font-extrabold text-blue-950"
							>1</span
						>
						<div>
							<h2 class="text-base font-bold text-white">Gửi hồ sơ xác minh</h2>
							<p class="text-sm leading-relaxed text-blue-100/85">
								Chia sẻ kinh nghiệm và video một buổi bạn đã dạy; kiểm duyệt viên xác minh năng lực
								giảng dạy của bạn.
							</p>
						</div>
					</li>
					<li class="flex gap-4">
						<span
							class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-sm font-extrabold text-blue-950"
							>2</span
						>
						<div>
							<h2 class="text-base font-bold text-white">Tạo khóa học và mở lớp</h2>
							<p class="text-sm leading-relaxed text-blue-100/85">
								Viết giáo trình, đặt học phí và xếp lịch các buổi học.
							</p>
						</div>
					</li>
					<li class="flex gap-4">
						<span
							class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-sm font-extrabold text-blue-950"
							>3</span
						>
						<div>
							<h2 class="text-base font-bold text-white">Dạy trực tiếp và nhận đánh giá</h2>
							<p class="text-sm leading-relaxed text-blue-100/85">
								Dạy trong phòng học trực tuyến, nhận xét học viên và xây dựng uy tín từ đánh giá
								thật.
							</p>
						</div>
					</li>
				</ol>
			</div>
		</div>
	</section>

	<!-- VIDEO GUIDE SECTION -->
	<section class="border-b py-16 md:py-20">
		<div class="page-container max-w-4xl space-y-6 text-center">
			<div class="space-y-2">
				<p class="text-primary text-xs font-bold tracking-wider uppercase">Video hướng dẫn</p>
				<h2 class="text-3xl font-extrabold tracking-tight">
					Xem cách bắt đầu dạy trên Học Vui
				</h2>
				<p class="text-muted-foreground mx-auto max-w-2xl">
					Từ đăng ký xác minh, tạo khóa học và mở lớp đến vào phòng học trực tuyến — toàn bộ quy
					trình trong vài phút.
				</p>
			</div>

			<div class="overflow-hidden rounded-3xl border bg-zinc-950 shadow-xl aspect-video relative">
				{#if showVideo}
					<iframe
						class="size-full"
						src="https://www.youtube-nocookie.com/embed/KcvsrZVaRp8?autoplay=1"
						title="Video hướng dẫn: Xem cách bắt đầu dạy trên Học Vui"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<button
						type="button"
						onclick={() => (showVideo = true)}
						class="group relative size-full cursor-pointer"
						aria-label="Phát video: Xem cách bắt đầu dạy trên Học Vui"
					>
						<img
							src="https://i.ytimg.com/vi/KcvsrZVaRp8/hqdefault.jpg"
							alt="Xem cách bắt đầu dạy trên Học Vui"
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

	<!-- OPEN TO EVERYONE SECTION -->
	<section class="py-16 md:py-24">
		<div class="page-container grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
			<div class="space-y-5">
				<p class="text-primary text-xs font-bold tracking-wider uppercase">
					Mở cho tất cả mọi người
				</p>
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">
					Bằng cấp và một buổi dạy thật nói lên năng lực của bạn
				</h2>
				<p class="text-muted-foreground leading-relaxed">
					Học Vui chào đón bất kỳ ai có kiến thức và khả năng truyền đạt — giáo viên đứng lớp,
					giảng viên, kỹ sư, nghệ sĩ, người đi làm lâu năm hay người tự học sâu một lĩnh vực.
				</p>
				<p class="text-muted-foreground leading-relaxed">
					Khi đăng ký xác minh, bạn gửi bằng cấp, chứng chỉ và kinh nghiệm liên quan cùng video một
					buổi dạy thật của mình. Kiểm duyệt viên xem xét toàn bộ hồ sơ và để lại nhận xét rõ ràng.
					Khi đã được xác minh, bạn có thể xuất bản khóa học để học viên tìm thấy và đăng ký.
				</p>
				<blockquote
					class="border-primary bg-primary/5 rounded-r-2xl border-l-4 p-4 text-base font-semibold italic"
				>
					“Bằng cấp cho thấy bạn đã học; buổi dạy thật cho thấy bạn dạy giỏi.”
				</blockquote>
			</div>

			<div class="space-y-4">
				<div class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<div class="flex items-center gap-2.5">
						<span class="bg-primary/10 text-primary rounded-lg p-2">
							<GraduationCap class="size-5" />
						</span>
						<h3 class="font-bold">Mọi nền tảng</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Gửi những bằng cấp bạn có cùng một video buổi dạy thật thể hiện năng lực của bạn.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<div class="flex items-center gap-2.5">
						<span class="bg-primary/10 text-primary rounded-lg p-2">
							<MessageSquareText class="size-5" />
						</span>
						<h3 class="font-bold">Góp ý rõ ràng</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Kiểm duyệt viên ghi rõ điểm mạnh và điều cần cải thiện nếu hồ sơ chưa đạt, để bạn bổ
						sung và gửi lại bất cứ lúc nào.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-5 space-y-2 shadow-xs">
					<div class="flex items-center gap-2.5">
						<span class="bg-primary/10 text-primary rounded-lg p-2">
							<Eye class="size-5" />
						</span>
						<h3 class="font-bold">Học viên cùng xem</h3>
					</div>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Video bài dạy mẫu hiển thị trên trang cá nhân để học viên hiểu phong cách của bạn trước
						khi đăng ký.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- 6 BENEFITS SECTION -->
	<section class="bg-muted/40 border-y py-16 md:py-24">
		<div class="page-container space-y-10">
			<div class="max-w-2xl space-y-2">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">
					Mọi thứ bạn cần để dạy trực tuyến
				</h2>
				<p class="text-muted-foreground text-lg">
					Tập trung vào bài giảng — việc vận hành lớp đã có Học Vui.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
					<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
						<Users class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Tiếp cận học viên</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Khóa học đã xuất bản xuất hiện trong danh mục công khai và trang cá nhân của bạn.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
					<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
						<Video class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Lớp học trực tiếp sẵn sàng</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Video HD, chia sẻ màn hình, bảng trắng nhiều trang và phòng chat riêng cho từng lớp.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
					<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
						<CalendarDays class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Lịch học tự động</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Tạo các buổi học theo lịch lặp hằng tuần, dời hoặc hủy buổi khi cần — học viên được
						thông báo ngay.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
					<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
						<BadgeCheck class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Quản lý học viên</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Điểm danh tự động khi học viên vào phòng và gửi nhận xét cho từng buổi hoặc cuối khóa.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
					<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
						<Star class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Xây dựng uy tín</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Chỉ học viên thực sự tham gia lớp mới được đánh giá, và bạn có thể phản hồi công khai.
					</p>
				</div>

				<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
					<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex rounded-xl p-3">
						<PiggyBank class="size-6" />
					</span>
					<h3 class="text-lg font-bold">Phí minh bạch</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Bạn tự đặt học phí; phí nền tảng tính theo giờ học viên và giờ lớp thực tế, có hạn mức
						miễn phí mỗi tháng.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- OFFICIAL FEE SCHEDULE SECTION -->
	<section id="fees" class="py-16 md:py-24 scroll-mt-16">
		<div class="page-container space-y-10">
			<div class="max-w-3xl space-y-3">
				<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">Phí nền tảng</h2>
				<p class="text-muted-foreground leading-relaxed">
					Học viên không trả phí nền tảng. Giáo viên chỉ trả phí khi vượt qua mức miễn phí hằng
					tháng, và mỗi lớp giữ nguyên bảng phí có hiệu lực lúc lớp được mở.
				</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
				<!-- OFFICIAL FEE TABLES -->
				<div class="bg-card rounded-3xl border p-6 md:p-8 space-y-6 shadow-xs">
					<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-4">
						<div>
							<span
								class="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400"
							>
								Gói phí chính thức đang áp dụng
							</span>
							<h3 class="mt-1 text-xl font-bold">{SEED_FEE_SCHEDULE.current.name}</h3>
						</div>
						<span class="text-muted-foreground text-xs font-medium">
							Tính theo: Lịch dạy
						</span>
					</div>

					<!-- Learner Hours Table -->
					<div class="space-y-2">
						<h4 class="font-bold text-sm">1. Giờ học viên (Learner Hours)</h4>
						<p class="text-muted-foreground text-xs">
							Một học viên học một giờ trong buổi bạn dạy — 20 giờ học viên đầu tiên mỗi tháng hoàn
							toàn miễn phí.
						</p>
						<div class="overflow-hidden rounded-xl border text-sm">
							<table class="w-full text-left">
								<thead class="bg-muted/60 text-xs font-semibold">
									<tr>
										<th class="px-4 py-2.5">Mức sử dụng (giờ học viên / tháng)</th>
										<th class="px-4 py-2.5 text-right">Đơn giá</th>
									</tr>
								</thead>
								<tbody class="divide-y">
									<tr>
										<td class="px-4 py-2">0 – 20 giờ</td>
										<td class="px-4 py-2 text-right font-bold text-green-600">Miễn phí</td>
									</tr>
									<tr>
										<td class="px-4 py-2">20 – 250 giờ</td>
										<td class="px-4 py-2 text-right font-semibold">1.200 ₫ mỗi giờ</td>
									</tr>
									<tr>
										<td class="px-4 py-2">250 – 500 giờ</td>
										<td class="px-4 py-2 text-right font-semibold">1.000 ₫ mỗi giờ</td>
									</tr>
									<tr>
										<td class="px-4 py-2">Từ 500 giờ trở lên</td>
										<td class="px-4 py-2 text-right font-semibold">800 ₫ mỗi giờ</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- Class Hours Table -->
					<div class="space-y-2">
						<h4 class="font-bold text-sm">2. Giờ lớp (Class Hours)</h4>
						<p class="text-muted-foreground text-xs">
							Một giờ của một buổi học bất kể có bao nhiêu học viên — 10 giờ lớp đầu tiên mỗi tháng
							miễn phí.
						</p>
						<div class="overflow-hidden rounded-xl border text-sm">
							<table class="w-full text-left">
								<thead class="bg-muted/60 text-xs font-semibold">
									<tr>
										<th class="px-4 py-2.5">Mức sử dụng (giờ lớp / tháng)</th>
										<th class="px-4 py-2.5 text-right">Đơn giá</th>
									</tr>
								</thead>
								<tbody class="divide-y">
									<tr>
										<td class="px-4 py-2">0 – 10 giờ</td>
										<td class="px-4 py-2 text-right font-bold text-green-600">Miễn phí</td>
									</tr>
									<tr>
										<td class="px-4 py-2">10 – 150 giờ</td>
										<td class="px-4 py-2 text-right font-semibold">1.000 ₫ mỗi giờ</td>
									</tr>
									<tr>
										<td class="px-4 py-2">150 – 250 giờ</td>
										<td class="px-4 py-2 text-right font-semibold">900 ₫ mỗi giờ</td>
									</tr>
									<tr>
										<td class="px-4 py-2">250 – 500 giờ</td>
										<td class="px-4 py-2 text-right font-semibold">800 ₫ mỗi giờ</td>
									</tr>
									<tr>
										<td class="px-4 py-2">Từ 500 giờ trở lên</td>
										<td class="px-4 py-2 text-right font-semibold">700 ₫ mỗi giờ</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- Commission -->
					<div class="rounded-2xl bg-muted/50 p-4 space-y-1 text-xs">
						<p class="font-bold text-foreground">Hoa hồng trên học viên nền tảng mang đến</p>
						<p class="text-muted-foreground leading-relaxed">
							10% học phí mỗi buổi học viên trả, khi học viên tìm thấy bạn trên nền tảng, cho các
							buổi trong 45 ngày kể từ buổi đầu tiên (chỉ trừ sau khi học viên đã học 4 buổi). Học
							viên đến qua đường dẫn hoặc lời mời của chính bạn thì không tính hoa hồng.
						</p>
					</div>
				</div>

				<!-- FEE ESTIMATOR -->
				<div class="bg-card rounded-3xl border p-6 md:p-8 space-y-6 shadow-xs flex flex-col justify-between">
					<div class="space-y-5">
						<div class="flex items-center gap-3">
							<span class="bg-primary/10 text-primary rounded-xl p-2.5">
								<Calculator class="size-6" />
							</span>
							<div>
								<h3 class="text-lg font-bold">Ước tính phí tháng của bạn</h3>
								<p class="text-muted-foreground text-xs">
									Nhập quy mô lớp để xem ước tính phí nền tảng hằng tháng.
								</p>
							</div>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="space-y-1.5">
								<label for="est-classes" class="text-xs font-semibold">Số lớp giống nhau</label>
								<input
									id="est-classes"
									type="number"
									min="1"
									max="50"
									bind:value={numClasses}
									class="bg-background w-full rounded-xl border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>

							<div class="space-y-1.5">
								<label for="est-learners" class="text-xs font-semibold">Học viên mỗi lớp</label>
								<input
									id="est-learners"
									type="number"
									min="1"
									max="200"
									bind:value={learnersPerClass}
									class="bg-background w-full rounded-xl border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>

							<div class="space-y-1.5">
								<label for="est-sessions" class="text-xs font-semibold">Số buổi mỗi lớp / tháng</label>
								<input
									id="est-sessions"
									type="number"
									min="1"
									max="60"
									bind:value={sessionsPerClass}
									class="bg-background w-full rounded-xl border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>

							<div class="space-y-1.5">
								<label for="est-hours" class="text-xs font-semibold">Số giờ mỗi buổi</label>
								<input
									id="est-hours"
									type="number"
									min="0.5"
									max="8"
									step="0.5"
									bind:value={hoursPerSession}
									class="bg-background w-full rounded-xl border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
						</div>
					</div>

					<div class="rounded-2xl bg-primary/5 border border-primary/20 p-5 space-y-3">
						<div class="flex items-center justify-between text-xs text-muted-foreground">
							<span>Tổng mức sử dụng cả tháng:</span>
							<span class="font-bold text-foreground">
								{totalLearnerHours} giờ học viên · {totalClassHours} giờ lớp
							</span>
						</div>
						<div class="flex items-baseline justify-between border-t pt-3">
							<span class="text-sm font-bold">Phí nền tảng ước tính:</span>
							<span class="text-2xl font-extrabold text-primary">
								{estimatedFee === 0
									? 'Miễn phí (0 ₫)'
									: `${estimatedFee.toLocaleString('vi-VN')} ₫`}
							</span>
						</div>
						{#if estimatedFee === 0}
							<p class="text-xs text-green-600 dark:text-green-400 font-medium">
								Nằm trong mức miễn phí — không mất phí.
							</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA SECTION -->
	<section class="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
		<div class="page-container flex flex-col items-center gap-6 text-center">
			<h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">
				Sẵn sàng mở lớp đầu tiên của bạn?
			</h2>
			<p class="max-w-xl text-blue-100">
				Tạo tài khoản miễn phí, gửi hồ sơ xác minh và chuẩn bị khóa học đầu tiên ngay hôm nay.
			</p>
			<div class="flex flex-wrap justify-center gap-3">
				<a
					href="/register?role=teacher"
					class="rounded-xl bg-white px-6 py-3 text-base font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50"
				>
					Tạo tài khoản và bắt đầu
				</a>
				<a
					href="/courses"
					class="rounded-xl border border-white/50 bg-transparent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
				>
					Xem các khóa học hiện có
				</a>
			</div>
		</div>
	</section>
</div>
