# Phase 04: Live Classroom (`/app/live/[sessionId]`) & Meeting Rooms (`/r/[roomId]`)

## Bối cảnh
Trái tim của `hocvui.org` là phòng học trực tuyến ngay trên trình duyệt không cần cài đặt ứng dụng ngoài: Video HD + Chia sẻ màn hình + Bảng trắng theo từng buổi + Phòng chat lớp học + Điểm danh tự động.

## Yêu cầu
1. Phòng học trực tiếp (`/app/live/[sessionId]`):
   - Kết nối Camera/Mic và Chia sẻ màn hình (WebRTC / MediaStream API).
   - **Bảng trắng tương tác (Interactive Whiteboard)**: Vẽ tự do, hình học, văn bản, tẩy, nhiều trang/slide, khóa bảng trắng (`PUT /api/v4/lms/live/sessions/{id}/whiteboard/lock` cho giáo viên), lưu trạng thái vào DB để ôn tập sau buổi học (`GET/DELETE /api/v4/lms/live/sessions/{id}/whiteboard`) và đồng bộ realtime qua WebSocket/SSE.
   - **Khung chat theo lớp**: Nhắn tin realtime, gửi tệp đính kèm, thả cảm xúc (reactions).
   - **Điểm danh tự động**: Khi học viên tham gia (`POST /api/v4/lms/live/sessions/{id}/join`), tự động ghi nhận trạng thái có mặt (`attendance`).
2. Phòng họp độc lập (`/app/rooms`, `/app/rooms/new`, `/app/rooms/[roomId]`, `/r/[roomId]`):
   - Tạo phòng họp nhanh (miễn phí tối đa 2 người / 60 phút, hoặc tính phí theo số người × số giờ theo cấu hình `rooms/offer`).
   - Tham gia phòng họp qua link `/r/[roomId]` (hỗ trợ cả khách nhập tên hoặc thành viên đã đăng nhập).

## Tiêu chí hoàn thành
- Mở 2 tab trình duyệt vào cùng `/app/live/[sessionId]` hoặc `/r/[roomId]`: thấy nét vẽ bảng trắng và tin nhắn chat đồng bộ tức thì, lưu lại được sau khi tải lại trang.
