import type { StorybookConfig } from '@storybook/nextjs';
// import {Button} from '../src/app/'
const config: StorybookConfig = {
    // stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    // fe-wooden\src\stories\Button.stories.tsx
    stories: ['../src/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
