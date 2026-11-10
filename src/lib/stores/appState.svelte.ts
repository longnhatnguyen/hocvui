import { browser } from '$app/environment';

export interface UserSession {
	id: string;
	username: string;
	email: string;
	display_name: string;
	role: 'student' | 'teacher' | 'admin';
	avatar_url?: string;
	token?: string;
}

class AppState {
	theme = $state<'light' | 'dark'>('light');
	locale = $state<'vi' | 'en'>('vi');
	user = $state<UserSession | null>(null);
	mobileMenuOpen = $state(false);

	constructor() {
		if (browser) {
			const savedTheme = localStorage.getItem('lms-theme') as 'light' | 'dark' | null;
			if (savedTheme) {
				this.theme = savedTheme;
			} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this.theme = 'dark';
			}

			const savedUser = localStorage.getItem('hv_user');
			if (savedUser) {
				try {
					this.user = JSON.parse(savedUser);
				} catch {
					// ignore
				}
			}

			const savedLocale = localStorage.getItem('hv_locale') as 'vi' | 'en' | null;
			if (savedLocale) {
				this.locale = savedLocale;
			}
		}
	}

	toggleTheme() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		if (browser) {
			localStorage.setItem('lms-theme', this.theme);
			if (this.theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}

	setLocale(loc: 'vi' | 'en') {
		this.locale = loc;
		if (browser) {
			localStorage.setItem('hv_locale', loc);
		}
	}

	setUser(user: UserSession | null) {
		this.user = user;
		if (browser) {
			if (user) {
				localStorage.setItem('hv_user', JSON.stringify(user));
			} else {
				localStorage.removeItem('hv_user');
			}
		}
	}

	logout() {
		this.setUser(null);
	}
}

export const appState = new AppState();
