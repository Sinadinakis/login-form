export const useMainStore = defineStore('user', () => {
    const email = ref('');
    const password = ref('');
    const subscribe = ref(false);
    const isLoggedIn = ref(false);

    function setUserData(newEmail: string, newPassword: string, newSubscribe: boolean) {
        email.value = newEmail;
        password.value = newPassword;
        subscribe.value = newSubscribe;
        isLoggedIn.value = true;
    }

    function reset() {
        email.value = '';
        password.value = '';
        subscribe.value = false;
        isLoggedIn.value = false;
    }

    return {
        email,
        password,
        subscribe,
        isLoggedIn,
        setUserData,
        reset,
    };
});

// HMR: Edit your stores and interact with them directly in your app without reloading the page
if (import.meta?.hot)
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
