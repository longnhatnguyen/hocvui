<script lang="ts">
	import BrandLogo from './BrandLogo.svelte';
</script>

<footer class="text-muted-foreground border-t bg-card/50">
	<div class="page-container grid grid-cols-2 gap-8 py-12 md:grid-cols-6">
		<div class="col-span-2 space-y-3">
			<BrandLogo />
			<p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
				Lớp học trực tuyến trực tiếp ở mọi môn học — kết nối học viên với giáo viên giỏi.
			</p>
		</div>

		<nav aria-label="Khám phá">
			<h2 class="text-foreground mb-3 text-sm font-semibold">Khám phá</h2>
			<ul class="space-y-2 text-sm">
				<li><a class="hover:text-foreground transition-colors" href="/courses">Khóa học</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/teachers">Giáo viên</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/rooms">Phòng họp</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/courses?sort=starting_soon">Sắp khai giảng</a></li>
			</ul>
		</nav>

		<nav aria-label="Giảng dạy">
			<h2 class="text-foreground mb-3 text-sm font-semibold">Giảng dạy</h2>
			<ul class="space-y-2 text-sm">
				<li><a class="hover:text-foreground transition-colors" href="/teach">Dạy học</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/register?role=teacher">Tạo tài khoản giáo viên</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/login">Đăng nhập</a></li>
			</ul>
		</nav>

		<nav aria-label="Về chúng tôi">
			<h2 class="text-foreground mb-3 text-sm font-semibold">Về chúng tôi</h2>
			<ul class="space-y-2 text-sm">
				<li><a class="hover:text-foreground transition-colors" href="/about">Giới thiệu</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/contact">Hỗ trợ</a></li>
			</ul>
		</nav>

		<nav aria-label="Pháp lý">
			<h2 class="text-foreground mb-3 text-sm font-semibold">Pháp lý</h2>
			<ul class="space-y-2 text-sm">
				<li><a class="hover:text-foreground transition-colors" href="/terms">Điều khoản sử dụng</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/privacy">Chính sách quyền riêng tư</a></li>
				<li><a class="hover:text-foreground transition-colors" href="/terms#refunds">Hoàn tiền</a></li>
			</ul>
		</nav>
	</div>

	<div class="border-t py-6">
		<div class="page-container text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
			<p>© 2026 Học Vui. Bảo lưu mọi quyền.</p>
			<p>Hệ thống Học Trực Tuyến Tương Tác Trực Tiếp</p>
		</div>
	</div>
</footer>
