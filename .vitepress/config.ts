import { defineConfig } from "vitepress";
import nav from "./module/nav";
import * as settings from "./module/settings";
import sidebar from "./module/sidebar";

export default defineConfig({
  ...settings.basicConfig,

  themeConfig: {
    ...settings.basicThemeConfig,

    nav: [...nav],
    sidebar: { ...sidebar },
  },
});
