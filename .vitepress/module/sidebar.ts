import sidebarHome from "./sidebar/home";
import sidebarQydocs from "./sidebar/qydocs";
import qydcosDebian from "./sidebar/qydocs/debian";
import sidebarWangdocs from "./sidebar/wangdocs";

const sidebar = {
  "/qydocs/debian/": [...qydcosDebian],
  "/qydocs/": [...sidebarQydocs],
  "/wangdocs/": [...sidebarWangdocs],
  "/": [...sidebarHome],
};

export default sidebar;
