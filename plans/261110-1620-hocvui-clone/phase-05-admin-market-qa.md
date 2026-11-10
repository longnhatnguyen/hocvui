# Phase 05: Marketplace Admin (`/app/market`), Moderation & Verification Gate

## Bối cảnh
Hoàn thiện phân hệ Quản trị & Kiểm duyệt viên (`/app/moderation`, `/app/market/*`, `/app/system/*`) và thực hiện kiểm thử tổng thể + review độc lập theo quy chuẩn OSIN/Thor.

## Yêu cầu
1. Kiểm duyệt viên (`/app/moderation`):
   - Duyệt hồ sơ & video xác minh giáo viên (`GET/POST /api/v4/lms/marketplace/moderation/teachers`).
   - Kiểm duyệt đánh giá khóa học (`reviews`).
2. Quản trị Marketplace (`/app/market/*`):
   - Quản lý danh mục môn học (`/app/market/subjects`), khóa học (`/app/market/courses`), lớp học (`/app/market/classes`), yêu cầu tìm khóa học (`/app/market/requests`), biểu phí (`/app/market/fees`), số dư giáo viên (`/app/market/balances`), sao kê (`/app/market/statements`) và người dùng (`/app/market/users`).
3. Quality Gate & Independent Review:
   - Chạy `npm run check`, `npm run build`, và bộ test tự động (`KANTÉ / CULI_QA`).
   - Gọi `VAN_DIJK / CULI_REVIEWER` (subagent độc lập) rà soát bảo mật, phân quyền, lỗi biên, hiệu năng.

## Tiêu chí hoàn thành
- Toàn bộ build/typecheck/test đạt **Zero-Warning / Zero-Error**.
- Báo cáo review từ `CULI_REVIEWER` không còn lỗi Critical.
