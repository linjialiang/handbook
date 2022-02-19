import sidebarHome from "./sidebar/home";
import sidebarQydocs from "./sidebar/qydocs";
import qydcosDebian from "./sidebar/qydocs/debian";
import qydocsVscode from "./sidebar/qydocs/vscode";

const sidebar = {
  "/qydocs/debian/": [...qydcosDebian],
  "/qydocs/vscode/": [...qydocsVscode],
  "/qydocs/": [...sidebarQydocs],
  "/": [...sidebarHome],
};

export default sidebar;
