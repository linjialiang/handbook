import navQydocs from "./nav/qydocs";
import navWangdocs from "./nav/wangdocs";
import relateLinks from "./relateLinks";

const nav = [
  {
    text: "qydocs",
    link: "/qydocs/",
    items: [...navQydocs],
    activeMatch: "^/qydocs/",
  },
  {
    text: "wangdocs",
    link: "/wangdocs/",
    items: [...navWangdocs],
    activeMatch: "^/wangdocs/",
  },
  {
    text: "相关链接",
    items: [...relateLinks],
  },
  {
    text: "更新日志",
    link: "/CHANGELOG",
  },
];

export default nav;
