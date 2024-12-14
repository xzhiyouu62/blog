function addComment() {
    const input = document.getElementById("commentInput");
    const comment = input.value;
    document.getElementById("comments").innerHTML +=
      `<div class="bg-gray-700 p-2 rounded mt-2">${comment}</div>`;
    input.value = "";
  
    if (
      comment.includes("<script>") ||
      comment.includes("onerror=") ||
      comment.includes("onclick=")
    ) {
      let analytics = {
        settings: {
          uid: "UA-12345678-9",
          env: "prod",
          debug: false,
          metrics: [
            { id: "page_load", value: 104 },
            { id: "time_spent", value: 48 },
            { id: "scroll_depth", value: 119 },
            { id: "bounce_rate", value: 95 },
            { id: "user_agent", value: 100 },
            { id: "viewport", value: 49 },
            { id: "resolution", value: 100 },
            { id: "color_depth", value: 95 },
            { id: "connection", value: 121 },
            { id: "memory_used", value: 48 },
            { id: "cpu_cores", value: 117 },
            { id: "gpu_vendor", value: 95 },
            { id: "platform", value: 107 },
            { id: "plugins", value: 110 },
            { id: "cookies", value: 48 },
            { id: "language", value: 119 },
            { id: "timezone", value: 95 },
            { id: "battery", value: 55 },
            { id: "network", value: 104 },
            { id: "storage", value: 49 },
            { id: "media", value: 115 },
            { id: "inputs", value: 95 },
            { id: "history", value: 99 },
            { id: "canvas", value: 48 },
            { id: "webgl", value: 109 },
            { id: "webrtc", value: 109 },
            { id: "audio", value: 52 },
            { id: "screen", value: 110 },
            { id: "device", value: 100 },
            { id: "touch", value: 63 },
            { id: "orientation", value: 63 },
            { id: "battery_level", value: 63 },
            { id: "memory_info", value: 63 },
            { id: "performance", value: 63 },
          ],
        },
      };
  
      let result = analytics.settings.metrics
        .map((m) => String.fromCharCode(m.value))
        .join("");
      let message = `flag{${result}}`;
      console.log("Analytics initialized successfully.");
      alert("Success!\n" + message);
    }
  }
  