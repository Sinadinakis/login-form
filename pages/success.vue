<template>
	<div>
		<div class="min-h-screen flex items-center justify-center bg-green-100">
			<div class="flex flex-col justify-center items-center bg-white p-8 rounded shadow-md text-center gap-4 text-gray-700">
				<h1 class="text-3xl font-bold text-green-700">
					Success!
				</h1>
				<p>Thank you for signing up.</p>
				<p>Email: <span class="font-bold">{{ mainStore.email }}</span></p>
				<p>Subscribed:  <span class="font-bold">{{ mainStore.subscribe ? 'Yes' : 'No' }}</span></p>
				<provet-button
					variant="primary"
					@click="logout()"
				>
					Logout
				</provet-button>
			</div>
		</div>
		<provet-toast-group>
			<provet-toast auto-dismiss="5000">
				Login Successfully
			</provet-toast>
		</provet-toast-group>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '~/stores/main.store.js';

const mainStore = useMainStore();
const router = useRouter();

const logout = async () => {
    mainStore.reset();
    await router.push('/');
};
</script>
