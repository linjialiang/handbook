import { defineConfig, UserConfig } from "vitepress";
import * as nav from "./module/base/nav";
import sidebarZh from "./module/base/sidebar/zh";

const head: UserConfig["head"] = [
  ["link", { rel: "icon", href: `/favicon.ico` }],
];

export default defineConfig({
  base: "/",
  lang: "zh-CN",
  title: "学习手册",
  description: "学习手册包括网上收集的以及自己独立撰写的文档",
  head,
  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    repo: "linjialiang/handbook",
    docsDir: "",
    docsBranch: "main",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [...nav.zh],
    sidebar: [...sidebarZh],
  },
});
