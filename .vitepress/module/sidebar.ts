import sidebarHome from "./sidebar/home";
import sidebarQydocs from "./sidebar/qydocs";
import sidebarWangdocs from "./sidebar/wangdocs";

const sidebar = {
  "/qydocs/": [...sidebarQydocs],
  "/wangdocs/": [...sidebarWangdocs],
  "/": [...sidebarHome],
};

export default sidebar;
