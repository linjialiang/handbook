import mirror from "./nav/mirror";
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
    text: "镜像文档",
    items: [...mirror],
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
