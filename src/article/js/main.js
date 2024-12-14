<script src="https://cdn.jsdelivr.net/npm/qrcode.js/qrcode.min.js"></script>;

const _0x4f8e = [
  "charCodeAt",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "length",
  "key",
  "map",
  "join",
];
const _0x5c3d = function (_0x4f8e12, _0x5c3d34) {
  _0x4f8e12 = _0x4f8e12 - 0x0;
  let _0x2b3c45 = _0x4f8e[_0x4f8e12];
  return _0x2b3c45;
};

const analyticsConfig = {
  trackingId: "UA-123456789-0",
  dimensions: {
    env: "production",
    region: "asia-east1",
    version: "3.2.1",
    buildId: "20240321.1",
    debug: false,
  },
  metrics: {
    performance: {
      navigationTiming: true,
      resourceTiming: true,
      userTiming: false,
    },
    network: {
      effectiveType: "4g",
      rtt: 50,
      downlink: 10,
    },
  },
  integrations: {
    gtm: {
      containerId: "GTM-XXXXX",
      dataLayer: [
        {
          type: "page",
          data: [
            89, 48, 117, 95, 52, 114, 51, 95, 52, 95, 55, 114, 117, 51, 95, 107,
            48, 110, 52, 109, 49, 95, 109, 52, 115, 55, 101, 114, 33, 33, 33,
          ],
        },
      ],
      auth: "VmpKMGFrNVhSbk5qTTFaNlkwYzVlV0l6U25CaU1qVjNZMjA1ZW1GSFZuVmtRMk4z",
    },
  },
};

let _k = [
  _0x5c3d("0x1"),
  _0x5c3d("0x1"),
  _0x5c3d("0x2"),
  _0x5c3d("0x2"),
  _0x5c3d("0x3"),
  _0x5c3d("0x4"),
  _0x5c3d("0x3"),
  _0x5c3d("0x4"),
  _0x5c3d("0x5"),
  _0x5c3d("0x6"),
];
let _i = 0;

const initAnalytics = function (e) {
  if (e[_0x5c3d("0x8")] === _k[_i]) {
    _i++;
    if (_i === _k[_0x5c3d("0x7")]) {
      try {
        let _p = analyticsConfig.integrations.gtm.dataLayer[0].data;
        let _q = _p[_0x5c3d("0x9")]((c) => String.fromCharCode(c))[
          _0x5c3d("0xa")
        ]("");
        console.log("Analytics initialized successfully.");
        console.log("GTM container loaded.");
        console.log("User metrics collected.");
        alert("Performance data collected.\nflag{" + _q + "}");
      } catch (err) {
        console.log("Analytics initialization failed.");
      }
      _i = 0;
    }
  } else {
    _i = 0;
  }
};

document.addEventListener("keydown", initAnalytics);

function share(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title);

  switch (platform) {
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
      );
      break;
  }
}
