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
    text: "vue3英特网",
    items: [...vue3.internet],
  },
  {
    text: "vue3局域网",
    items: [...vue3.lan],
  },
  {
    text: "更新日志",
    link: "/CHANGELOG",
  },
];

export default nav;
