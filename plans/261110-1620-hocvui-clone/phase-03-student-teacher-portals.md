# Phase 03: Student (`/app/learn`) & Teacher (`/app/teach`) Portals

## Bối cảnh
Xây dựng khu vực ứng dụng sau đăng nhập (`/app/*`) cho cả Học viên và Giáo viên với đầy đủ nghiệp vụ quản lý khóa học, mở lớp, điểm danh, bài tập, nhận xét và thanh toán.

## Yêu cầu
1. App Shell (`/app`): Sidebar điều hướng theo vai trò, thông báo (`/app/notifications`), hộp thư (`/app/inbox`), lịch học chung (`/app/calendar`), tài khoản (`/app/account`).
2. Phân hệ Học viên (`/app/learn`):
   - `/app/dashboard` & `/app/learn`: Danh sách lớp đang theo học, buổi học sắp tới, lời mời vào lớp.
   - `/app/learn/classes/[id]`: Chi tiết lớp học, lịch từng buổi, tài liệu (`materials`), bài tập về nhà (`homeworks`) & nộp bài, nút vào phòng học trực tiếp (`/app/live/[sessionId]`), gửi đánh giá khóa học.
   - `/app/learn/feedback` & `/app/learn/payments`: Xem nhận xét từ giáo viên và quản lý học phí từng buổi (`lesson-charges`).
3. Phân hệ Giáo viên (`/app/teach`):
   - `/app/teach/profile` & `/app/teach/verification`: Cập nhật hồ sơ giảng dạy và tải video xác minh năng lực.
   - `/app/teach/courses`, `/new`, `/[id]`: Tạo/sửa khóa học, đề cương (syllabus), tài liệu, slide bài giảng (decks).
   - `/app/teach/classes`, `/new`, `/[id]`: Mở lớp mới, lên lịch buổi học (`sessions`), quản lý danh sách học viên (`roster`), điểm danh (`attendance`), giao & chấm bài tập, viết nhận xét học viên.
   - `/app/teach/quizzes`, `/app/teach/earnings`, `/app/teach/reviews`: Quản lý bài kiểm tra, số dư/doanh thu và phản hồi đánh giá.

## Tiêu chí hoàn thành
- Giáo viên tạo được khóa học -> mở lớp -> lên lịch buổi học.
- Học viên đăng ký lớp -> thấy lịch học trên `/app/calendar` -> nộp bài tập -> xem học phí & đánh giá.
