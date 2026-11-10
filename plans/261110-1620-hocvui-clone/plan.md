# Kế hoạch triển khai: Học Vui Clone (`hocvui.org`)

- **Ngày tạo**: 2026-11-10 16:20
- **Phân loại Triage**: **Lớn** (~35+ files, >2.500 dòng, kiến trúc Full-stack mới từ đầu)
- **Trạng thái**: ⏳ Đang chờ duyệt (Pending Approval)

## 1. SLP Brief
1. **User Objective**: Xây dựng ứng dụng Full-stack MVP giống hệt `https://www.hocvui.org/` (giao diện, cấu trúc route, luồng dữ liệu học viên/giáo viên/admin, phòng học trực tiếp Video + Bảng trắng + Chat).
2. **Hard Constraints**:
   - Frontend: **SvelteKit 5 + Tailwind CSS v4 + TypeScript + Lucide Icons** (giữ nguyên stack gốc của `hocvui.org`, hỗ trợ Dark/Light mode key `lms-theme` và song ngữ `VI`/`EN`).
   - API Contract: Tương thích chuẩn `/api/v4/lms/...` và `/api/v4/users/...` đã bóc tách từ bundle gốc của `hocvui.org`.
   - Database: **PostgreSQL** (chạy qua Docker local hoặc kết nối chuỗi có sẵn).
3. **Current Design Choices (May Be Challenged)**:
   - Backend API: Có thể chọn **(A) .NET 10 Minimal API / Web API + EF Core + SignalR/WebSocket** hoặc **(B) SvelteKit Server Routes (`/api/v4/...`) + Drizzle ORM + PostgreSQL + WebSocket** (cần chốt trước khi chạy lệnh khởi tạo).
   - Live Classroom & Rooms: Dùng WebRTC (mesh/local media) + HTML5 Canvas đồng bộ qua WebSocket/SSE cho Bảng trắng + Chat thời gian thực.

## 2. Các giai đoạn (Phases)

| Phase | Tên giai đoạn | Chi tiết | Chủ sở hữu (Lead) | Trạng thái |
|---|---|---|---|---|
| 01 | Foundation, DB Schema & Auth (`/api/v4`) | [phase-01-foundation-db-auth.md](./phase-01-foundation-db-auth.md) | ALISSON + MODRIC | ⏳ Pending |
| 02 | Public Web, Catalog, Teachers & Rooms Offer | [phase-02-public-web-catalog.md](./phase-02-public-web-catalog.md) | NEYMAR | ⏳ Pending |
| 03 | Student (`/app/learn`) & Teacher (`/app/teach`) Portals | [phase-03-student-teacher-portals.md](./phase-03-student-teacher-portals.md) | MODRIC + NEYMAR | ⏳ Pending |
| 04 | Live Classroom (`/app/live/[id]`) & Rooms (`/r/[id]`) | [phase-04-live-classroom-rooms.md](./phase-04-live-classroom-rooms.md) | MODRIC + NEYMAR | ⏳ Pending |
| 05 | Marketplace Admin (`/app/market`) & Verification Gate | [phase-05-admin-market-qa.md](./phase-05-admin-market-qa.md) | KANTÉ + VAN_DIJK | ⏳ Pending |

- **Task Queue**: [queue.md](./queue.md)

## 3. SLP Relationship Map

| Scope | Owner (Lead) | Dependencies | Decision Owner | Verification Evidence |
|---|---|---|---|---|
| Docker PostgreSQL & Cấu hình môi trường | ALISSON (`CULI_DEVOPS`) | None | Thor | `docker compose ps` healthy, DB migration pass |
| Schema DB, Auth & `/api/v4/lms/*` API | MODRIC (`CULI_BE`) | PostgreSQL | Thor | API integration tests + seed data khớp JSON gốc |
| SvelteKit 5 Shell, Public Pages, Portals | NEYMAR (`CULI_FE`) | API Contract | Thor | `npm run check` + `npm run build` 0 warning/error |
| Live Video, Whiteboard Canvas & Chat | MODRIC + NEYMAR | Auth + WS | Thor | E2E test 2 tab đồng bộ nét vẽ & chat realtime |
| E2E QA & Independent Review | KANTÉ + VAN_DIJK | All Phases | Thor | Test report + Reviewer sign-off (0 Critical) |

## 4. Tự-phản biện bắt buộc (Pre-Execution Self-Critique)
> **Nếu plan này sai, khả năng cao nhất là ở đâu?**
> `hocvui.org` thực chất là một hệ sinh thái rất lớn (~65 routes và >90 endpoints `/api/v4/lms/*` xây dựng trên nền tảng tương tự Mattermost + LMS custom + LiveKit/Calls). Nếu cố gắng code toàn bộ 65 routes trong 1 đợt duy nhất mà không khóa chặt core loop trước (Public Catalog → Đăng ký lớp → Mở lớp → Vào phòng học Live + Bảng trắng), dự án dễ bị dàn trải hoặc lệch giữa lựa chọn Backend (.NET 10 riêng vs SvelteKit Full-stack). Vì vậy, việc tách 5 phase có kiểm thử độc lập từng chặng và chốt dứt điểm kiến trúc Backend trước khi chạy lệnh khởi tạo là điểm quyết định thành bại.
