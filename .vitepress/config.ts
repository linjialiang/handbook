import { defineConfig } from "vitepress";
import nav from "./module/nav";
import * as settings from "./module/settings";
import sidebar from "./module/sidebar";

export default defineConfig({
  ...settings.basicConfig,

  themeConfig: {
    repo: "https://gitee.com/linjialiang/handbook",
    docsDir: "",
    docsBranch: "main",
    editLinks: true,
    editLinkText: "在 Gitee 上编辑此页面",
    lastUpdated: "最后更新",

    nav: [...nav],
    sidebar: sidebar,
  },
});
