import qydocs from "./nav/qydocs";
import wangdocs from "./nav/wangdocs";
import vue3 from "./nav/vue3";

const nav = [
  {
    text: "勤易文档",
    link: "/",
    items: [...qydocs],
    // activeMatch: "^/",
  },
  {
    text: "网道文档",
    items: [...wangdocs],
  },
  {
    text: "vue3系列",
    items: [...vue3],
  },
  {
    text: "更新日志",
    link: "/CHANGELOG",
  },
];

export default nav;
