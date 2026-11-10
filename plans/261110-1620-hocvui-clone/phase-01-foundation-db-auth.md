# Phase 01: Foundation, DB Schema & Auth (`/api/v4`)

## Bối cảnh
Thiết lập bộ khung dự án tại `d:\hoc vui`, cơ sở dữ liệu PostgreSQL, mô hình dữ liệu chuẩn khớp 100% với JSON thực tế của `hocvui.org`, cùng hệ thống xác thực người dùng (Học viên, Giáo viên, Kiểm duyệt viên, Admin).

## Yêu cầu
1. Khởi tạo dự án SvelteKit 5 + Tailwind CSS v4 + TypeScript + Lucide Icons.
2. Khởi tạo PostgreSQL (qua `docker-compose.yml`) và lớp Backend/ORM.
3. Thiết kế Schema & Seed dữ liệu thật (56 môn học từ `hocvui.org`, khóa học mẫu, giáo viên xác minh, bảng biểu phí `fee-schedule`, cấu hình phòng họp `rooms/offer`).
4. Triển khai Auth endpoints:
   - `POST /api/v4/lms/public/signup`
   - `POST /api/v4/users/login`, `POST /api/v4/users/logout`
   - `POST /api/v4/lms/public/forgot-password`, `POST /api/v4/lms/public/reset-password`
   - Session/Bearer token middleware.

## Các bước
1. Tạo `docker-compose.yml` cho PostgreSQL 17.
2. Khởi tạo workspace frontend/backend theo lựa chọn của người dùng.
3. Viết migration tạo bảng: `users`, `subjects`, `teacher_profiles`, `courses`, `course_syllabus`, `classes`, `class_sessions`, `enrollments`, `reviews`, `rooms`, `whiteboard_states`, `messages`, `fee_policies`, `lesson_charges`.
4. Viết script seed toàn bộ 56 môn học phân cấp (Toán, Tiếng Việt, Tiếng Anh, Tiếng Hàn, Tiếng Trung, Tiếng Nhật...) và các khóa học/giáo viên mẫu như trên `hocvui.org`.

## Tiêu chí hoàn thành
- Database chạy và seed thành công.
- Đăng ký, đăng nhập, đăng xuất và lấy thông tin phiên làm việc hoạt động đúng.
- `npm run check` pass 0 lỗi.
