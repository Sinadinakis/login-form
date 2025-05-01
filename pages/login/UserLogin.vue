<template>
    <provet-card class="flex justify-center max-w-5xl mx-auto">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-4 sm:gap-2">
                <provet-input
                    v-model="email"
                    id="email"
                    type="email"
                    label="Email"
                />
                <div class="flex flex-col gap-4 sm:gap-2">
                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-2">
                        <provet-input
                            v-model="password"
                            id="password"
                            :type="showPassword ? 'text' : 'password'"
                            label="Password"
                            @click="togglePassword"
                        />
                    </div>
                </div>
                <provet-button
                    variant="primary"
                    @click="handleSubmit"
                >
                    <provet-spinner v-if="loading" size="xl"></provet-spinner>
                    <span v-else>Sign Up</span>
                </provet-button>
            </div>
        </form>
    </provet-card>
</template>

<script lang="ts" setup>
    import '@provetcloud/css';

    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const submitted = ref(false);
    const loading = ref(false);

    function togglePassword() {
        showPassword.value = !showPassword.value;
    }

    async function handleSubmit() {
        submitted.value = true;

        loading.value = true;
        await router.push('/success');
    }
</script>