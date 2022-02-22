const prefixList = {
  "vite-docs-cn": "vite",
  "vue3-doc": "vue3",
  "vue3-router": "vue3-router",
  pinia: "pinia",
  "vue-devtools": "vue-devtools",
  vitepress: "vitepress",
  "axios-docs": "axios",
  "vxe-table-docs": "vxe-table",
  "element-plus": "element-plus",
  "pure-admin-doc": "pure-admin",
};

const creatMirros = (domain: string, mirror: object[]): void => {
  for (const key in prefixList) {
    const obj = {
      text: "",
      link: "",
    };
    if (Object.prototype.hasOwnProperty.call(prefixList, key)) {
      const element = prefixList[key];
      obj.text = key;
      obj.link = `http://${element}.${domain}`;
    }
    mirror.push(obj);
  }
};

export default creatMirros;
