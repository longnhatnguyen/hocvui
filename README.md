# 🎓 Học Vui — Nền tảng Lớp học Trực tuyến Tương tác Trực tiếp

Ứng dụng web full-stack mô phỏng 1:1 nền tảng **[Học Vui (hocvui.org)](https://www.hocvui.org/)** — kết nối học viên với các giáo viên đã được xác minh qua những lớp học trực tuyến quy mô nhỏ, tích hợp gọi video HD, bảng trắng tương tác STEM nhiều trang, câu đố trực tiếp và phòng chat riêng cho từng lớp ngay trên trình duyệt.

---

## ✨ Tính năng nổi bật

### 1. Cổng thông tin Công khai (Public Portal)
- **Trang chủ (`/`)**:
  - Hero trực quan mô phỏng lớp học trực tiếp (`LIVE`) với bảng trắng SVG, khung video học viên và thanh chat thời gian thực.
  - Khám phá theo môn học (*Toán*, *Tiếng Việt*, *Tiếng Anh*, *Tiếng Hàn*, *Tiếng Trung*, *Tiếng Nhật*) cùng 56 môn học chi tiết theo từng cấp lớp và chứng chỉ.
  - Danh sách khóa học **Được học viên hài lòng nhất** và **Sắp khai giảng**.
- **Danh mục Khóa học (`/courses`, `/courses/[slug]`, `/subjects/[slug]`)**:
  - Tìm kiếm theo từ khóa, lọc theo môn học, trình độ (*Cơ bản*, *Trung bình*, *Nâng cao*, *Chuyên gia*), mức học phí (*Miễn phí*, *Có phí*), lọc lớp đang mở và sắp xếp đa tiêu chí.
  - Trang chi tiết khóa học với giáo trình từng buổi, thông tin giáo viên, lịch lớp đang mở, đăng ký giữ chỗ 1-click và biểu mẫu gửi yêu cầu mở khóa học mới.
- **Đội ngũ Giáo viên (`/teachers`, `/teachers/[username]`)**:
  - Hồ sơ giáo viên công khai kèm huy hiệu **Đã xác minh**, điểm đánh giá, số lượng học viên, chuyên môn và các khóa học đang giảng dạy.
- **Trang Dành cho Giáo viên (`/teach`)**:
  - Quy trình xác minh năng lực qua bằng cấp và video buổi dạy thật, 6 lợi ích vận hành lớp học.
  - **Bảng biểu phí học tập chính thức** (*Giờ học viên*, *Giờ lớp*, *Hoa hồng nền tảng*) kèm **Công cụ ước tính phí tháng tương tác** tự động tính toán chi phí theo số lớp, sĩ số và thời lượng.
- **Phòng họp Trực tuyến (`/rooms`, `/r/[roomId]`)**:
  - Đặt phòng họp nhóm hoặc học nhóm tức thì; miễn phí cho phòng tối đa 2 người trong 60 phút, tự động tính giá cho phòng đông người hoặc thời lượng dài hơn (`800 ₫ / người / giờ`).
- **Giới thiệu, Hỗ trợ & Pháp lý (`/about`, `/contact`, `/terms`, `/privacy`)**:
  - Câu chuyện thương hiệu, video giới thiệu, 4 cam kết cốt lõi, 9 câu hỏi thường gặp (FAQ) và điều khoản minh bạch.

### 2. Phòng học Trực tiếp & Bảng trắng STEM (`/app/live/[sessionId]`)
- **Truyền thông WebRTC trực tiếp**: Bật/tắt Camera, Micro, Chia sẻ màn hình (`getDisplayMedia`), Ghi hình buổi học (`REC`) và chế độ xem lưới Camera Grid.
- **Bảng trắng tương tác nhiều trang (Multi-page STEM Whiteboard)**:
  - Công cụ vẽ tự do: Bút viết (`Pencil`), Bút dạ quang (`Highlighter`), Đường thẳng (`Line`), Mũi tên (`Arrow`), Hình chữ nhật (`Rect`), Hình elip (`Circle`), Tẩy (`Eraser`), chọn màu sắc, Hoàn tác (`Undo`), Xóa bảng.
  - **Công cụ STEM chuyên biệt**:
    - 📈 **Đồ thị hàm số 2D**: Tự động dựng hệ trục tọa độ $Oxy$ và vẽ đường cong Parabol $y = x^2$.
    - 🧊 **Hình học không gian 3D**: Dựng hình chóp tứ giác 3D với các cạnh khuất nét đứt chuẩn sách giáo khoa.
    - ⚡ **Ký hiệu Vật lý**: Dựng mô hình con lắc lò xo trực quan ngay trên bảng.
  - **Quản lý trang bảng & Quyền hạn**: Chuyển đổi qua lại nhiều trang slide (`Trang 1/N`), thêm trang mới, và nút **Khóa/Mở bảng trắng đối với học viên**.
- **Câu đố trực tiếp (Live Quiz)** & **Phòng chat lớp học thời gian thực** đồng bộ qua API.

### 3. Hệ thống Vai trò & Không gian Quản lý (`/app/*`)
- **Học viên (`/app/learn`)**: Theo dõi các lớp đang theo học, lịch học sắp tới, vào phòng học trực tiếp và xem lại bảng trắng.
- **Giáo viên (`/app/teach/courses`)**: Tạo khóa học mới, thiết lập học phí, quản lý danh sách khóa học và mở phòng dạy trực tuyến.
- **Quản trị & Kiểm duyệt (`/app/market`)**: Duyệt hồ sơ xác minh giáo viên, kiểm duyệt khóa học và theo dõi số liệu toàn sàn.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Thành phần | Công nghệ |
| :--- | :--- |
| **Framework** | [SvelteKit 2](https://svelte.dev/docs/kit) + [Svelte 5 (Runes)](https://svelte.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), hệ màu `OKLCH`, hỗ trợ Giao diện Sáng / Tối (`lms-theme`) |
| **Ngôn ngữ** | TypeScript 5 |
| **Icons** | [`lucide-svelte`](https://lucide.dev/) |
| **Backend & API** | SvelteKit Server Routes (`/api/v4/...`) + Runtime Datastore & cấu hình PostgreSQL (`docker-compose.yml` + `pg`) |

---

## 📂 Cấu trúc thư mục

```text
hocvui/
├── src/
│   ├── app.css                          # Thiết lập Tailwind v4, biến màu OKLCH Light/Dark & utility classes
│   ├── app.html                         # HTML template gốc với script đồng bộ theme/locale chống chớp sáng
│   ├── lib/
│   │   ├── components/                  # BrandLogo, Header, Footer dùng chung
│   │   ├── data/seed-data.ts            # Dữ liệu gốc: 56 môn học, giáo viên, khóa học, bảng phí, phòng họp
│   │   ├── server/db.ts                 # In-memory & PostgreSQL data store cho users, courses, rooms, live sessions
│   │   └── stores/appState.svelte.ts    # Svelte 5 Rune state quản lý user session, theme (dark/light), locale (vi/en)
│   └── routes/
│       ├── +layout.svelte               # Điều phối layout Công khai vs App Shell / Live Room
│       ├── +page.svelte                 # Trang chủ Học Vui
│       ├── courses/                     # Danh mục khóa học (/courses) & Chi tiết khóa học (/courses/[slug])
│       ├── subjects/[slug]/             # Trang khám phá khóa học theo từng môn học
│       ├── teachers/                    # Danh sách giáo viên (/teachers) & Hồ sơ giáo viên (/teachers/[username])
│       ├── teach/                       # Trang thông tin giảng dạy, bảng biểu phí & công cụ ước tính phí
│       ├── rooms/                       # Trang đặt phòng họp trực tuyến & tính phí tự động
│       ├── r/[roomId]/                  # Phòng họp video & bảng trắng tức thì cho nhóm
│       ├── login/ & register/           # Đăng nhập, Đăng ký (Học viên / Giáo viên), Quên mật khẩu
│       ├── about/ & contact/            # Giới thiệu, Hỗ trợ & FAQ, Điều khoản (/terms), Quyền riêng tư (/privacy)
│       ├── app/                         # App Shell (/app, /app/learn, /app/teach/courses, /app/market, /app/live/[sessionId])
│       └── api/v4/                      # Hệ thống REST API tương thích cấu trúc hocvui.org
├── docker-compose.yml                   # Cấu hình PostgreSQL 16 local
├── package.json                         # Scripts & dependencies
├── svelte.config.js                     # Cấu hình SvelteKit
├── tsconfig.json                        # Cấu hình TypeScript
└── vite.config.ts                       # Cấu hình Vite + Tailwind CSS v4
```

---

## 🔌 Danh sách REST API Endpoints

- `GET /api/v4/lms/public/subjects` — Lấy toàn bộ danh mục 56 môn học phân cấp.
- `GET /api/v4/lms/public/catalog` & `POST /api/v4/lms/public/catalog` — Tìm kiếm, lọc danh sách khóa học và tạo khóa học mới.
- `GET /api/v4/lms/public/catalog/[slug]` — Chi tiết khóa học và giáo trình.
- `GET /api/v4/lms/public/teachers` & `GET /api/v4/lms/public/teachers/[username]` — Danh sách và hồ sơ chi tiết giáo viên.
- `GET /api/v4/lms/public/fee-schedule` — Bảng biểu phí nền tảng hiện hành.
- `GET /api/v4/lms/public/rooms/offer` — Cấu hình hạn mức miễn phí và đơn giá phòng họp.
- `POST /api/v4/users/login` & `POST /api/v4/lms/public/signup` — Xác thực đăng nhập và đăng ký tài khoản.
- `GET /api/v4/lms/rooms` & `POST /api/v4/lms/rooms` — Danh sách và khởi tạo phòng họp trực tuyến.
- `GET / POST /api/v4/lms/live/sessions/[id]/whiteboard` — Đồng bộ nét vẽ bảng trắng theo thời gian thực.
- `GET / POST /api/v4/lms/live/sessions/[id]/messages` — Đồng bộ tin nhắn phòng chat lớp học.

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- **Node.js**: `>= 20.x`
- **npm**: `>= 10.x`
- *(Tùy chọn)* **Docker & Docker Compose** nếu muốn khởi chạy PostgreSQL container.

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: **`http://localhost:5173`**

### 3. Kiểm tra kiểu dữ liệu & Build Production
```bash
# Kiểm tra lỗi TypeScript & Svelte 5
npm run check

# Đóng gói bản Production
npm run build

# Chạy thử bản Production
npm run preview
```

### 4. (Tùy chọn) Khởi chạy PostgreSQL với Docker
```bash
docker compose up -d
```

---

## 🔑 Tài khoản dùng thử nhanh (Demo Accounts)

Tại trang `/login`, bạn có thể bấm nút điền nhanh hoặc nhập trực tiếp các tài khoản mẫu sau:

| Vai trò | Tài khoản / Email | Mật khẩu | Trang điều hướng sau đăng nhập |
| :--- | :--- | :--- | :--- |
| **Học viên** | `hocvien.demo` (`hocvien@hocvui.org`) | `123456` | `/app/learn` |
| **Giáo viên** | `nguyen.van.hieu` (`hieu.nguyen@hocvui.org`) | `123456` | `/app/teach/courses` |
| **Quản trị viên** | `admin` (`admin@hocvui.org`) | `123456` | `/app/market` |
