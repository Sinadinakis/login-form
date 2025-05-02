<template>
	<provet-header>
		<h1 class="n-typescale-l">
			Dashboard
		</h1>
		<provet-button-group
			slot="end"
			variant="spaced"
		>
			<provet-button
				variant="default"
				@click="toggleTheme"
			>
				Toggle Theme
			</provet-button>
		</provet-button-group>
	</provet-header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

type Theme = 'light' | 'dark';
type TTheme = {
    [s: string]: string;
};
const theme = ref<Theme>('light');

const themeLinks: TTheme = {
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
};

const useTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    loadThemeCSS(themeLinks[newTheme]);
};

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
    useTheme(theme.value);
};

const isTheme = (value: string): value is Theme => {
    return value === 'light' || value === 'dark';
};

onMounted(() => {
    const storedTheme = localStorage.getItem('theme');
    theme.value = (storedTheme && isTheme(storedTheme)) ? storedTheme : 'light';
    useTheme(theme.value);
});
</script>
