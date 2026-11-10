export interface Subject {
	id: string;
	parent_id?: string | null;
	name: string;
	slug: string;
	icon: string;
	position: number;
	course_count: number;
}

export interface Teacher {
	id: string;
	username: string;
	display_name: string;
	headline: string;
	rating_avg: number;
	rating_count: number;
	student_count: number;
	course_count: number;
	last_picture_update: number;
	verified: boolean;
	expertise?: string[];
	years_experience?: number;
	bio?: string;
	video_url?: string;
	subjects: {
		id: string;
		name: string;
		slug: string;
		icon: string;
	}[];
}

export interface Course {
	id: string;
	slug: string;
	name: string;
	headline: string;
	description?: string;
	level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
	language: string;
	cover_image_url: string;
	price: string;
	price_type: 'FREE' | 'PER_LESSON' | 'PER_COURSE';
	currency: string;
	total_sessions: number;
	duration_per_session: number; // minutes
	rating_avg: number;
	rating_count: number;
	subject: {
		id: string;
		name: string;
		slug: string;
		icon: string;
	};
	teacher: {
		id: string;
		username: string;
		display_name: string;
		rating_avg: number;
		rating_count: number;
		student_count: number;
		course_count: number;
		last_picture_update: number;
		verified: boolean;
	};
	next_class_start: number;
	open_class_count: number;
	published_at: number;
	update_at: number;
	syllabus?: {
		title: string;
		sessions: { session_num: number; topic: string; description: string }[];
	}[];
}

export const SEED_SUBJECTS: Subject[] = [
	{ id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán", slug: "toan", icon: "sigma", position: 0, course_count: 1 },
	{ id: "zfse9f5ubfr7xyt3eyk8aha7be", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 1", slug: "toan-lop-1", icon: "sigma", position: 0, course_count: 1 },
	{ id: "itf9yipreb8qt84ro4ty3qugxy", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 2", slug: "toan-lop-2", icon: "sigma", position: 1, course_count: 0 },
	{ id: "6q9km3rz4br4u8m6hj75qohiie", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 3", slug: "toan-lop-3", icon: "sigma", position: 2, course_count: 0 },
	{ id: "ueb7h4ya3ir63ys1mhpx49sqfc", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 4", slug: "toan-lop-4", icon: "sigma", position: 3, course_count: 0 },
	{ id: "g8u64jngeprjbg7u6idpow35bo", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 5", slug: "toan-lop-5", icon: "sigma", position: 4, course_count: 0 },
	{ id: "7qzg5btkoprn7nsmwp79b6g57h", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 6", slug: "toan-lop-6", icon: "sigma", position: 5, course_count: 0 },
	{ id: "tn8x489yptd9tdb7a667p563ce", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 7", slug: "toan-lop-7", icon: "sigma", position: 6, course_count: 0 },
	{ id: "n8r1789c67bhxptx1h45k4e3pe", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 8", slug: "toan-lop-8", icon: "sigma", position: 7, course_count: 0 },
	{ id: "zndg74oxitdguk4pfftz6u45me", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 9", slug: "toan-lop-9", icon: "sigma", position: 8, course_count: 0 },
	{ id: "p8yup48kttdqffz8tzdf9pnd7c", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 10", slug: "toan-lop-10", icon: "sigma", position: 9, course_count: 0 },
	{ id: "kx8k4y7nffbypp8u41td453x7a", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 11", slug: "toan-lop-11", icon: "sigma", position: 10, course_count: 0 },
	{ id: "qtz8yptzdtf47k8x1z8up7d5oa", parent_id: "u1s6k1gg3bydmcmnknqubyn4ke", name: "Toán lớp 12", slug: "toan-lop-12", icon: "sigma", position: 11, course_count: 0 },

	{ id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Tiếng Việt", slug: "tieng-viet", icon: "pen-tool", position: 1, course_count: 1 },
	{ id: "bwiajkhzginkjxk6f6ietmb6ih", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Tiếng Việt Lớp 1", slug: "tieng-viet-lop-1", icon: "pen-tool", position: 0, course_count: 1 },
	{ id: "hmgi5waqsjfptjtk4z18w6kwtc", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Tiếng Việt Lớp 2", slug: "tieng-viet-lop-2", icon: "pen-tool", position: 1, course_count: 0 },
	{ id: "rhc3zag1mj83mjw57k8m3k836o", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Tiếng Việt Lớp 3", slug: "tieng-viet-lop-3", icon: "pen-tool", position: 2, course_count: 0 },
	{ id: "hc9xsgkgt7g5zxnuxtenkcjx4o", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Tiếng Việt Lớp 4", slug: "tieng-viet-lop-4", icon: "pen-tool", position: 3, course_count: 0 },
	{ id: "c47jz1cotibptdaxmqe4g44fuo", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Tiếng Việt Lớp 5", slug: "tieng-viet-lop-5", icon: "pen-tool", position: 4, course_count: 0 },
	{ id: "actoet5ue78xzybcqt43uj73ch", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 6", slug: "ngu-van-lop-6", icon: "pen-tool", position: 5, course_count: 0 },
	{ id: "g7yqcjrdhtgwdghj975ukc9roa", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 7", slug: "ngu-van-lop-7", icon: "pen-tool", position: 6, course_count: 0 },
	{ id: "n6bus3rmti8em8g7mcxcxryhto", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 8", slug: "ngu-van-lop-8", icon: "pen-tool", position: 7, course_count: 0 },
	{ id: "qf3i7851tb8jfe3pxfxf7hwtbh", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 9", slug: "ngu-van-lop-9", icon: "pen-tool", position: 8, course_count: 0 },
	{ id: "k7n8ptzf8bfqzxkdfh418upz4a", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 10", slug: "ngu-van-lop-10", icon: "pen-tool", position: 9, course_count: 0 },
	{ id: "m4tdy89kptb7zxfk18u7dt45ce", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 11", slug: "ngu-van-lop-11", icon: "pen-tool", position: 10, course_count: 0 },
	{ id: "x8pt4zd7ybf8kxzf41td97up5a", parent_id: "z8nnx8pm8jbnxxn81714mxrzgh", name: "Ngữ Văn Lớp 12", slug: "ngu-van-lop-12", icon: "pen-tool", position: 11, course_count: 0 },

	{ id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh", slug: "tieng-anh", icon: "languages", position: 2, course_count: 1 },
	{ id: "aqi9bfsb8pbfjehbhwueztd6ih", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 1", slug: "tieng-anh-lop-1", icon: "languages", position: 0, course_count: 0 },
	{ id: "zj481qep5tdwdjdxo7rxae4ycr", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 2", slug: "tieng-anh-lop-2", icon: "languages", position: 1, course_count: 0 },
	{ id: "guygbim89brkmn3wiazakpi63o", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 3", slug: "tieng-anh-lop-3", icon: "languages", position: 2, course_count: 0 },
	{ id: "d6xqsu7w9tbhpgdhnmhjwzi38y", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 4", slug: "tieng-anh-lop-4", icon: "languages", position: 3, course_count: 0 },
	{ id: "jyrpyp7jcjf8dy6jxtn6otnhhe", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 5", slug: "tieng-anh-lop-5", icon: "languages", position: 4, course_count: 0 },
	{ id: "84mb3crmbt8wjec6e6hujc4pae", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 6", slug: "tieng-anh-lop-6", icon: "languages", position: 5, course_count: 0 },
	{ id: "ka5ijdnsiprabc4nak58t8mf1w", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 7", slug: "tieng-anh-lop-7", icon: "languages", position: 6, course_count: 0 },
	{ id: "ta8ijdnsiprabc4nak58t8mf88", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 8", slug: "tieng-anh-lop-8", icon: "languages", position: 7, course_count: 0 },
	{ id: "ta9ijdnsiprabc4nak58t8mf99", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 9", slug: "tieng-anh-lop-9", icon: "languages", position: 8, course_count: 0 },
	{ id: "ta10jdnsiprabc4nak58t8mf10", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 10", slug: "tieng-anh-lop-10", icon: "languages", position: 9, course_count: 0 },
	{ id: "ta11jdnsiprabc4nak58t8mf11", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 11", slug: "tieng-anh-lop-11", icon: "languages", position: 10, course_count: 0 },
	{ id: "ta12jdnsiprabc4nak58t8mf12", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Lớp 12", slug: "tieng-anh-lop-12", icon: "languages", position: 11, course_count: 0 },
	{ id: "ta13jdnsiprabc4nak58t8mf13", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh IELTS", slug: "tieng-anh-ielts", icon: "languages", position: 12, course_count: 0 },
	{ id: "byiz84skxpb4dxxwde87qjt1wr", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Toeic", slug: "tieng-anh-toeic", icon: "languages", position: 14, course_count: 1 },
	{ id: "ek8oacg6dtfq4ztdffb7ky8z4a", parent_id: "hx9h5mwtwjd3bcykmh5kryrf9w", name: "Tiếng Anh Giao Tiếp", slug: "tieng-anh-giao-tiep", icon: "languages", position: 15, course_count: 0 },

	{ id: "zezzuq14tif35jptmew9oc39je", name: "Tiếng Hàn", slug: "tieng-han", icon: "languages", position: 3, course_count: 0 },
	{ id: "thsc1ifoey3b15quzqaenphg01", parent_id: "zezzuq14tif35jptmew9oc39je", name: "Tiếng Hàn Sơ Cấp 1", slug: "tieng-han-so-cap-1", icon: "languages", position: 0, course_count: 0 },
	{ id: "thsc2ifoey3b15quzqaenphg02", parent_id: "zezzuq14tif35jptmew9oc39je", name: "Tiếng Hàn Sơ Cấp 2", slug: "tieng-han-so-cap-2", icon: "languages", position: 1, course_count: 0 },
	{ id: "6paoifoey3b15quzqaenphg3pc", parent_id: "zezzuq14tif35jptmew9oc39je", name: "Tiếng Hàn Trung Cấp 1", slug: "tieng-han-trung-cap-1", icon: "languages", position: 2, course_count: 0 },
	{ id: "yq8ng8zwz3rrmndbjz8buzut4o", parent_id: "zezzuq14tif35jptmew9oc39je", name: "Tiếng Hàn Trung Cấp 2", slug: "tieng-han-tieng-han-trung-cap-2", icon: "languages", position: 3, course_count: 0 },
	{ id: "thgt3ifoey3b15quzqaenphg04", parent_id: "zezzuq14tif35jptmew9oc39je", name: "Tiếng Hàn Giao Tiếp", slug: "tieng-han-giao-tiep", icon: "languages", position: 4, course_count: 0 },

	{ id: "tzriraiuhtf6ucj88dbxjqetew", name: "Tiếng Trung", slug: "tieng-trung", icon: "languages", position: 4, course_count: 0 },
	{ id: "4s5r5pnud7d7tcktaiopuc9thy", parent_id: "tzriraiuhtf6ucj88dbxjqetew", name: "Tiếng Trung Giao Tiếp", slug: "tieng-trung-giao-tiep", icon: "languages", position: 0, course_count: 0 },
	{ id: "tt1r5pnud7d7tcktaiopuc9th1", parent_id: "tzriraiuhtf6ucj88dbxjqetew", name: "Tiếng Trung HSK 1", slug: "tieng-trung-hsk-1", icon: "languages", position: 1, course_count: 0 },
	{ id: "tt2r5pnud7d7tcktaiopuc9th2", parent_id: "tzriraiuhtf6ucj88dbxjqetew", name: "Tiếng Trung HSK 2", slug: "tieng-trung-hsk-2", icon: "languages", position: 2, course_count: 0 },
	{ id: "tt3r5pnud7d7tcktaiopuc9th3", parent_id: "tzriraiuhtf6ucj88dbxjqetew", name: "Tiếng Trung HSK 3", slug: "tieng-trung-hsk-3", icon: "languages", position: 3, course_count: 0 },
	{ id: "tt4r5pnud7d7tcktaiopuc9th4", parent_id: "tzriraiuhtf6ucj88dbxjqetew", name: "Tiếng Trung HSK 4", slug: "tieng-trung-hsk-4", icon: "languages", position: 4, course_count: 0 },

	{ id: "zoyuwk1xxpdgmk1w3kggwje8th", name: "Tiếng Nhật", slug: "tieng-nhat", icon: "languages", position: 5, course_count: 0 },
	{ id: "tn1uwk1xxpdgmk1w3kggwje8n5", parent_id: "zoyuwk1xxpdgmk1w3kggwje8th", name: "Tiếng Nhật N5", slug: "tieng-nhat-n5", icon: "languages", position: 0, course_count: 0 },
	{ id: "tn2uwk1xxpdgmk1w3kggwje8n4", parent_id: "zoyuwk1xxpdgmk1w3kggwje8th", name: "Tiếng Nhật N4", slug: "tieng-nhat-n4", icon: "languages", position: 1, course_count: 0 },
	{ id: "tn3uwk1xxpdgmk1w3kggwje8n3", parent_id: "zoyuwk1xxpdgmk1w3kggwje8th", name: "Tiếng Nhật N3", slug: "tieng-nhat-n3", icon: "languages", position: 2, course_count: 0 },
	{ id: "tn4uwk1xxpdgmk1w3kggwje8gt", parent_id: "zoyuwk1xxpdgmk1w3kggwje8th", name: "Tiếng Nhật Giao Tiếp", slug: "tieng-nhat-giao-tiep", icon: "languages", position: 3, course_count: 0 }
];

export const SEED_TEACHERS: Teacher[] = [
	{
		id: "9nxuh35qqid45d1mmggrw81ktc",
		username: "s.van.le2398",
		display_name: "Thầy Văn Lê",
		headline: "Giáo viên chuyên ôn luyện Toán và Tiếng Việt Tiểu học với phương pháp gợi mở trực quan.",
		rating_avg: 4.8,
		rating_count: 15,
		student_count: 68,
		course_count: 2,
		last_picture_update: Date.now() - 3600000,
		verified: true,
		expertise: ["Toán lớp 1-5", "Tiếng Việt chuẩn ngữ pháp", "Tư duy sáng tạo"],
		years_experience: 5,
		bio: "Cử nhân Sư phạm loại Giỏi, hơn 5 năm kinh nghiệm đồng hành cùng học sinh tiểu học, giúp các em yêu thích môn học và chủ động học tập mỗi ngày.",
		subjects: [
			{ id: "bwiajkhzginkjxk6f6ietmb6ih", name: "Tiếng Việt Lớp 1", slug: "tieng-viet-lop-1", icon: "pen-tool" },
			{ id: "zfse9f5ubfr7xyt3eyk8aha7be", name: "Toán lớp 1", slug: "toan-lop-1", icon: "sigma" }
		]
	},
	{
		id: "yw349yu8zbfqzk43gmeeogxbmc",
		username: "nguyen.van.hieu",
		display_name: "Thầy Nguyễn Văn Hiếu",
		headline: "Giáo viên Tiếng Anh TOEIC 900+ & Toán Song ngữ Quốc tế.",
		rating_avg: 4.9,
		rating_count: 28,
		student_count: 124,
		course_count: 1,
		last_picture_update: Date.now() - 7200000,
		verified: true,
		expertise: ["TOEIC 4 kỹ năng", "Tiếng Anh giao tiếp", "Ngữ pháp cốt lõi"],
		years_experience: 6,
		bio: "Giảng dạy nhiệt huyết, lộ trình cá nhân hóa, phương pháp trực quan sinh động qua bảng trắng và trao đổi phản xạ ngay trong lớp.",
		subjects: [
			{ id: "byiz84skxpb4dxxwde87qjt1wr", name: "Tiếng Anh Toeic", slug: "tieng-anh-toeic", icon: "languages" }
		]
	}
];

export const SEED_COURSES: Course[] = [
	{
		id: "ozpa8pxu7f89txfbc1oi8u8w4w",
		slug: "basic-english-1-13-thi-co-ban-ozpa8pxu7f89txfbc1oi8u8w4w",
		name: "Basic English 1 - 13 thì cơ bản",
		headline: "Nắm vững toàn bộ 13 thì tiếng Anh cùng phương pháp nhớ lâu và bài tập phản xạ ngay trong lớp.",
		description: "Khóa học trang bị nền tảng ngữ pháp cốt lõi cho học sinh và người đi làm. Lớp học tương tác trực tiếp: xem slide, vẽ sơ đồ thời gian trên bảng trắng và làm bài tập trực tiếp cùng giáo viên.",
		level: "BEGINNER",
		language: "vi",
		cover_image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
		price: "0",
		price_type: "FREE",
		currency: "VND",
		total_sessions: 12,
		duration_per_session: 60,
		rating_avg: 4.9,
		rating_count: 12,
		subject: {
			id: "byiz84skxpb4dxxwde87qjt1wr",
			name: "Tiếng Anh Toeic",
			slug: "tieng-anh-toeic",
			icon: "languages"
		},
		teacher: {
			id: "yw349yu8zbfqzk43gmeeogxbmc",
			username: "nguyen.van.hieu",
			display_name: "Thầy Nguyễn Văn Hiếu",
			rating_avg: 4.9,
			rating_count: 28,
			student_count: 124,
			course_count: 1,
			last_picture_update: Date.now(),
			verified: true
		},
		next_class_start: Date.now() + 86400000 * 2,
		open_class_count: 2,
		published_at: Date.now() - 86400000 * 10,
		update_at: Date.now() - 86400000 * 2,
		syllabus: [
			{
				title: "Phần 1: Nhóm thì Hiện Tại",
				sessions: [
					{ session_num: 1, topic: "Hiện tại đơn (Present Simple)", description: "Cấu trúc, trạng từ chỉ tần suất và thực hành hội thoại." },
					{ session_num: 2, topic: "Hiện tại tiếp diễn (Present Continuous)", description: "Diễn tả hành động đang diễn ra và kế hoạch tương lai." },
					{ session_num: 3, topic: "Hiện tại hoàn thành (Present Perfect)", description: "Kinh nghiệm, trải nghiệm và phân biệt since/for." }
				]
			},
			{
				title: "Phần 2: Nhóm thì Quá Khứ & Tương Lai",
				sessions: [
					{ session_num: 4, topic: "Quá khứ đơn & Quá khứ tiếp diễn", description: "Bảng động từ bất quy tắc và sự phối thì." },
					{ session_num: 5, topic: "Tương lai đơn & Tương lai gần", description: "Ý định vs Kế hoạch định sẵn." }
				]
			}
		]
	},
	{
		id: "ae47gbfjkjnz7kcubnognfhc4a",
		slug: "tieng-viet-co-ban-ae47gbfjkjnz7kcubnognfhc4a",
		name: "Tiếng Việt cơ bản Lớp 1",
		headline: "Rèn chữ đẹp, chuẩn phát âm, ghép vần và đọc hiểu thông thạo cho bé chuẩn bị vào lớp 1.",
		description: "Khóa học xây dựng môi trường học vui nhộn, hình ảnh trực quan sinh động giúp các bé tự tin phát âm, đọc chuẩn và yêu thích giờ học tiếng Việt.",
		level: "BEGINNER",
		language: "vi",
		cover_image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
		price: "0",
		price_type: "FREE",
		currency: "VND",
		total_sessions: 8,
		duration_per_session: 60,
		rating_avg: 5.0,
		rating_count: 18,
		subject: {
			id: "bwiajkhzginkjxk6f6ietmb6ih",
			name: "Tiếng Việt Lớp 1",
			slug: "tieng-viet-lop-1",
			icon: "pen-tool"
		},
		teacher: {
			id: "9nxuh35qqid45d1mmggrw81ktc",
			username: "s.van.le2398",
			display_name: "Thầy Văn Lê",
			rating_avg: 4.8,
			rating_count: 15,
			student_count: 68,
			course_count: 2,
			last_picture_update: Date.now(),
			verified: true
		},
		next_class_start: Date.now() + 86400000 * 3,
		open_class_count: 1,
		published_at: Date.now() - 86400000 * 15,
		update_at: Date.now() - 86400000 * 3,
		syllabus: [
			{
				title: "Làm quen với bảng chữ cái và dấu thanh",
				sessions: [
					{ session_num: 1, topic: "Nguyên âm và các dấu thanh cơ bản", description: "Dấu sắc, huyền, hỏi, ngã, nặng." },
					{ session_num: 2, topic: "Ghép phụ âm đầu với nguyên âm", description: "Thực hành trên bảng trắng điện tử." }
				]
			}
		]
	},
	{
		id: "z89smqbh4pyd9mm95wm6w3jqzo",
		slug: "toan-co-ban-lop-1-z89smqbh4pyd9mm95wm6w3jqzo",
		name: "Toán tư duy cơ bản Lớp 1",
		headline: "Phát triển tư duy logic, đếm số, cộng trừ trực quan thông qua trò chơi và bảng trắng tương tác.",
		description: "Không áp lực, không học vẹt. Khóa học giúp trẻ làm quen với các con số qua hình vẽ minh họa, bài toán đố thực tế và bảng tương tác thời gian thực.",
		level: "BEGINNER",
		language: "vi",
		cover_image_url: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80",
		price: "25000",
		price_type: "PER_LESSON",
		currency: "VND",
		total_sessions: 10,
		duration_per_session: 60,
		rating_avg: 4.7,
		rating_count: 9,
		subject: {
			id: "zfse9f5ubfr7xyt3eyk8aha7be",
			name: "Toán lớp 1",
			slug: "toan-lop-1",
			icon: "sigma"
		},
		teacher: {
			id: "9nxuh35qqid45d1mmggrw81ktc",
			username: "s.van.le2398",
			display_name: "Thầy Văn Lê",
			rating_avg: 4.8,
			rating_count: 15,
			student_count: 68,
			course_count: 2,
			last_picture_update: Date.now(),
			verified: true
		},
		next_class_start: Date.now() + 86400000 * 4,
		open_class_count: 2,
		published_at: Date.now() - 86400000 * 20,
		update_at: Date.now() - 86400000 * 5,
		syllabus: [
			{
				title: "Tập đếm và so sánh",
				sessions: [
					{ session_num: 1, topic: "Các số từ 1 đến 10", description: "Nhận biết lượng và mặt số." },
					{ session_num: 2, topic: "Phép so sánh lớn hơn, nhỏ hơn, bằng nhau", description: "Bài tập trực quan trên bảng vẽ." }
				]
			}
		]
	}
];

export const SEED_FEE_SCHEDULE = {
	current: {
		id: "zocbsnscpinuiy6wk13fi9obie",
		name: "Bảng biểu phí học tập 2026",
		effective_from: Date.now() - 86400000 * 30,
		basis: "SCHEDULED",
		learner_hours: [
			{ from_units: 0, unit_price: "0" },
			{ from_units: 20, unit_price: "1200" },
			{ from_units: 250, unit_price: "1000" },
			{ from_units: 500, unit_price: "800" }
		],
		class_hours: [
			{ from_units: 0, unit_price: "0" },
			{ from_units: 10, unit_price: "1000" },
			{ from_units: 150, unit_price: "900" },
			{ from_units: 250, unit_price: "800" },
			{ from_units: 500, unit_price: "700" }
		],
		storage_gb: [],
		storage_limit_gb: 0,
		commission: { percent: "10", days: 45, after_lessons: 4 },
		room_free_members: 2,
		room_free_minutes: 60,
		room_person_hour_price: "800",
		status: "ACTIVE",
		createat: Date.now() - 86400000 * 30,
		updateat: Date.now() - 86400000 * 30
	},
	upcoming: null
};

export const SEED_ROOMS_OFFER = {
	enabled: true,
	payments_enabled: true,
	min_members: 2,
	max_members: 50,
	max_minutes: 240,
	minute_step: 60,
	free_members: 2,
	free_minutes: 60,
	person_hour_price: "800",
	currency: "VND"
};
