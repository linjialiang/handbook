import sidebarHome from "./sidebar/home";
import sidebarQydocs from "./sidebar/qydocs";
import sidebarWangdocs from "./sidebar/wangdocs";

const sidebar = {
  "/": [...sidebarHome],
  "/qydocs/": [...sidebarQydocs],
  "/wangdocs/": [...sidebarWangdocs],
};

export default sidebar;
