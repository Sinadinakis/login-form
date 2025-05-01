<template>
    <div>
        <div class="min-h-screen flex items-center justify-center bg-green-100">
            <div class="bg-white p-8 rounded shadow-md text-center">
                <h1 class="text-3xl font-bold text-green-700">Success!</h1>
                <p class="mt-4 text-gray-700">Thank you for signing up.</p>
                <provet-button
                    variant="primary"
                    @click="logout"
                >
                    Logout
                </provet-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const router = useRouter();

    function logout() {
        router.push('/');
    }
</script>