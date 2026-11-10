import {
	SEED_SUBJECTS,
	SEED_COURSES,
	SEED_TEACHERS,
	SEED_FEE_SCHEDULE,
	SEED_ROOMS_OFFER,
	type Course,
	type Teacher,
	type Subject
} from '$lib/data/seed-data';

export interface DbUser {
	id: string;
	username: string;
	email: string;
	password_hash: string;
	display_name: string;
	role: 'student' | 'teacher' | 'admin';
	created_at: number;
}

export interface DbRoom {
	id: string;
	name: string;
	creator_id: string;
	created_at: number;
	members_count: number;
	max_members: number;
	status: 'active' | 'ended';
	secret?: string;
}

export interface DbWhiteboardState {
	session_id: string;
	lines: any[];
	text_elements: any[];
	updated_at: number;
	locked: boolean;
}

export interface DbMessage {
	id: string;
	channel_id: string;
	sender_id: string;
	sender_name: string;
	sender_role: string;
	content: string;
	timestamp: number;
}

// In-memory runtime store (seeded from real hocvui.org data)
class DataStore {
	subjects: Subject[] = [...SEED_SUBJECTS];
	courses: Course[] = [...SEED_COURSES];
	teachers: Teacher[] = [...SEED_TEACHERS];
	feeSchedule = { ...SEED_FEE_SCHEDULE };
	roomsOffer = { ...SEED_ROOMS_OFFER };
	users: DbUser[] = [
		{
			id: "usr_student_1",
			username: "hocvien.demo",
			email: "hocvien@hocvui.org",
			password_hash: "123456",
			display_name: "Học Viên Mẫu",
			role: "student",
			created_at: Date.now() - 86400000 * 30
		},
		{
			id: "yw349yu8zbfqzk43gmeeogxbmc",
			username: "nguyen.van.hieu",
			email: "hieu.teacher@hocvui.org",
			password_hash: "123456",
			display_name: "Thầy Nguyễn Văn Hiếu",
			role: "teacher",
			created_at: Date.now() - 86400000 * 60
		},
		{
			id: "usr_admin_1",
			username: "admin",
			email: "admin@hocvui.org",
			password_hash: "123456",
			display_name: "Ban Quản Trị",
			role: "admin",
			created_at: Date.now() - 86400000 * 90
		}
	];
	rooms: DbRoom[] = [
		{
			id: "room_phonghoc_01",
			name: "Phòng học Toán cơ bản - Lớp 1A",
			creator_id: "yw349yu8zbfqzk43gmeeogxbmc",
			created_at: Date.now() - 3600000,
			members_count: 3,
			max_members: 15,
			status: 'active'
		}
	];
	whiteboards = new Map<string, DbWhiteboardState>();
	messages: DbMessage[] = [
		{
			id: "msg_1",
			channel_id: "room_phonghoc_01",
			sender_id: "yw349yu8zbfqzk43gmeeogxbmc",
			sender_name: "Thầy Nguyễn Văn Hiếu",
			sender_role: "teacher",
			content: "Chào các bạn! Hôm nay chúng ta sẽ cùng thực hành bài tập trên bảng trắng nhé.",
			timestamp: Date.now() - 1800000
		}
	];
	enrollments: { user_id: string; course_id: string; enrolled_at: number }[] = [
		{ user_id: "usr_student_1", course_id: "ozpa8pxu7f89txfbc1oi8u8w4w", enrolled_at: Date.now() - 86400000 }
	];

	getWhiteboard(sessionId: string): DbWhiteboardState {
		if (!this.whiteboards.has(sessionId)) {
			this.whiteboards.set(sessionId, {
				session_id: sessionId,
				lines: [],
				text_elements: [],
				updated_at: Date.now(),
				locked: false
			});
		}
		return this.whiteboards.get(sessionId)!;
	}

	saveWhiteboard(sessionId: string, lines: any[], text_elements: any[], locked = false) {
		const wb = this.getWhiteboard(sessionId);
		wb.lines = lines;
		wb.text_elements = text_elements;
		wb.updated_at = Date.now();
		wb.locked = locked;
		return wb;
	}
}

export const db = new DataStore();
