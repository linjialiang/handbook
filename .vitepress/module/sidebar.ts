import debian from "./sidebar/debian/main";
import index from "./sidebar/index";
import vscode from "./sidebar/vscode/main";

const sidebar = {
  "/debian/": [...debian],
  "/vscode/": [...vscode],
  "/": [...index],
};

export default sidebar;
