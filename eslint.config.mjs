// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    // Your custom configs here
    {
        rules: {
            'indent': ['error', 4],
            'vue/no-deprecated-slot-attribute': 'off',
            '@stylistic/indent': ['error', 4],
            '@typescript-eslint/unified-signatures': 'off',
        },
    },
);
