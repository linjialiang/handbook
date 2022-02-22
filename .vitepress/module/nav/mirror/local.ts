// 本地镜像文档
import siteInfo from "./main";

const domain = "docs.com";

let mirror = [];

for (const key in siteInfo) {
  const obj = {
    text: "",
    link: "",
  };
  if (Object.prototype.hasOwnProperty.call(siteInfo, key)) {
    const element = siteInfo[key];
    obj.text = key;
    obj.link = `http://${element}.${domain}`;
  }
  mirror.push(obj);
}

export default mirror;
