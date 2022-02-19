const path = {
  main: "/vscode/basicTools/",
  markdown: "/vscode/basicTools/markdown/",
  powershell: "/vscode/basicTools/powershell/",
};

const sidebar = [
  {
    text: "Markdown",
    link: `${path.main}markdown`,
    collapsable: true,
    children: [
      {
        text: "基本标记",
        link: `${path.markdown}basic`,
      },
    ],
  },
  {
    text: "Git",
    link: `${path.main}git`,
  },
  {
    text: "Pnpm",
    link: `${path.main}pnpm`,
  },
  {
    text: "ESLint",
    link: `${path.main}eslint`,
  },
  {
    text: "Prettier",
    link: `${path.main}prettier`,
  },
  {
    text: "EditorConfig",
    link: `${path.main}editorconfig`,
  },
  {
    text: "PowerShell",
    link: `${path.main}powershell`,
    children: [
      {
        text: "Git 项目批量操作",
        link: `${path.powershell}git-batch`,
      },
    ],
  },
];

export default sidebar;
