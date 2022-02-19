import navQydocs from "./nav/qydocs";
import relateLinks from "./nav/relateLinks";

const nav = [
  {
    text: "qydocs",
    link: "/qydocs/",
    items: [...navQydocs],
    activeMatch: "^/qydocs/",
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
