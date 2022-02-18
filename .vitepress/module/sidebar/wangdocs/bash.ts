const list1 = [
  {
    text: "简介",
    link: "/wangdocs/bash/intro",
    activeMatch: "^/wangdocs/bash/intro",
  },
  {
    text: "基本语法",
    link: "/wangdocs/bash/grammar",
    activeMatch: "^/wangdocs/bash/grammar",
  },
  {
    text: "模式扩展",
    link: "/wangdocs/bash/expansion",
    activeMatch: "^/wangdocs/bash/expansion",
  },
  {
    text: "引号和转义",
    link: "/wangdocs/bash/quotation",
    activeMatch: "^/wangdocs/bash/quotation",
  },
  {
    text: "变量",
    link: "/wangdocs/bash/variable",
    activeMatch: "^/wangdocs/bash/variable",
  },
  {
    text: "字符串操作",
    link: "/wangdocs/bash/string",
    activeMatch: "^/wangdocs/bash/string",
  },
  {
    text: "算术运算",
    link: "/wangdocs/bash/arithmetic",
    activeMatch: "^/wangdocs/bash/arithmetic",
  },
  {
    text: "行操作",
    link: "/wangdocs/bash/readline",
    activeMatch: "^/wangdocs/bash/readline",
  },
  {
    text: "目录堆栈",
    link: "/wangdocs/bash/stack",
    activeMatch: "^/wangdocs/bash/stack",
  },
  {
    text: "脚本入门",
    link: "/wangdocs/bash/script",
    activeMatch: "^/wangdocs/bash/script",
  },
  {
    text: "read 命令",
    link: "/wangdocs/bash/read",
    activeMatch: "^/wangdocs/bash/read",
  },
  {
    text: "条件判断",
    link: "/wangdocs/bash/condition",
    activeMatch: "^/wangdocs/bash/condition",
  },
  {
    text: "循环",
    link: "/wangdocs/bash/loop",
    activeMatch: "^/wangdocs/bash/loop",
  },
  {
    text: "函数",
    link: "/wangdocs/bash/function",
    activeMatch: "^/wangdocs/bash/function",
  },
  {
    text: "数组",
    link: "/wangdocs/bash/array",
    activeMatch: "^/wangdocs/bash/array",
  },
  {
    text: "set 命令，shopt 命令",
    link: "/wangdocs/bash/set",
    activeMatch: "^/wangdocs/bash/set",
  },
  {
    text: "脚本除错",
    link: "/wangdocs/bash/debug",
    activeMatch: "^/wangdocs/bash/debug",
  },
  {
    text: "mktemp 命令，trap 命令",
    link: "/wangdocs/bash/mktemp",
    activeMatch: "^/wangdocs/bash/mktemp",
  },
  {
    text: "启动环境",
    link: "/wangdocs/bash/startup",
    activeMatch: "^/wangdocs/bash/startup",
  },
  {
    text: "命令提示符",
    link: "/wangdocs/bash/prompt",
    activeMatch: "^/wangdocs/bash/prompt",
  },
  {
    text: "archives",
    activeMatch: "^/wangdocs/bash/archives/.*",
    children: [
      {
        text: "归档和备份",
        link: "/wangdocs/bash/archives/archiving",
        activeMatch: "^/wangdocs/bash/archives/archiving",
      },
      {
        text: "异步任务",
        link: "/wangdocs/bash/archives/async",
        activeMatch: "^/wangdocs/bash/archives/async",
      },
      {
        text: "Shell 的命令",
        link: "/wangdocs/bash/archives/command",
        activeMatch: "^/wangdocs/bash/archives/command",
      },
      {
        text: "commands",
        link: "/wangdocs/bash/archives/commands/",
        activeMatch: "^/wangdocs/bash/archives/commands/$",
        children: [
          {
            text: "alias",
            link: "/wangdocs/bash/archives/commands/alias",
            activeMatch: "^/wangdocs/bash/archives/commands/alias",
          },
          {
            text: "awk",
            link: "/wangdocs/bash/archives/commands/awk",
            activeMatch: "^/wangdocs/bash/archives/commands/awk",
          },
          {
            text: "cal",
            link: "/wangdocs/bash/archives/commands/cal",
            activeMatch: "^/wangdocs/bash/archives/commands/cal",
          },
          {
            text: "cat",
            link: "/wangdocs/bash/archives/commands/cat",
            activeMatch: "^/wangdocs/bash/archives/commands/cat",
          },
          {
            text: "clear",
            link: "/wangdocs/bash/archives/commands/clear",
            activeMatch: "^/wangdocs/bash/archives/commands/clear",
          },
          {
            text: "cp 命令",
            link: "/wangdocs/bash/archives/commands/cp",
            activeMatch: "^/wangdocs/bash/archives/commands/cp",
          },
          {
            text: "cut",
            link: "/wangdocs/bash/archives/commands/cut",
            activeMatch: "^/wangdocs/bash/archives/commands/cut",
          },
          {
            text: "date",
            link: "/wangdocs/bash/archives/commands/date",
            activeMatch: "^/wangdocs/bash/archives/commands/date",
          },
          {
            text: "dd",
            link: "/wangdocs/bash/archives/commands/dd",
            activeMatch: "^/wangdocs/bash/archives/commands/dd",
          },
          {
            text: "df",
            link: "/wangdocs/bash/archives/commands/df",
            activeMatch: "^/wangdocs/bash/archives/commands/df",
          },
          {
            text: "du",
            link: "/wangdocs/bash/archives/commands/du",
            activeMatch: "^/wangdocs/bash/archives/commands/du",
          },
          {
            text: "egrep",
            link: "/wangdocs/bash/archives/commands/egrep",
            activeMatch: "^/wangdocs/bash/archives/commands/egrep",
          },
          {
            text: "export",
            link: "/wangdocs/bash/archives/commands/export",
            activeMatch: "^/wangdocs/bash/archives/commands/export",
          },
          {
            text: "file",
            link: "/wangdocs/bash/archives/commands/file",
            activeMatch: "^/wangdocs/bash/archives/commands/file",
          },
          {
            text: "find",
            link: "/wangdocs/bash/archives/commands/find",
            activeMatch: "^/wangdocs/bash/archives/commands/find",
          },
          {
            text: "fmt",
            link: "/wangdocs/bash/archives/commands/fmt",
            activeMatch: "^/wangdocs/bash/archives/commands/fmt",
          },
          {
            text: "grep",
            link: "/wangdocs/bash/archives/commands/grep",
            activeMatch: "^/wangdocs/bash/archives/commands/grep",
          },
          {
            text: "gunzip",
            link: "/wangdocs/bash/archives/commands/gunzip",
            activeMatch: "^/wangdocs/bash/archives/commands/gunzip",
          },
          {
            text: "gzcat",
            link: "/wangdocs/bash/archives/commands/gzcat",
            activeMatch: "^/wangdocs/bash/archives/commands/gzcat",
          },
          {
            text: "gzip",
            link: "/wangdocs/bash/archives/commands/gzip",
            activeMatch: "^/wangdocs/bash/archives/commands/gzip",
          },
          {
            text: "kill",
            link: "/wangdocs/bash/archives/commands/kill",
            activeMatch: "^/wangdocs/bash/archives/commands/kill",
          },
          {
            text: "killall",
            link: "/wangdocs/bash/archives/commands/killall",
            activeMatch: "^/wangdocs/bash/archives/commands/killall",
          },
          {
            text: "last",
            link: "/wangdocs/bash/archives/commands/last",
            activeMatch: "^/wangdocs/bash/archives/commands/last",
          },
          {
            text: "lpq",
            link: "/wangdocs/bash/archives/commands/lpq",
            activeMatch: "^/wangdocs/bash/archives/commands/lpq",
          },
          {
            text: "lpr",
            link: "/wangdocs/bash/archives/commands/lpr",
            activeMatch: "^/wangdocs/bash/archives/commands/lpr",
          },
          {
            text: "ls",
            link: "/wangdocs/bash/archives/commands/ls",
            activeMatch: "^/wangdocs/bash/archives/commands/ls",
          },
          {
            text: "nl",
            link: "/wangdocs/bash/archives/commands/nl",
            activeMatch: "^/wangdocs/bash/archives/commands/nl",
          },
          {
            text: "ps",
            link: "/wangdocs/bash/archives/commands/ps",
            activeMatch: "^/wangdocs/bash/archives/commands/ps",
          },
          {
            text: "scp",
            link: "/wangdocs/bash/archives/commands/scp",
            activeMatch: "^/wangdocs/bash/archives/commands/scp",
          },
          {
            text: "sed",
            link: "/wangdocs/bash/archives/commands/sed",
            activeMatch: "^/wangdocs/bash/archives/commands/sed",
          },
          {
            text: "sort",
            link: "/wangdocs/bash/archives/commands/sort",
            activeMatch: "^/wangdocs/bash/archives/commands/sort",
          },
          {
            text: "tr",
            link: "/wangdocs/bash/archives/commands/tr",
            activeMatch: "^/wangdocs/bash/archives/commands/tr",
          },
          {
            text: "uname",
            link: "/wangdocs/bash/archives/commands/uname",
            activeMatch: "^/wangdocs/bash/archives/commands/uname",
          },
          {
            text: "uniq",
            link: "/wangdocs/bash/archives/commands/uniq",
            activeMatch: "^/wangdocs/bash/archives/commands/uniq",
          },
          {
            text: "uptime",
            link: "/wangdocs/bash/archives/commands/uptime",
            activeMatch: "^/wangdocs/bash/archives/commands/uptime",
          },
          {
            text: "w",
            link: "/wangdocs/bash/archives/commands/w",
            activeMatch: "^/wangdocs/bash/archives/commands/w",
          },
          {
            text: "wc",
            link: "/wangdocs/bash/archives/commands/wc",
            activeMatch: "^/wangdocs/bash/archives/commands/wc",
          },
          {
            text: "whereis",
            link: "/wangdocs/bash/archives/commands/whereis",
            activeMatch: "^/wangdocs/bash/archives/commands/whereis",
          },
          {
            text: "which",
            link: "/wangdocs/bash/archives/commands/which",
            activeMatch: "^/wangdocs/bash/archives/commands/which",
          },
          {
            text: "who",
            link: "/wangdocs/bash/archives/commands/who",
            activeMatch: "^/wangdocs/bash/archives/commands/who",
          },
        ],
      },
      {
        text: "deleted",
        link: "/wangdocs/bash/archives/deleted/",
        activeMatch: "^/wangdocs/bash/archives/deleted/$",
        children: [
          {
            text: "标准I/O",
            link: "/wangdocs/bash/archives/deleted/stdio",
            activeMatch: "^/wangdocs/bash/archives/deleted/stdio",
          },
        ],
      },
      {
        text: "文件操作",
        link: "/wangdocs/bash/archives/file-operation",
        activeMatch: "^/wangdocs/bash/archives/file-operation",
      },
      {
        text: "文件系统",
        link: "/wangdocs/bash/archives/file",
        activeMatch: "^/wangdocs/bash/archives/file",
      },
      {
        text: "硬件操作",
        link: "/wangdocs/bash/archives/hardware",
        activeMatch: "^/wangdocs/bash/archives/hardware",
      },
      {
        text: "主机管理",
        link: "/wangdocs/bash/archives/host",
        activeMatch: "^/wangdocs/bash/archives/host",
      },
      {
        text: "命名管道",
        link: "/wangdocs/bash/archives/named-pipe",
        activeMatch: "^/wangdocs/bash/archives/named-pipe",
      },
      {
        text: "进程管理",
        link: "/wangdocs/bash/archives/process",
        activeMatch: "^/wangdocs/bash/archives/process",
      },
      {
        text: "重定向",
        link: "/wangdocs/bash/archives/redirection",
        activeMatch: "^/wangdocs/bash/archives/redirection",
      },
      {
        text: "正则表达式",
        link: "/wangdocs/bash/archives/regex",
        activeMatch: "^/wangdocs/bash/archives/regex",
      },
      {
        text: "系统信息",
        link: "/wangdocs/bash/archives/system",
        activeMatch: "^/wangdocs/bash/archives/system",
      },
      {
        text: "文本处理",
        link: "/wangdocs/bash/archives/text",
        activeMatch: "^/wangdocs/bash/archives/text",
      },
      {
        text: "时间管理",
        link: "/wangdocs/bash/archives/time",
        activeMatch: "^/wangdocs/bash/archives/time",
      },
      {
        text: "用户管理",
        link: "/wangdocs/bash/archives/user",
        activeMatch: "^/wangdocs/bash/archives/user",
      },
    ],
  },
];

const sidebar = [
  {
    text: "bash 教程",
    link: "/wangdocs/bash/",
    // children: [],
  },
  ...list1,
];

export default sidebar;
