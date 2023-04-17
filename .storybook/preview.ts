import type { Preview } from "@storybook/vue3";

import "uno.css";
import '../node_modules/vitepress-shopware-docs/src/shopware/styles/_index.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
