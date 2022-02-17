import { defineConfig, UserConfig } from "vitepress";
import nav from "./module/nav";
import sidebar from "./module/sidebar";

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
