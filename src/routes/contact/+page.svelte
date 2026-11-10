<script lang="ts">
	import { Mail, MessageCircle, ArrowRight } from 'lucide-svelte';
	import { appState } from '$lib/stores/appState.svelte';

	const faqs = [
		{
			q: 'Tôi quên mật khẩu thì làm sao?',
			a: 'Nhập email đăng ký, chúng tôi gửi liên kết để bạn đặt lại mật khẩu. Liên kết chỉ dùng được trong thời gian ngắn.',
			linkText: 'Đặt lại mật khẩu',
			href: '/forgot-password'
		},
		{
			q: 'Tôi thanh toán học phí như thế nào?',
			a: 'Bạn trả học phí từng buổi cho giáo viên sau khi buổi học diễn ra, bằng chuyển khoản VietQR hoặc qua liên kết payOS của giáo viên. Tham gia lớp không mất phí.',
			linkText: 'Đọc quy định thanh toán',
			href: '/terms'
		},
		{
			q: 'Nếu tôi rời lớp thì phải trả những gì?',
			a: 'Các buổi đã diễn ra vẫn phải thanh toán cho giáo viên, dù bạn có tham dự hay không. Các buổi chưa diễn ra không bị tính phí.',
			linkText: 'Đọc quy định thanh toán',
			href: '/terms'
		},
		{
			q: 'Giáo viên hủy hoặc dời buổi học thì sao?',
			a: 'Buổi bị hủy không bao giờ bị tính phí: học phí chỉ trả sau khi buổi học diễn ra. Buổi được dời lịch thì học, và trả, vào thời điểm mới.',
			linkText: 'Đọc quy định thanh toán',
			href: '/terms'
		},
		{
			q: 'Làm sao tìm được khóa học phù hợp?',
			a: 'Tìm theo tên khóa học hoặc tên giáo viên, rồi lọc theo môn học, lịch học và học phí. Mỗi khóa học hiển thị đánh giá của học viên và các lớp đang mở đăng ký.',
			linkText: 'Xem các khóa học',
			href: '/courses'
		},
		{
			q: 'Tôi muốn dạy trên nền tảng thì cần gì?',
			a: 'Bất kỳ ai có năng lực giảng dạy đều có thể đăng ký. Bạn gửi bằng cấp, kinh nghiệm và video một buổi dạy thật để kiểm duyệt viên xác minh; sau khi được xác minh, bạn đăng khóa học công khai.',
			linkText: 'Tìm hiểu về dạy học',
			href: '/teach'
		},
		{
			q: 'Giáo viên trả phí nền tảng bao nhiêu?',
			a: 'Phí tính hằng tháng theo mức sử dụng, có phần miễn phí mỗi tháng. Gói phí chính thức đang áp dụng, cùng ngày có hiệu lực, được công bố trên trang Dạy học. Học viên không trả phí nền tảng.',
			linkText: 'Xem gói phí hiện hành',
			href: '/teach#fees'
		},
		{
			q: 'Ai xem được bản ghi hình buổi học?',
			a: 'Chỉ giáo viên và học viên của lớp. Giáo viên là người bật ghi hình, mọi người trong phòng đều thấy thông báo khi đang ghi, và bản ghi tự động bị xóa sau 7 ngày.',
			linkText: 'Đọc về bản ghi hình',
			href: '/terms'
		},
		{
			q: 'Dữ liệu cá nhân của tôi được dùng như thế nào?',
			a: 'Chúng tôi chỉ thu thập dữ liệu cần để vận hành lớp học, không bán dữ liệu và không dùng cho quảng cáo của bên thứ ba. Bạn có thể xem chi tiết và các quyền của mình trong chính sách quyền riêng tư.',
			linkText: 'Đọc chính sách quyền riêng tư',
			href: '/privacy'
		}
	];
</script>

<svelte:head>
	<title>Hỗ trợ · Học Vui</title>
</svelte:head>

<div class="page-container max-w-4xl space-y-12 py-12">
	<!-- HEADER -->
	<div class="space-y-3">
		<h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">Hỗ trợ</h1>
		<p class="text-muted-foreground max-w-2xl text-base leading-relaxed">
			Câu trả lời cho những câu hỏi thường gặp về việc học và dạy trên Học Vui, cùng cách liên hệ
			với đội ngũ của chúng tôi.
		</p>
	</div>

	<!-- CONTACT CARDS -->
	<div class="grid gap-6 sm:grid-cols-2">
		<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
			<span class="bg-primary/10 text-primary inline-flex rounded-xl p-2.5">
				<Mail class="size-5" />
			</span>
			<h2 class="text-lg font-bold">Gửi email cho đội hỗ trợ</h2>
			<p class="text-muted-foreground text-sm">
				Chúng tôi trả lời trong vòng một ngày làm việc.
			</p>
			<a
				href="mailto:support@hocvui.org"
				class="text-primary inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
			>
				support@hocvui.org <ArrowRight class="size-4" />
			</a>
		</div>

		<div class="bg-card rounded-2xl border p-6 space-y-3 shadow-xs">
			<span class="bg-green-500/10 text-green-600 dark:text-green-400 inline-flex rounded-xl p-2.5">
				<MessageCircle class="size-5" />
			</span>
			<h2 class="text-lg font-bold">Trò chuyện với đội ngũ Học Vui</h2>
			<p class="text-muted-foreground text-sm">
				Đăng nhập để nhắn cho chúng tôi. Đội ngũ trả lời ngay trong hộp thư của bạn.
			</p>
			<a
				href={appState.user ? '/app/learn' : '/login'}
				class="text-primary inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
			>
				Nhắn cho bộ phận hỗ trợ <ArrowRight class="size-4" />
			</a>
		</div>
	</div>

	<!-- FAQ SECTION -->
	<section class="space-y-6">
		<h2 class="text-2xl font-extrabold tracking-tight">Câu hỏi thường gặp</h2>
		<div class="grid gap-4">
			{#each faqs as item}
				<div class="bg-card rounded-2xl border p-6 space-y-2.5 shadow-xs">
					<h3 class="text-base font-bold">{item.q}</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
					<a
						href={item.href}
						class="text-primary inline-flex items-center gap-1 pt-1 text-xs font-semibold hover:underline"
					>
						{item.linkText} <ArrowRight class="size-3.5" />
					</a>
				</div>
			{/each}
		</div>
	</section>
</div>
