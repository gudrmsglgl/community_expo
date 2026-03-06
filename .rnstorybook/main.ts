import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: [
    '../app/**/*.stories.?(ts|tsx|js|jsx)',
    '../components/**/*.stories.?(ts|tsx|js|jsx)',
    './stories/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
};

export default main;
