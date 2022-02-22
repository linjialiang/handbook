// 服务器镜像文档
import creatMirros from "./main";

const domain = "docs.e8so.com";

const mirror: object[] = [];

creatMirros(domain, mirror);

export default mirror;
