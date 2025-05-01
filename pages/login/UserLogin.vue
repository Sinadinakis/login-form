<template>
    <provet-stack style="max-width: 340px; margin: var(--n-space-xl) auto">
        <Banner
            :email="email"
            :password="password"
            @debounced-email="(email: boolean) => debouncedEmailValid = email"
            @debounced-password="(password: boolean) => debouncedPasswordValid = password"
        />
        <provet-card padding="l">
            <h1 slot="header">Sign in to Nord</h1>
            <form action="#">
                <provet-stack>
                    <provet-input
                        v-model="email"
                        label="Username"
                        expand
                        required
                        hide-required
                        name="username"
                        type="email"
                        placeholder="user@example.com"
                    />
                    <provet-input
                        v-model="password"
                        label="Password"
                        expand
                        required
                        hide-required
                        name="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="••••••••"
                    />
                    <provet-button @click="togglePassword">Show Password</provet-button>
                    <provet-checkbox
                        v-model="subscribe"
                        type="checkbox"
                        label="Receive occasional product updates and announcements"
                    />
                    <provet-button
                        type="submit"
                        expand
                        variant="primary"
                        :disabled="!debouncedEmailValid || !debouncedPasswordValid || loading"
                        @click="handleSubmit"
                    >
                        <provet-spinner v-if="loading" size="xl"></provet-spinner>
                        <span v-else>Sign In</span>
                    </provet-button>
                </provet-stack>
            </form>
        </provet-card>
    </provet-stack>
</template>

<script lang="ts" setup>
    import '@provetcloud/css';
    import { useMainStore } from '~/stores/main.store';

    const router = useRouter();
    const mainStore = useMainStore();

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const submitted = ref(false);
    const toastMessage = ref('');
    const errorMessage = ref('');
    const subscribe = ref(false);
    const loading = ref(false);

    const debouncedEmailValid = ref(false);
    const debouncedPasswordValid = ref(false);

    function resetForm() {
        email.value = '';
        password.value = '';
        subscribe.value = false;
        submitted.value = false;
    }

    function togglePassword() {
        showPassword.value = !showPassword.value;
    }

    async function handleSubmit() {
        submitted.value = true;
        errorMessage.value = '';

        if (!debouncedEmailValid.value || !debouncedPasswordValid.value) return;

        loading.value = true;

        try {
            await new Promise((resolve, reject) => setTimeout(() => {
                if (email.value === 'fail@example.com')
                    reject(new Error('Mock server error'));
                else
                    resolve(true);
            }, 1500));
            console.log(email.value, password.value);
            mainStore.setUserData(email.value, password.value, subscribe.value);
            await router.push('/success');
        } catch (error: any) {
            errorMessage.value = error?.message || 'Something went wrong. Please try again.';
        } finally {
            loading.value = false;
        }
    }

    onMounted(() => {
        resetForm();
        if (mainStore.isLoggedIn) {
            router.push('/success');
        }
    });
</script>