<template>
    <provet-stack style="max-width: 340px; margin: var(--n-space-xl) auto">
        <Banner
            :email="email"
            :password="password"
            :error-message="errorMessage"
            @debounced-email="(email: boolean) => debouncedEmailValid = email"
            @debounced-password="(password: boolean) => debouncedPasswordValid = password"
        />
        <provet-card padding="l">
            <h1 slot="header">Sign in to Nord</h1>
            <form @submit.prevent="handleSubmit">
                <provet-stack>
                    <provet-input
                        v-model="email"
                        label="Email"
                        expand
                        required
                        hide-required
                        name="email"
                        type="email"
                        :error="(email.length > 3 && !debouncedEmailValid) ? 'Provide valid email' : ''"
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
                    >
                        <provet-button
                            type="button"
                            variant="default"
                            slot="end"
                        >
                            <provet-icon
                                size="s"
                                :name="`interface-edit-${showPassword ? 'on' : 'off'}`"
                            />
                        </provet-button>
                    </provet-input>
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
        <provet-toast-group>
            <provet-toast v-if="mainStore.isLogout" auto-dismiss="5000">Logout Successfully</provet-toast>
        </provet-toast-group>
    </provet-stack>
</template>

<script lang="ts" setup>
    import { useMainStore } from '~/stores/main.store';
    import { nextTick } from 'vue';

    const router = useRouter();
    const mainStore = useMainStore();

    const email = ref<string>('');
    const password = ref<string>('');
    const showPassword = ref<boolean>(false);
    const submitted = ref<boolean>(false);
    const errorMessage = ref<string>('');
    const subscribe = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const logout = ref<boolean>(false);

    const debouncedEmailValid = ref(false);
    const debouncedPasswordValid = ref(false);

    const resetForm = () => {
        email.value = '';
        password.value = '';
        subscribe.value = false;
        submitted.value = false;
    }

    const handleSubmit = async () => {
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
            mainStore.setUserData(email.value, password.value, subscribe.value);
            await router.push('/success');
        } catch (error: any) {
            console.error(error?.message);
            errorMessage.value = error?.message ?? 'Something went wrong. Please try again or try with a different account.';
        } finally {
            loading.value = false;
        }
    }

    onMounted( async () => {
        await nextTick();
        if(mainStore.isLogout) {
            logout.value = true;
        }
        resetForm();
        if (mainStore.isLoggedIn) {
            await router.push('/success');
        }
    });
</script>