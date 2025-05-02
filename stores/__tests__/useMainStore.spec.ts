import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMainStore } from '@/stores/main.store';

describe('useMainStore', () => {
    // ini pinia
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
    });

    it('init store with default values', () => {
        const store = useMainStore();
        expect(store.email).toBe('');
        expect(store.password).toBe('');
        expect(store.subscribe).toBe(false);
        expect(store.isLoggedIn).toBe(false);
        expect(store.isLogout).toBe(false);
    });

    it('setUserData sets state and stores to localStorage', () => {
        const store = useMainStore();
        store.setUserData('test@example.com', 'test_password', true);

        expect(store.email).toBe('test@example.com');
        expect(store.password).toBe('test_password');
        expect(store.subscribe).toBe(true);
        expect(store.isLoggedIn).toBe(true);

        const stored = JSON.parse(localStorage.getItem('user')!);
        expect(stored.email).toBe('test@example.com');
        expect(stored.password).toBe('secret');
        expect(stored.subscribe).toBe(true);
    });

    it('loadFromStorage restores user from localStorage', () => {
        localStorage.setItem('user', JSON.stringify({
            email: 'test@example.com',
            password: 'test_password',
            subscribe: true,
        }));

        const store = useMainStore();
        store.loadFromStorage();

        expect(store.email).toBe('test@example.com');
        expect(store.password).toBe('test_password');
        expect(store.subscribe).toBe(true);
        expect(store.isLoggedIn).toBe(true);
    });

    it('reset clears state and removes localStorage data', () => {
        const store = useMainStore();
        store.setUserData('reset@example.com', 'reset_password', false);

        store.reset();

        expect(store.email).toBe('');
        expect(store.password).toBe('');
        expect(store.subscribe).toBe(false);
        expect(store.isLoggedIn).toBe(false);
        expect(store.isLogout).toBe(true);
        expect(localStorage.getItem('user')).toBeNull();
    });
});
