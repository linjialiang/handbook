const path = {
  main: "/qydocs/vscode/",
  basicTools: "/qydocs/vscode/basicTools/",
};

const sidebar = [
  {
    text: "vscode 教程",
    link: path.main,
  },
  {
    text: "基础工具",
    link: `${path.basicTools}`,
    children: [
      {
        text: "Markdown 快速入门",
        link: `${path.basicTools}markdown`,
      },
    ],
  },
];

export default sidebar;
