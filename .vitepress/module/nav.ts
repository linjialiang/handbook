import qydocs from "./nav/qydocs";
import * as vue3 from "./nav/vue3";
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
    text: "镜像文档",
    items: [...vue3.mirror],
  },
  {
    text: "官方文档",
    items: [...vue3.official],
  },
  {
    text: "更新日志",
    link: "/CHANGELOG",
  },
];

export default nav;
