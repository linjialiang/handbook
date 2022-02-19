import { UserConfig } from "vitepress";

const basicConfig = {
  base: "/",
  lang: "zh-CN",
  title: "勤易文档",
  description:
    "勤易文档是一个开源的文档项目，主要面向 Web 开发人员,为初学者提供可快速掌握以应对工作所需的知识点",
  lastUpdated: true,

  markdown: {
    lineNumbers: true,
  },
};

const heads: UserConfig["head"] = [
  ["link", { rel: "icon", href: `/favicon.ico` }],
];

const basicThemeConfig = {
  repo: "https://gitee.com/linjialiang/handbook",
  docsDir: "/",
  docsBranch: "main",
  editLinks: true,
  editLinkText: "在 Gitee 上编辑此页面",
  lastUpdated: "最后更新",
};

export { basicConfig, heads, basicThemeConfig };
