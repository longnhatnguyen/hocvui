<script lang="ts">
	import { page } from '$app/state';
	import { appState } from '$lib/stores/appState.svelte';
	import { onMount, onDestroy } from 'svelte';
	import {
		Video,
		VideoOff,
		Mic,
		MicOff,
		MonitorUp,
		Presentation,
		MessagesSquare,
		Pencil,
		Highlighter,
		Square,
		Circle,
		Minus,
		MoveUpRight,
		Eraser,
		Trash2,
		Send,
		Lock,
		Unlock,
		Save,
		Undo2,
		ChevronLeft,
		ChevronRight,
		Plus,
		Box,
		Activity,
		Zap,
		CircleDot
	} from 'lucide-svelte';

	const sessionId = $derived(page.params.sessionId || 'session_demo_01');

	// Media State
	let localVideoElement: HTMLVideoElement | null = $state(null);
	let localStream: MediaStream | null = $state(null);
	let isVideoOn = $state(true);
	let isAudioOn = $state(true);
	let isScreenSharing = $state(false);
	let isRecording = $state(false);

	// Stage Tabs: 'whiteboard' | 'grid' | 'quiz'
	let activeView = $state<'whiteboard' | 'grid' | 'quiz'>('whiteboard');

	// Multi-page Whiteboard State
	let canvasElement: HTMLCanvasElement | null = $state(null);
	let ctx: CanvasRenderingContext2D | null = null;
	let isDrawing = false;
	let currentTool = $state<'pencil' | 'highlighter' | 'line' | 'arrow' | 'rect' | 'circle' | 'eraser'>('pencil');
	let strokeColor = $state('#2563eb');
	let strokeWidth = $state(3);
	let boardLockedForStudents = $state(false);
	let startX = 0;
	let startY = 0;
	let snapshot: ImageData | null = null;

	let pages = $state<any[][]>([[]]);
	let currentPageIndex = $state(0);
	let linesData = $derived(pages[currentPageIndex] || []);
	let saveStatus = $state('');

	// Live Quiz State
	let activeQuizQuestion = $state({
		prompt: 'Cho hàm số y = x² - 4x + 3. Đỉnh của parabol có tọa độ là:',
		options: ['I(2; -1)', 'I(-2; 15)', 'I(1; 0)', 'I(4; 3)'],
		selected: -1,
		submitted: false
	});

	// Chat State
	let messages = $state<
		{ id: string; sender_name: string; sender_role: string; content: string; timestamp: number }[]
	>([]);
	let chatInput = $state('');
	let pollInterval: any = null;

	onMount(async () => {
		try {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
				if (localVideoElement) {
					localVideoElement.srcObject = localStream;
				}
			}
		} catch {}

		if (canvasElement) {
			ctx = canvasElement.getContext('2d');
			resizeCanvas();
			await loadWhiteboard();
		}

		loadMessages();
		pollInterval = setInterval(loadMessages, 3000);
		window.addEventListener('resize', resizeCanvas);
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
		if (localStream) {
			localStream.getTracks().forEach((track) => track.stop());
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', resizeCanvas);
		}
	});

	function resizeCanvas() {
		if (!canvasElement || !ctx) return;
		const rect = canvasElement.parentElement?.getBoundingClientRect();
		if (rect) {
			canvasElement.width = rect.width;
			canvasElement.height = Math.max(500, rect.height);
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			redrawLines(pages[currentPageIndex] || []);
		}
	}

	async function loadWhiteboard() {
		try {
			const res = await fetch(`/api/v4/lms/live/sessions/${sessionId}/whiteboard`);
			if (res.ok) {
				const data = await res.json();
				if (data.lines && data.lines.length > 0 && ctx) {
					pages[0] = data.lines;
					redrawLines(pages[currentPageIndex]);
				}
			}
		} catch {}
	}

	function redrawLines(lines: any[]) {
		if (!ctx || !canvasElement) return;
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
		for (const l of lines) {
			ctx.save();
			ctx.strokeStyle = l.color || '#2563eb';
			ctx.lineWidth = l.width || 3;
			ctx.globalAlpha = l.alpha || 1;
			ctx.setLineDash(l.dashed ? [6, 6] : []);

			if (l.tool === 'pencil' || l.tool === 'highlighter') {
				if (l.points && l.points.length > 0) {
					ctx.beginPath();
					ctx.moveTo(l.points[0].x, l.points[0].y);
					for (let i = 1; i < l.points.length; i++) {
						ctx.lineTo(l.points[i].x, l.points[i].y);
					}
					ctx.stroke();
				}
			} else if (l.tool === 'rect') {
				ctx.strokeRect(l.x, l.y, l.w, l.h);
			} else if (l.tool === 'circle') {
				ctx.beginPath();
				const rx = Math.abs(l.w) / 2;
				const ry = Math.abs(l.h) / 2;
				ctx.ellipse(l.x + l.w / 2, l.y + l.h / 2, rx, ry, 0, 0, Math.PI * 2);
				ctx.stroke();
			} else if (l.tool === 'line' || l.tool === 'arrow') {
				ctx.beginPath();
				ctx.moveTo(l.x1, l.y1);
				ctx.lineTo(l.x2, l.y2);
				ctx.stroke();
				if (l.tool === 'arrow') {
					const angle = Math.atan2(l.y2 - l.y1, l.x2 - l.x1);
					const headLen = 12;
					ctx.beginPath();
					ctx.moveTo(l.x2, l.y2);
					ctx.lineTo(
						l.x2 - headLen * Math.cos(angle - Math.PI / 6),
						l.y2 - headLen * Math.sin(angle - Math.PI / 6)
					);
					ctx.moveTo(l.x2, l.y2);
					ctx.lineTo(
						l.x2 - headLen * Math.cos(angle + Math.PI / 6),
						l.y2 - headLen * Math.sin(angle + Math.PI / 6)
					);
					ctx.stroke();
				}
			}
			ctx.restore();
		}
	}

	async function saveWhiteboardToServer() {
		saveStatus = 'Đang lưu...';
		try {
			await fetch(`/api/v4/lms/live/sessions/${sessionId}/whiteboard`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lines: pages[currentPageIndex] })
			});
			saveStatus = 'Đã lưu';
			setTimeout(() => (saveStatus = ''), 1800);
		} catch {
			saveStatus = 'Lỗi lưu';
		}
	}

	// Math / 3D / Physics Preset Generators (hocvui.org signature tools)
	function insertMathGraph(type: 'parabola' | 'sin') {
		const cx = 320;
		const cy = 220;
		const current = pages[currentPageIndex];
		// Draw axes
		current.push({ tool: 'arrow', color: '#64748b', width: 2, x1: cx - 150, y1: cy, x2: cx + 150, y2: cy });
		current.push({ tool: 'arrow', color: '#64748b', width: 2, x1: cx, y1: cy + 120, x2: cx, y2: cy - 120 });

		const pts: { x: number; y: number }[] = [];
		if (type === 'parabola') {
			for (let x = -90; x <= 90; x += 4) {
				const y = -(x * x) / 70 + 60;
				pts.push({ x: cx + x, y: cy + y });
			}
		} else {
			for (let x = -130; x <= 130; x += 4) {
				const y = -Math.sin(x / 25) * 60;
				pts.push({ x: cx + x, y: cy + y });
			}
		}
		current.push({ tool: 'pencil', color: strokeColor, width: 3, points: pts });
		redrawLines(current);
		saveWhiteboardToServer();
	}

	function insert3DPyramid() {
		const current = pages[currentPageIndex];
		const apex = { x: 520, y: 90 };
		const A = { x: 420, y: 260 };
		const B = { x: 470, y: 210 };
		const C = { x: 610, y: 210 };
		const D = { x: 560, y: 260 };
		// Visible edges
		current.push({ tool: 'line', color: strokeColor, width: 2.5, x1: apex.x, y1: apex.y, x2: A.x, y2: A.y });
		current.push({ tool: 'line', color: strokeColor, width: 2.5, x1: apex.x, y1: apex.y, x2: D.x, y2: D.y });
		current.push({ tool: 'line', color: strokeColor, width: 2.5, x1: apex.x, y1: apex.y, x2: C.x, y2: C.y });
		current.push({ tool: 'line', color: strokeColor, width: 2.5, x1: A.x, y1: A.y, x2: D.x, y2: D.y });
		current.push({ tool: 'line', color: strokeColor, width: 2.5, x1: D.x, y1: D.y, x2: C.x, y2: C.y });
		// Hidden dashed edges
		current.push({ tool: 'line', color: strokeColor, width: 2, dashed: true, x1: apex.x, y1: apex.y, x2: B.x, y2: B.y });
		current.push({ tool: 'line', color: strokeColor, width: 2, dashed: true, x1: A.x, y1: A.y, x2: B.x, y2: B.y });
		current.push({ tool: 'line', color: strokeColor, width: 2, dashed: true, x1: B.x, y1: B.y, x2: C.x, y2: C.y });
		redrawLines(current);
		saveWhiteboardToServer();
	}

	function insertPhysicsSpring() {
		const current = pages[currentPageIndex];
		const pts: { x: number; y: number }[] = [{ x: 140, y: 340 }, { x: 170, y: 340 }];
		for (let i = 0; i < 8; i++) {
			pts.push({ x: 180 + i * 16, y: i % 2 === 0 ? 324 : 356 });
		}
		pts.push({ x: 315, y: 340 }, { x: 345, y: 340 });
		current.push({ tool: 'pencil', color: strokeColor, width: 2.5, points: pts });
		current.push({ tool: 'rect', color: strokeColor, width: 2.5, x: 345, y: 320, w: 45, h: 40 });
		redrawLines(current);
		saveWhiteboardToServer();
	}

	function handleMouseDown(e: MouseEvent) {
		if (!canvasElement || !ctx) return;
		isDrawing = true;
		const rect = canvasElement.getBoundingClientRect();
		startX = e.clientX - rect.left;
		startY = e.clientY - rect.top;

		const isErase = currentTool === 'eraser';
		const isHighlight = currentTool === 'highlighter';
		ctx.strokeStyle = isErase ? '#ffffff' : strokeColor;
		ctx.lineWidth = isErase ? strokeWidth * 5 : isHighlight ? 14 : strokeWidth;
		ctx.globalAlpha = isHighlight ? 0.35 : 1;

		snapshot = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);

		if (currentTool === 'pencil' || currentTool === 'highlighter' || currentTool === 'eraser') {
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			pages[currentPageIndex].push({
				tool: currentTool === 'highlighter' ? 'highlighter' : 'pencil',
				color: ctx.strokeStyle,
				width: ctx.lineWidth,
				alpha: ctx.globalAlpha,
				points: [{ x: startX, y: startY }]
			});
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDrawing || !canvasElement || !ctx) return;
		const rect = canvasElement.getBoundingClientRect();
		const currentX = e.clientX - rect.left;
		const currentY = e.clientY - rect.top;

		if (currentTool === 'pencil' || currentTool === 'highlighter' || currentTool === 'eraser') {
			ctx.lineTo(currentX, currentY);
			ctx.stroke();
			const current = pages[currentPageIndex];
			const currentLine = current[current.length - 1];
			if (currentLine) {
				currentLine.points.push({ x: currentX, y: currentY });
			}
		} else if (snapshot) {
			ctx.putImageData(snapshot, 0, 0);
			if (currentTool === 'line' || currentTool === 'arrow') {
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.lineTo(currentX, currentY);
				ctx.stroke();
			} else if (currentTool === 'rect') {
				ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
			} else if (currentTool === 'circle') {
				ctx.beginPath();
				const w = currentX - startX;
				const h = currentY - startY;
				ctx.ellipse(startX + w / 2, startY + h / 2, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
				ctx.stroke();
			}
		}
	}

	function handleMouseUp(e: MouseEvent) {
		if (!isDrawing) return;
		isDrawing = false;
		if (!canvasElement || !ctx) return;
		ctx.globalAlpha = 1;
		const rect = canvasElement.getBoundingClientRect();
		const endX = e.clientX - rect.left;
		const endY = e.clientY - rect.top;

		const current = pages[currentPageIndex];
		if (currentTool === 'line' || currentTool === 'arrow') {
			current.push({
				tool: currentTool,
				color: strokeColor,
				width: strokeWidth,
				x1: startX,
				y1: startY,
				x2: endX,
				y2: endY
			});
		} else if (currentTool === 'rect' || currentTool === 'circle') {
			current.push({
				tool: currentTool,
				color: strokeColor,
				width: strokeWidth,
				x: startX,
				y: startY,
				w: endX - startX,
				h: endY - startY
			});
		}
		redrawLines(current);
		saveWhiteboardToServer();
	}

	function undoLastStroke() {
		const current = pages[currentPageIndex];
		if (current.length > 0) {
			current.pop();
			redrawLines(current);
			saveWhiteboardToServer();
		}
	}

	function clearCanvas() {
		if (!ctx || !canvasElement) return;
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
		pages[currentPageIndex] = [];
		saveWhiteboardToServer();
	}

	function addNewSlide() {
		pages.push([]);
		currentPageIndex = pages.length - 1;
		redrawLines([]);
	}

	function switchSlide(index: number) {
		if (index >= 0 && index < pages.length) {
			currentPageIndex = index;
			redrawLines(pages[currentPageIndex]);
		}
	}

	// Toggle Media
	function toggleVideo() {
		isVideoOn = !isVideoOn;
		if (localStream) {
			localStream.getVideoTracks().forEach((track) => (track.enabled = isVideoOn));
		}
	}

	function toggleAudio() {
		isAudioOn = !isAudioOn;
		if (localStream) {
			localStream.getAudioTracks().forEach((track) => (track.enabled = isAudioOn));
		}
	}

	async function toggleScreenShare() {
		try {
			if (!isScreenSharing) {
				const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
				if (localVideoElement) {
					localVideoElement.srcObject = screenStream;
				}
				isScreenSharing = true;
				screenStream.getVideoTracks()[0].onended = () => {
					isScreenSharing = false;
					if (localVideoElement && localStream) {
						localVideoElement.srcObject = localStream;
					}
				};
			} else {
				isScreenSharing = false;
				if (localVideoElement && localStream) {
					localVideoElement.srcObject = localStream;
				}
			}
		} catch {}
	}

	// Chat
	async function loadMessages() {
		try {
			const res = await fetch(`/api/v4/lms/live/sessions/${sessionId}/messages`);
			if (res.ok) {
				const data = await res.json();
				messages = data.items || [];
			}
		} catch {}
	}

	async function sendMessage(e: SubmitEvent) {
		e.preventDefault();
		if (!chatInput.trim()) return;

		const user = appState.user || {
			id: 'guest',
			display_name: 'Học viên',
			role: 'student'
		};

		try {
			const res = await fetch(`/api/v4/lms/live/sessions/${sessionId}/messages`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					sender_id: user.id,
					sender_name: user.display_name,
					sender_role: user.role,
					content: chatInput
				})
			});
			if (res.ok) {
				chatInput = '';
				loadMessages();
			}
		} catch {}
	}
</script>

<svelte:head>
	<title>Phòng học trực tiếp · {sessionId} · Học Vui</title>
</svelte:head>

<div class="flex h-screen flex-col overflow-hidden bg-zinc-950 text-white">
	<!-- TOP CLASSROOM BAR -->
	<header
		class="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900/95 px-4"
	>
		<div class="flex items-center gap-3">
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white"
			>
				<span class="size-2 animate-pulse rounded-full bg-white"></span> Đang học trực tiếp
			</span>
			<h1 class="text-sm font-bold text-zinc-100 sm:text-base">
				Buổi học: <span class="text-blue-400">{sessionId}</span>
			</h1>
			{#if isRecording}
				<span
					class="inline-flex items-center gap-1 rounded-md bg-red-500/20 px-2 py-0.5 text-[11px] font-bold text-red-400"
				>
					<CircleDot class="size-3 animate-ping" /> Đang ghi hình
				</span>
			{/if}
		</div>

		<!-- Stage Switcher Tabs -->
		<div class="flex items-center gap-1.5">
			<button
				type="button"
				onclick={() => (activeView = 'whiteboard')}
				class="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all {activeView ===
				'whiteboard'
					? 'bg-blue-600 text-white'
					: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
			>
				Bảng trắng
			</button>
			<button
				type="button"
				onclick={() => (activeView = 'quiz')}
				class="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all {activeView ===
				'quiz'
					? 'bg-blue-600 text-white'
					: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
			>
				Câu đố
			</button>
			<button
				type="button"
				onclick={() => (activeView = 'grid')}
				class="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all {activeView ===
				'grid'
					? 'bg-blue-600 text-white'
					: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
			>
				Người tham gia (3)
			</button>
		</div>
	</header>

	<!-- MAIN WORKSPACE -->
	<div class="flex flex-1 overflow-hidden">
		<!-- STAGE AREA -->
		<div class="relative flex flex-1 flex-col overflow-hidden bg-zinc-900">
			{#if activeView === 'whiteboard'}
				<!-- WHITEBOARD TOOLBAR -->
				<div
					class="flex h-12 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900 px-3 text-xs"
				>
					<div class="flex items-center gap-1">
						<button
							type="button"
							onclick={() => (currentTool = 'pencil')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'pencil'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Bút (P)"
						>
							<Pencil class="size-4" />
						</button>
						<button
							type="button"
							onclick={() => (currentTool = 'highlighter')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'highlighter'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Bút dạ quang (M)"
						>
							<Highlighter class="size-4" />
						</button>
						<button
							type="button"
							onclick={() => (currentTool = 'line')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'line'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Đường thẳng (L)"
						>
							<Minus class="size-4" />
						</button>
						<button
							type="button"
							onclick={() => (currentTool = 'arrow')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'arrow'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Mũi tên (A)"
						>
							<MoveUpRight class="size-4" />
						</button>
						<button
							type="button"
							onclick={() => (currentTool = 'rect')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'rect'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Hình chữ nhật (R)"
						>
							<Square class="size-4" />
						</button>
						<button
							type="button"
							onclick={() => (currentTool = 'circle')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'circle'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Hình elip (O)"
						>
							<Circle class="size-4" />
						</button>
						<button
							type="button"
							onclick={() => (currentTool = 'eraser')}
							class="cursor-pointer rounded-lg p-1.5 {currentTool === 'eraser'
								? 'bg-blue-600 text-white'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title="Tẩy (E)"
						>
							<Eraser class="size-4" />
						</button>

						<div class="mx-1 h-4 w-px bg-zinc-800"></div>

						<!-- STEM Tools: 2D Graph, 3D Solid, Physics -->
						<button
							type="button"
							onclick={() => insertMathGraph('parabola')}
							class="cursor-pointer flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-700"
							title="Vẽ đồ thị hàm số Parabol y = x²"
						>
							<Activity class="size-3.5 text-blue-400" /> Đồ thị 2D
						</button>
						<button
							type="button"
							onclick={insert3DPyramid}
							class="cursor-pointer flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-700"
							title="Vẽ hình chóp tứ giác 3D (có nét đứt)"
						>
							<Box class="size-3.5 text-amber-400" /> Hình 3D
						</button>
						<button
							type="button"
							onclick={insertPhysicsSpring}
							class="cursor-pointer flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-700"
							title="Vẽ con lắc lò xo Vật lý"
						>
							<Zap class="size-3.5 text-green-400" /> Vật lý
						</button>

						<div class="mx-1 h-4 w-px bg-zinc-800"></div>

						<!-- Color Picker -->
						<div class="flex items-center gap-1.5">
							{#each ['#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', '#09090b'] as color}
								<button
									type="button"
									aria-label="Chọn màu {color}"
									onclick={() => (strokeColor = color)}
									style="background-color: {color};"
									class="size-4.5 cursor-pointer rounded-full border border-zinc-600 transition-transform {strokeColor ===
									color
										? 'scale-125 ring-2 ring-white'
										: ''}"
								></button>
							{/each}
						</div>
					</div>

					<!-- Right Whiteboard Controls: Undo, Slides, Lock, Clear -->
					<div class="flex items-center gap-1.5">
						{#if saveStatus}
							<span class="text-[11px] font-semibold text-green-400">{saveStatus}</span>
						{/if}

						<!-- Slide pagination -->
						<div class="flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1">
							<button
								type="button"
								onclick={() => switchSlide(currentPageIndex - 1)}
								disabled={currentPageIndex === 0}
								class="cursor-pointer disabled:opacity-40"
								title="Trang trước"
							>
								<ChevronLeft class="size-3.5" />
							</button>
							<span class="px-1 text-[11px] font-bold">
								Trang {currentPageIndex + 1}/{pages.length}
							</span>
							<button
								type="button"
								onclick={() => switchSlide(currentPageIndex + 1)}
								disabled={currentPageIndex === pages.length - 1}
								class="cursor-pointer disabled:opacity-40"
								title="Trang sau"
							>
								<ChevronRight class="size-3.5" />
							</button>
							<button
								type="button"
								onclick={addNewSlide}
								class="ml-1 cursor-pointer rounded bg-blue-600 p-0.5 text-white hover:bg-blue-500"
								title="Thêm trang mới"
							>
								<Plus class="size-3" />
							</button>
						</div>

						<button
							type="button"
							onclick={undoLastStroke}
							class="cursor-pointer rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
							title="Hoàn tác"
						>
							<Undo2 class="size-4" />
						</button>

						<button
							type="button"
							onclick={() => (boardLockedForStudents = !boardLockedForStudents)}
							class="cursor-pointer rounded-lg p-1.5 {boardLockedForStudents
								? 'bg-amber-500/20 text-amber-400'
								: 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
							title={boardLockedForStudents
								? 'Mở khóa bảng cho học viên'
								: 'Khóa bảng với học viên'}
						>
							{#if boardLockedForStudents}
								<Lock class="size-4" />
							{:else}
								<Unlock class="size-4" />
							{/if}
						</button>

						<button
							type="button"
							onclick={clearCanvas}
							class="cursor-pointer rounded-lg p-1.5 text-red-400 hover:bg-red-500/20"
							title="Xóa trang"
						>
							<Trash2 class="size-4" />
						</button>
					</div>
				</div>

				<!-- CANVAS WORKSPACE -->
				<div class="relative flex-1 cursor-crosshair overflow-hidden bg-white">
					<canvas
						bind:this={canvasElement}
						onmousedown={handleMouseDown}
						onmousemove={handleMouseMove}
						onmouseup={handleMouseUp}
						class="absolute inset-0 size-full"
					></canvas>

					<!-- FLOATING TEACHER VIDEO THUMBNAIL -->
					<div
						class=" absolute right-4 bottom-4 z-10 aspect-video w-44 overflow-hidden rounded-xl border-2 border-blue-500 bg-zinc-950 shadow-2xl"
					>
						<video
							bind:this={localVideoElement}
							autoplay
							playsinline
							muted
							class="size-full object-cover {isVideoOn ? '' : 'hidden'}"
						></video>
						{#if !isVideoOn}
							<div class="flex size-full items-center justify-center text-xs text-zinc-500">
								Đã tắt camera
							</div>
						{/if}
						<div
							class="absolute bottom-1 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white"
						>
							Bạn (Trực tiếp)
						</div>
					</div>
				</div>
			{:else if activeView === 'quiz'}
				<!-- LIVE QUIZ STAGE -->
				<div class="flex flex-1 items-center justify-center bg-zinc-950 p-6">
					<div class="w-full max-w-xl space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
						<div class="flex items-center justify-between">
							<span class="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-400">
								Câu đố trực tiếp trên lớp
							</span>
							<span class="text-xs text-zinc-400">Câu 1 / 1</span>
						</div>
						<h2 class="text-lg font-bold text-white">{activeQuizQuestion.prompt}</h2>
						<div class="grid gap-3">
							{#each activeQuizQuestion.options as opt, idx}
								<button
									type="button"
									onclick={() => (activeQuizQuestion.selected = idx)}
									class="cursor-pointer rounded-xl border p-4 text-left text-sm font-semibold transition-all {activeQuizQuestion.selected ===
									idx
										? 'border-blue-500 bg-blue-600/20 text-white'
										: 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'}"
								>
									{String.fromCharCode(65 + idx)}. {opt}
								</button>
							{/each}
						</div>
						{#if activeQuizQuestion.submitted}
							<p class="text-sm font-bold text-green-400">
								✓ Đã nộp đáp án! Đáp án đúng là A: I(2; -1).
							</p>
						{:else}
							<button
								type="button"
								disabled={activeQuizQuestion.selected === -1}
								onclick={() => (activeQuizQuestion.submitted = true)}
								class="w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-40"
							>
								Gửi câu trả lời
							</button>
						{/if}
					</div>
				</div>
			{:else}
				<!-- VIDEO TILES VIEW -->
				<div class="grid flex-1 grid-cols-2 gap-4 bg-zinc-950 p-6 md:grid-cols-3">
					<div
						class="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg"
					>
						<video
							bind:this={localVideoElement}
							autoplay
							playsinline
							muted
							class="size-full object-cover {isVideoOn ? '' : 'hidden'}"
						></video>
						{#if !isVideoOn}
							<div
								class="flex size-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold"
							>
								Bạn
							</div>
						{/if}
						<span
							class="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs font-semibold text-white"
						>
							Bạn (Giáo viên)
						</span>
					</div>

					<div
						class="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-amber-600 to-orange-700 shadow-lg"
					>
						<div
							class="flex size-16 items-center justify-center rounded-full bg-black/30 text-xl font-bold"
						>
							MA
						</div>
						<span
							class="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs font-semibold text-white"
						>
							Minh Anh · Học viên
						</span>
					</div>

					<div
						class="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-emerald-600 to-teal-700 shadow-lg"
					>
						<div
							class="flex size-16 items-center justify-center rounded-full bg-black/30 text-xl font-bold"
						>
							BL
						</div>
						<span
							class="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs font-semibold text-white"
						>
							Bảo Long · Học viên
						</span>
					</div>
				</div>
			{/if}

			<!-- BOTTOM CONTROL BAR -->
			<div
				class="flex h-16 shrink-0 items-center justify-center gap-3 border-t border-zinc-800 bg-zinc-950 px-6"
			>
				<button
					type="button"
					onclick={toggleAudio}
					class="flex size-11 cursor-pointer items-center justify-center rounded-full transition-all {isAudioOn
						? 'bg-zinc-800 text-white hover:bg-zinc-700'
						: 'bg-red-600 text-white'}"
					title={isAudioOn ? 'Tắt micro' : 'Bật micro'}
				>
					{#if isAudioOn}
						<Mic class="size-5" />
					{:else}
						<MicOff class="size-5" />
					{/if}
				</button>

				<button
					type="button"
					onclick={toggleVideo}
					class="flex size-11 cursor-pointer items-center justify-center rounded-full transition-all {isVideoOn
						? 'bg-zinc-800 text-white hover:bg-zinc-700'
						: 'bg-red-600 text-white'}"
					title={isVideoOn ? 'Tắt camera' : 'Bật camera'}
				>
					{#if isVideoOn}
						<Video class="size-5" />
					{:else}
						<VideoOff class="size-5" />
					{/if}
				</button>

				<button
					type="button"
					onclick={toggleScreenShare}
					class="flex size-11 cursor-pointer items-center justify-center rounded-full transition-all {isScreenSharing
						? 'bg-green-600 text-white'
						: 'bg-zinc-800 text-white hover:bg-zinc-700'}"
					title="Chia sẻ màn hình"
				>
					<MonitorUp class="size-5" />
				</button>

				<button
					type="button"
					onclick={() => (isRecording = !isRecording)}
					class="cursor-pointer rounded-full px-3.5 py-2 text-xs font-bold transition-all {isRecording
						? 'bg-red-600/20 text-red-400 border border-red-500/40'
						: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}"
				>
					{isRecording ? 'Dừng ghi hình' : 'Ghi hình'}
				</button>

				<a
					href="/app"
					class="ml-3 cursor-pointer rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-red-700"
				>
					Rời phòng
				</a>
			</div>
		</div>

		<!-- RIGHT SIDEBAR: REALTIME CHAT -->
		<aside class="flex w-80 shrink-0 flex-col border-l border-zinc-800 bg-zinc-900">
			<div
				class="flex h-12 items-center gap-2 border-b border-zinc-800 px-4 text-xs font-bold text-zinc-200"
			>
				<MessagesSquare class="size-4 text-blue-400" />
				<span>Trò chuyện</span>
			</div>

			<div class="flex-1 space-y-3 overflow-y-auto p-3">
				{#each messages as msg}
					<div class="space-y-1 text-xs">
						<div class="flex items-center gap-1.5">
							<span class="font-bold text-zinc-200">{msg.sender_name}</span>
							<span
								class="rounded px-1 text-[10px] {msg.sender_role === 'teacher'
									? 'bg-blue-600/30 text-blue-400'
									: 'bg-zinc-800 text-zinc-400'}"
							>
								{msg.sender_role === 'teacher' ? 'Giáo viên' : 'Học viên'}
							</span>
						</div>
						<div class="rounded-xl bg-zinc-800 p-2.5 leading-relaxed break-words text-zinc-300">
							{msg.content}
						</div>
					</div>
				{/each}
			</div>

			<form onsubmit={sendMessage} class="flex gap-2 border-t border-zinc-800 p-3">
				<input
					type="text"
					bind:value={chatInput}
					placeholder="Nhắn tin cho lớp..."
					class="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<button
					type="submit"
					aria-label="Gửi tin nhắn"
					class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700"
				>
					<Send class="size-3.5" />
				</button>
			</form>
		</aside>
	</div>
</div>
