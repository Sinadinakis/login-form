<template>

    <provet-banner
        v-if="email?.length > 3 && !debouncedEmailValid"
        shadow
        variant="warning"
    >
        - Starts with valid characters <br/>
        - Includes an @ <br/>
        - Has a valid domain and TLD (e.g., example.com)
    </provet-banner>
    <provet-banner
        v-else-if="password?.length > 3 && !debouncedPasswordValid"
        shadow
        variant="warning"
    >
        - Minimum 8 characters <br/>
        - At least one uppercase letter <br/>
        - At least one lowercase letter <br/>
        - At least one number <br/>
        - At least one special character
    </provet-banner>
    <provet-banner
        v-else-if="errorMessage.length > 0"
        shadow
        variant="danger"
    >
       {{ errorMessage }}
    </provet-banner>
</template>

<script setup lang="ts">
    import { useValidation } from '~/composables/useValidation';

    const { isValidEmail, isValidPassword } = useValidation();

    const props = withDefaults(defineProps<{
        email: string,
        password: string,
        errorMessage: string,
    }>(), {
        email: '',
        password: '',
        errorMessage: ''
    });
    const { email, password } = toRefs(props); // Now these are reactive and updated if parent changes

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