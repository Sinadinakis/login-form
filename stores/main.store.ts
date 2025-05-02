export const useMainStore = defineStore('main', () => {
    const email = ref<string>('');
    const password = ref<string>('');
    const subscribe = ref<boolean>(false);
    const isLoggedIn = ref<boolean>(false);
    const isLogout = ref<boolean>(false);
    const setUserData = (newEmail: string, newPassword: string, newSubscribe: boolean) => {
        email.value = newEmail;
        password.value = newPassword;
        subscribe.value = newSubscribe;
        isLoggedIn.value = true;
        localStorage.setItem('user', JSON.stringify({ email: newEmail, password: newPassword, subscribe: newSubscribe }));
    }

    const loadFromStorage = () => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const { email: storedEmail, password: storedPassword, subscribe: storedSubscribe } = JSON.parse(stored);
            setUserData(storedEmail, storedPassword, storedSubscribe);
        }
    }

    const reset = () => {
        email.value = '';
        password.value = '';
        subscribe.value = false;
        isLoggedIn.value = false;
        isLogout.value = true;
        localStorage.removeItem('user');
    }

    return {
        email,
        password,
        subscribe,
        isLoggedIn,
        isLogout,
        setUserData,
        loadFromStorage,
        reset,
    };
});

// HMR: Edit your stores and interact with them directly in your app without reloading the page
if (import.meta?.hot)
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
