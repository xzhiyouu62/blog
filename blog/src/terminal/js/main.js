let commandHistory = [];
let currentDirectory = "/home/xzhiyouu";
let fileSystem = {
  "/": {
    type: "directory",
    content: {
      home: {
        type: "directory",
        content: {
          xzhiyouu: {
            type: "directory",
            content: {
              "skills.txt": {
                type: "file",
                content: "- C++ \n- Python",
              },
              "about.txt": {
                type: "file",
                content: "Cybersecurity learner & CTF Player",
              },
              ".secret": {
                type: "file",
                content: "flag{w0w_y0u_f0und_7h3_h1dd3n_f1l3_1n_t3rminal}",
              },
            },
          },
        },
      },
    },
  },
};

let isInVim = false;
let vimContent = "";
let vimFileName = "";
let vimMode = "normal"; // 'normal' 或 'insert'

// 輔助函數：獲取指定路徑的目錄內容
function getDirectoryContent(path) {
  let current = fileSystem["/"];
  if (path === "/") return current;

  const parts = path.split("/").filter((p) => p);
  for (const part of parts) {
    if (!current.content[part]) return null;
    current = current.content[part];
  }
  return current;
}

const commands = {
  help: "可用指令：\nhelp\nls\npwd\nwhoami\ncat\necho\ndate\nuname\nhistory\nclear\nsudo\ncd\nmkdir\nfile\nrm\nrmdir\ntouch\nvim\nwget",
  pwd: () => currentDirectory,
  whoami: "xzhiyouu",
  date: () => new Date().toString(),
  uname: "Linux xzhiyouu 5.15.0-88-generic x86_64",
  echo: (args) => args.join(" "),
  sudo: () => "Sorry, user xzhiyouu is not allowed to execute this command.",
  file: (args) => {
    if (args.length === 0) return "file: missing operand";
    const fileName = args[0];
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "file: cannot access directory";

    const file = currentDir.content[fileName];
    if (!file)
      return `file: cannot access '${fileName}': No such file or directory`;

    if (file.type === "directory") return `${fileName}: directory`;
    if (file.type === "file") return `${fileName}: ASCII text`;
    return `${fileName}: cannot determine`;
  },
  cd: (args) => {
    if (args.length === 0) {
      currentDirectory = "/home/xzhiyouu";
      return "";
    }
    const path = args[0];
    if (path === "..") {
      if (currentDirectory === "/") return "Already at root";
      currentDirectory =
        currentDirectory.split("/").slice(0, -1).join("/") || "/";
      return "";
    }
    if (path === ".") return "";

    const newPath = path.startsWith("/") ? path : `${currentDirectory}/${path}`;
    const targetDir = getDirectoryContent(newPath);
    if (targetDir && targetDir.type === "directory") {
      currentDirectory = newPath;
      return "";
    }
    return `cd: ${path}: No such directory`;
  },
  mkdir: (args) => {
    if (args.length === 0) return "mkdir: missing operand";
    const dirName = args[0];

    // 獲取當前目錄的內容
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "mkdir: cannot create directory: Invalid path";

    if (currentDir.content[dirName]) {
      return `mkdir: cannot create directory '${dirName}': File exists`;
    }

    currentDir.content[dirName] = {
      type: "directory",
      content: {},
    };
    return "";
  },
  rm: (args) => {
    if (args.length === 0) return "rm: missing operand";
    const fileName = args[0];
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "rm: cannot access directory";

    if (!currentDir.content[fileName]) {
      return `rm: cannot remove '${fileName}': No such file or directory`;
    }

    // 如果是目錄且沒有 -r 參數
    if (
      currentDir.content[fileName].type === "directory" &&
      !args.includes("-r")
    ) {
      return `rm: cannot remove '${fileName}': Is a directory`;
    }

    delete currentDir.content[fileName];
    return "";
  },
  rmdir: (args) => {
    if (args.length === 0) return "rmdir: missing operand";
    const dirName = args[0];
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "rmdir: cannot access directory";

    if (!currentDir.content[dirName]) {
      return `rmdir: failed to remove '${dirName}': No such file or directory`;
    }

    if (currentDir.content[dirName].type !== "directory") {
      return `rmdir: failed to remove '${dirName}': Not a directory`;
    }

    if (Object.keys(currentDir.content[dirName].content).length > 0) {
      return `rmdir: failed to remove '${dirName}': Directory not empty`;
    }

    delete currentDir.content[dirName];
    return "";
  },
  vim: (args) => {
    if (args.length === 0) return "vim: missing file argument";
    const fileName = args[0];
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "vim: cannot access directory";

    isInVim = true;
    vimFileName = fileName;
    vimMode = "normal";

    // 如果檔案存在，載入內容
    if (
      currentDir.content[fileName] &&
      currentDir.content[fileName].type === "file"
    ) {
      vimContent = currentDir.content[fileName].content;
    } else {
      vimContent = "";
    }

    return `"${fileName}" ${currentDir.content[fileName] ? currentDir.content[fileName].content.length + "L" : "[New File]"}\n\n${vimContent}\n\n~ \n~ \n~\n\n-- ${vimMode.toUpperCase()} --`;
  },
  wget: (args) => {
    if (args.length === 0) return "wget: missing URL";
    const url = args[0];

    // 檢查當前目錄
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "wget: cannot access directory";

    // 從 URL 獲取檔案名
    const fileName = url.split("/").pop();

    // 使用 fetch API 下載檔案
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 在終端機中顯示下載成功訊息
        const outputLine = document.createElement("div");
        outputLine.className = "terminal-output";
        outputLine.innerText = `Downloaded: ${fileName}`;
        document.getElementById("command-history").appendChild(outputLine);
      })
      .catch((error) => {
        const outputLine = document.createElement("div");
        outputLine.className = "terminal-output";
        outputLine.innerText = `Error: ${error.message}`;
        document.getElementById("command-history").appendChild(outputLine);
      });

    return `Downloading ${url}...`;
  },
};

function executeCommand(command) {
  // 處理 vim 模式
  if (isInVim) {
    if (command === ":q" || command === ":q!") {
      isInVim = false;
      vimContent = "";
      vimFileName = "";
      return "";
    }
    if (command === ":w" || command === ":wq") {
      const currentDir = getDirectoryContent(currentDirectory);
      if (currentDir) {
        currentDir.content[vimFileName] = {
          type: "file",
          content: vimContent,
        };
      }
      if (command === ":wq") {
        isInVim = false;
        vimContent = "";
        vimFileName = "";
      }
      return command === ":w"
        ? `"${vimFileName}" ${vimContent.length}L written`
        : "";
    }
    if (command === "i") {
      vimMode = "insert";
      return `-- INSERT --\n\n${vimContent}\n\n~ \n~ \n~`;
    }
    if (vimMode === "insert" && command === "ESC") {
      vimMode = "normal";
      return `-- NORMAL --\n\n${vimContent}\n\n~ \n~ \n~`;
    }
    if (vimMode === "insert") {
      vimContent += command + "\n";
      return `${vimContent}\n~ \n~ \n~`;
    }
    return `${vimContent}\n\n~ \n~ \n~\n\n-- ${vimMode.toUpperCase()} --`;
  }

  const [cmd, ...args] = command.split(" ");
  commandHistory.push(command);

  if (cmd === "history") {
    return commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`).join("\n");
  }

  if (cmd === "echo") {
    return args.join(" ");
  }

  if (cmd === "clear") {
    return "CLEAR";
  }

  if (cmd === "ls") {
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "ls: cannot access directory";

    const arg = args.join(" ");
    if (arg === "-la" || arg === "-al") {
      const files = Object.entries(currentDir.content)
        .map(([name, item]) => {
          const type = item.type === "directory" ? "d" : "-";
          return `${type}rwxr-xr-x 1 xzhiyouu xzhiyouu 4096 Feb 21 10:00 ${name}`;
        })
        .join("\n");
      return `total ${Object.keys(currentDir.content).length}\n${files}`;
    }
    if (arg === "-a") {
      return [".", "..", ...Object.keys(currentDir.content)].join("  ");
    }
    return Object.keys(currentDir.content)
      .filter((name) => !name.startsWith("."))
      .join("  ");
  }

  if (cmd === "cat" && args.length > 0) {
    const currentDir = getDirectoryContent(currentDirectory);
    if (!currentDir) return "cat: cannot access directory";

    const file = currentDir.content[args[0]];
    if (!file || file.type === "directory") {
      return `cat: ${args[0]}: No such file or directory`;
    }
    return file.content;
  }

  return typeof commands[cmd] === "function"
    ? commands[cmd](args)
    : commands[cmd] || `Command not found: ${cmd}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const commandInput = document.getElementById("command-input");
  const commandHistoryElement = document.getElementById("command-history");

  // 添加 Ubuntu 開機訊息
  const bootMessages = [
    "Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-88-generic x86_64)",
    "",
    " * Documentation:  https://help.ubuntu.com",
    " * Management:     https://landscape.canonical.com",
    " * Support:        https://ubuntu.com/advantage",
    "",
    "  System information as of " + new Date().toString(),
    "",
    "  System load:  0.02              Processes:             100",
    "  Usage of /:   25.1% of 47.93GB  Users logged in:      1",
    "  Memory usage: 30%               IPv4 address for eth0: 192.168.1.100",
    "  Swap usage:   0%",
    "",
    " * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s",
    "   just raised the bar for easy, resilient and secure K8s cluster deployment.",
    "",
    "   https://ubuntu.com/engage/secure-kubernetes-at-the-edge",
    "",
    "Last login: " + new Date().toLocaleString() + " from 127.0.0.1",
    "",
  ];

  // 顯示開機訊息
  bootMessages.forEach((message) => {
    const messageLine = document.createElement("div");
    messageLine.className = "terminal-output";
    messageLine.innerText = message;
    commandHistoryElement.appendChild(messageLine);
  });

  commandInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const command = this.value.trim();
      const output = executeCommand(command);

      if (!isInVim) {
        // 修改提示符以顯示當前目錄
        let promptPath = currentDirectory;
        if (currentDirectory.startsWith("/home/xzhiyouu")) {
          promptPath =
            currentDirectory === "/home/xzhiyouu"
              ? "~"
              : "~" + currentDirectory.substring("/home/xzhiyouu".length);
        }

        const commandLine = document.createElement("div");
        commandLine.innerHTML = `<span class="terminal-prompt">xzhiyouu@xzhiyouu:${promptPath}$</span> ${command}`;
        commandHistoryElement.appendChild(commandLine);

        if (output !== "CLEAR") {
          const outputLine = document.createElement("div");
          outputLine.className = "terminal-output";
          outputLine.innerText = output;
          commandHistoryElement.appendChild(outputLine);
        } else {
          commandHistoryElement.innerHTML = "";
          // 重新顯示開機訊息...
        }

        this.value = "";
        this.scrollIntoView();
      } else {
        const outputLine = document.createElement("div");
        outputLine.className = "terminal-output";
        outputLine.innerText = output;
        commandHistoryElement.innerHTML = "";
        commandHistoryElement.appendChild(outputLine);
      }

      this.value = "";
      this.scrollIntoView();
    }

    // 處理 ESC 鍵
    if (e.key === "Escape" && isInVim) {
      const output = executeCommand("ESC");
      const outputLine = document.createElement("div");
      outputLine.className = "terminal-output";
      outputLine.innerText = output;
      commandHistoryElement.innerHTML = "";
      commandHistoryElement.appendChild(outputLine);
    }
  });
});
