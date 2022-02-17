import relateLinks from "./relateLinks";

const zh = [
  {
    text: "教程",
    link: "/guide/"
  },
  {
    text: "API 参考",
    link: "/api/"
  },
  {
    text: "相关链接",
    items: [...relateLinks]
  },
  {
    text: "更新日志",
    link: "/CHANGELOG.html"
  }
];

const en = [];

export { zh, en };
