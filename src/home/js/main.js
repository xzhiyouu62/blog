const siteConfig = {
    theme: "dark",
    lang: "zh-TW",
    debug: false,
    metrics: {
      uid: "VTJGc2RHVmtYMTh5TlRNeE5UYzJNalV3TWpjM01UazNNUT09",
      v: "2.1.0",
      t: "pageview",
    },
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    if (navigator.userAgent.toLowerCase().includes("curl")) {
      let decoded = atob(siteConfig.metrics.uid);
      console.log("Metrics initialized:", decoded);
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const lines = document.querySelectorAll(".terminal-line");
    let delay = 0;
  
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.style.display = "block";
      }, delay);
      delay += 500; // 每行延遲 500ms
    });
  });
  
  function checkStyles() {
    let elements = document.querySelectorAll('[class^="t-"]');
    let message = Array.from(elements)
      .map((el) => getComputedStyle(el).getPropertyValue("--x"))
      .map((x) => String.fromCharCode(parseInt(x)))
      .join("");
  
    // Base64 加密
    let encodedMessage = btoa(message);
    console.log(encodedMessage);
    return encodedMessage;
  }
  
  // 頁面載入時自動執行
  document.addEventListener("DOMContentLoaded", function () {
    checkStyles();
  });
  
  //添加搜尋功能的 JavaScript
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const resultsList = document.getElementById("resultsList");
    const closeSearch = document.getElementById("closeSearch");
  
    // 文章數據（從 article.html 提取）
    const articles = [
      {
        title: "Pointer Overflow CTF 2024",
        date: "2024/11/21",
        category: "CTF",
        tags: ["CTF", "Writeup"],
        description: "The first CTF writeup",
        url: "post1.html",
      },
      {
        title: "1337UP LIVE CTF 2024",
        date: "2024/11/21",
        category: "CTF",
        tags: ["CTF", "Writeup"],
        description: "Second CTF writeup",
        url: "post2.html",
      },
    ];
  
    // 搜尋功能
    function performSearch(query) {
      query = query.toLowerCase();
      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query),
      );
  
      displayResults(results);
    }
  
    // 顯示搜尋結果
    function displayResults(results) {
      resultsList.innerHTML = "";
  
      if (results.length === 0) {
        resultsList.innerHTML = `
                  <div class="text-center text-gray-400 py-4">
                      <i class="fas fa-search mb-2"></i>
                      <p>沒有找到相關文章</p>
                  </div>
              `;
        return;
      }
  
      results.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.className =
          "bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-300";
        articleElement.innerHTML = `
                  <a href="${article.url}" class="block">
                      <div class="flex items-center justify-between mb-2">
                          <span class="text-green-400">${article.date}</span>
                          <div class="flex gap-2">
                              ${article.tags
                                .map(
                                  (tag) =>
                                    `<span class="bg-gray-600 text-xs px-2 py-1 rounded-full">${tag}</span>`,
                                )
                                .join("")}
                          </div>
                      </div>
                      <h4 class="text-white font-semibold mb-2">${article.title}</h4>
                      <p class="text-gray-400 text-sm">${article.description}</p>
                  </a>
              `;
        resultsList.appendChild(articleElement);
      });
    }
  
    // 事件監聽器
    let searchTimeout;
    searchInput.addEventListener("input", function (e) {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
  
      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query);
          searchResults.classList.remove("hidden");
        }, 300);
      } else {
        searchResults.classList.add("hidden");
      }
    });
  
    closeSearch.addEventListener("click", function () {
      searchResults.classList.add("hidden");
      searchInput.value = "";
    });
  
    // 點擊外部關閉搜尋結果
    document.addEventListener("click", function (e) {
      if (
        !searchResults.contains(e.target) &&
        !searchInput.contains(e.target) &&
        !searchResults.classList.contains("hidden")
      ) {
        searchResults.classList.add("hidden");
      }
    });
  });
  
  function calculateRunTime() {
    // 設定網站啟動時間
    const startDate = new Date("2024-10-25T00:00:00");
    const currentDate = new Date();
    const timeDiff = currentDate - startDate;
  
    // 計算天數、小時、分鐘和秒數
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
    // 更新顯示
    document.getElementById("runTime").textContent =
      `${days} days ${hours} hours ${minutes} min ${seconds} sec`;
  }
  
  // 初始執行
  calculateRunTime();
  
  // 每秒更新一次
  setInterval(calculateRunTime, 1000);
  
  document.addEventListener("DOMContentLoaded", function () {
    // 等待打字動畫完成後淡出
    setTimeout(() => {
      const animationDiv = document.querySelector(".typing-animation");
      animationDiv.classList.add("fade-out");
  
      // 動畫完成後移除元素
      setTimeout(() => {
        animationDiv.style.display = "none";
      }, 1000);
    }, 2500); // 2.5秒後開始淡出
  });
  