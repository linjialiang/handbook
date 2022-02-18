import { UserConfig } from "vitepress";

const basicConfig = {
  base: "/",
  lang: "zh-CN",
  title: "学习手册",
  description: "学习手册包括网上收集的以及自己独立撰写的文档",
  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },
};

const heads: UserConfig["head"] = [
  ["link", { rel: "icon", href: `/favicon.ico` }],
];

export { basicConfig, heads };
