import mirrorLocal from "./nav/mirror/local";
import mirrorServer from "./nav/mirror/server";
import official from "./nav/official";
import qydocs from "./nav/qydocs";
import wangdocs from "./nav/wangdocs";

const nav = [
  {
    text: "勤易文档",
    items: [...qydocs],
  },
  {
    text: "网道文档",
    items: [...wangdocs],
  },
  {
    text: "服务器镜像",
    items: [...mirrorServer],
  },
  {
    text: "局域网镜像",
    items: [...mirrorLocal],
  },
  {
    text: "官方文档",
    items: [...official],
  },
  {
    text: "更新日志",
    link: "/CHANGELOG",
  },
];

export default nav;
