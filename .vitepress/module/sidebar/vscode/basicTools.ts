const path = {
  main: "/vscode/basicTools/",
  makrdown: "/vscode/basicTools/makrdown/",
};

const sidebar = [
  {
    text: "Markdown",
    link: `${path.main}markdown`,
    children: [
      {
        text: "基本标记",
        link: `${path.makrdown}basic`,
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
];

export default sidebar;
