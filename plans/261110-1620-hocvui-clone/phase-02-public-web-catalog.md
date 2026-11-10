# Phase 02: Public Web, Catalog, Teachers & Rooms Offer

## Bối cảnh
Tái tạo toàn bộ khu vực công khai (`/(public)`) của `hocvui.org` với đúng hệ màu (`oklch`, gradient `from-blue-600 to-indigo-700`, điểm nhấn `amber-300`), font Inter (Latin + Vietnamese), nút chuyển Dark/Light (`lms-theme`) và chuyển ngôn ngữ `VI` / `EN`.

## Yêu cầu
1. Layout Public (`Header` sticky blur, logo SVG Học Vui, menu: Khóa học, Giáo viên, Dạy học, Phòng họp, Giới thiệu, chuyển ngôn ngữ `VI`/`EN`, nút Dark/Light mode, `Footer` 6 cột).
2. Trang chủ (`/`): Hero section kèm ô tìm kiếm `/courses?q=`, mockup phòng học LIVE tương tác, 4 lý do chọn Học Vui, 6 công cụ lớp học trực tiếp, quy trình 3 bước cho Học viên & Giáo viên, CTA cuối trang.
3. Trang Khóa học (`/courses` & `/courses/[slug]`):
   - Bộ lọc theo từ khóa, Môn học (56 môn), Trình độ (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT`), Giá (`FREE`, `PER_LESSON`, `PER_COURSE`), Sắp xếp (`starting_soon`...).
   - Form "Gửi yêu cầu tìm khóa học" (`POST /api/v4/lms/me/course-requests`).
   - Trang chi tiết khóa học: đề cương (syllabus), lịch các lớp đang mở, hồ sơ giáo viên, đánh giá từ học viên đã học, nút Đăng ký lớp.
4. Trang Giáo viên (`/teachers` & `/teachers/[username]`): Danh sách giáo viên đã xác minh, lọc theo môn, trang hồ sơ chi tiết kèm video dạy thử & khóa học đang mở.
5. Trang Dạy học (`/teach`), Phòng họp (`/rooms` kèm bộ tính phí tự động theo số người & thời lượng), Giới thiệu (`/about`), Hỗ trợ (`/contact`), Điều khoản (`/terms`), Bảo mật (`/privacy`), Môn học (`/subjects/[slug]`).

## Tiêu chí hoàn thành
- Tất cả các route `/(public)/*` render mượt mà, hỗ trợ SSR + CSR, Dark/Light mode và `VI`/`EN`.
- Dữ liệu lấy trực tiếp từ `/api/v4/lms/public/*` từ PostgreSQL.
