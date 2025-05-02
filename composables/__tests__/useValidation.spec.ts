import { describe, expect, it } from 'vitest';

describe('useValidation', () => {
    const { isValidEmail, isValidPassword } = useValidation();

    it('validates a correct email', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
    });

    it('rejects an invalid email', () => {
        expect(isValidEmail('test@example')).toBe(false);
    });

    it('reject password of length 8 or more', () => {
        expect(isValidPassword('123456789')).toBe(false);
    });

    it('rejects password of length 8 or more, no lower case', () => {
        expect(isValidPassword('123!A234')).toBe(false);
    });

    it('accepts password', () => {
        expect(isValidPassword('123!@Aa123g')).toBe(true);
    });
});
