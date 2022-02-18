import sidebarHome from "./sidebar/home";
import sidebarQydocs from "./sidebar/qydocs";
import qydcosDebian from "./sidebar/qydocs/debian";
import qydocsVscode from "./sidebar/qydocs/vscode";
import sidebarWangdocs from "./sidebar/wangdocs";
import wangdocsBash from "./sidebar/wangdocs/bash";

const sidebar = {
  "/qydocs/debian/": [...qydcosDebian],
  "/qydocs/vscode/": [...qydocsVscode],
  "/qydocs/": [...sidebarQydocs],
  "/wangdocs/bash/": [...wangdocsBash],
  "/wangdocs/": [...sidebarWangdocs],
  "/": [...sidebarHome],
};

export default sidebar;
