<template>

    <provet-banner
        v-if="email.length > 3 && !debouncedEmailValid"
        shadow
        variant="warning"
    >
        Please enter a valid email
    </provet-banner>
    <provet-banner
        v-else-if="password.length > 3 && !debouncedPasswordValid"
        shadow
        variant="warning"
    >
        Provide valid password
    </provet-banner>
</template>

<script setup lang="ts">
    import { useValidation } from '~/composables/useValidation';

    const { isValidEmail, isValidPassword } = useValidation();

    const props = withDefaults(defineProps<{
        email: string,
        password: string,
    }>(), {
        email: '',
        password: ''
    });
    const { email, password } = toRefs(props); // Now these are reactive and updated if parent changes
    const emailTouched = ref(false);
    const passwordTouched = ref(false);

    const emit = defineEmits<{ (e: 'debounced-email', v: any): void, (e: 'debounced-password', v: any): void }>();

    const debouncedPasswordValid = ref(false);
    const debouncedEmailValid = ref(false);

    const debouncedEmail = useDebounce(email, 300);
    const debouncedPassword = useDebounce(password, 300);

    watch(debouncedEmail, (val) => {
        debouncedEmailValid.value = isValidEmail(val as string);
        emit('debounced-email', debouncedEmailValid.value);
    });

    watch(debouncedPassword, (val) => {
        debouncedPasswordValid.value = isValidPassword(val as string);
        emit('debounced-password', debouncedPasswordValid.value);
    });
</script>

<style scoped>

</style>