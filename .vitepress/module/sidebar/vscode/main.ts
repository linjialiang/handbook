import basicTools from "./basicTools";

const path = {
  main: "/vscode/",
  basicTools: "/vscode/basicTools/",
};

const sidebar = [
  {
    text: "简介",
    link: path.main,
  },
  {
    text: "基础工具",
    link: `${path.basicTools}`,
    children: [...basicTools],
  },
];

export default sidebar;
