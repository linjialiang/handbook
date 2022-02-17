import { defineConfig, UserConfig } from "vitepress";
import locales from "./module/base/locale";
import * as nav from "./module/base/nav";
import sidebarEn from "./module/base/sidebar/en";
import sidebarZh from "./module/base/sidebar/zh";

const head: UserConfig["head"] = [
  ["link", { rel: "icon", href: `/favicon.ico` }],
];

export default defineConfig({
  lang: "zh-CN",
  title: "学习手册",
  description:
    "码上故事系统开发手册是开发人员内部手册，可以让新人快速进入开发以及方便后期维护工作",
  head,

  locales: locales,

  themeConfig: {
    // Type is `DefaultTheme.Config`
    locales: {
      // 简体中文
      "/": {
        label: "中文",
        selectText: "选择语言",
        nav: [...nav.zh],
        sidebar: [...sidebarZh],
      },
      // English
      "/en/": {
        label: "English",
        selectText: "Languages",
        nav: [...nav.en],
        sidebar: [...sidebarEn],
      },
    },
  },
});
