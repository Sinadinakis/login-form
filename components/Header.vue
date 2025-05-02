<template>
    <provet-header>
        <h1 class="n-typescale-l">Dashboard</h1>
        <provet-button-group slot="end" variant="spaced">
            <provet-button variant="default" @click="toggleTheme">
                Toggle Theme
            </provet-button>
        </provet-button-group>
    </provet-header>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    const theme = ref<'light' | 'dark'>('light');

    const themeLinks = {
        light: 'https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet.css',
        dark: 'https://nordcdn.net/ds/provetcloud/themes/1.0.0/provet-dark.css',
    };

    const loadThemeCSS = (url: string) => {
        const existing = document.getElementById('theme-css');
        if (existing) existing.remove();

        const link = document.createElement('link');
        link.id = 'theme-css';
        link.rel = 'stylesheet';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    const useTheme = (newTheme: string) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        loadThemeCSS(themeLinks[newTheme]);
    }

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', theme.value);
        useTheme(theme.value);
    }

    onMounted(() => {
        theme.value = localStorage.getItem('theme') || 'light';;
        useTheme(theme.value);
    });
</script>