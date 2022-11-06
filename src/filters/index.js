// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from "@/utils";

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 过滤图片
export function handleImgPath(str) {
  if (str) {
    if (str.startsWith("http") || str.startsWith("data")) {
      return str;
    } else {
      return "http://lanlianhua.work:8888" + str;
    }
  } else {
    // str没有数据的话，给他一张默认图片
    return "http://img1.baidu.com/it/u=3632810533,3280769536&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400";
  }
}

// 时间过滤器
export function dateFormat(dateStr, pattern = "yyyy-mm-dd") {
  var dt = new Date(dateStr); //转化

  var y = dt.getFullYear();
  var m = dt.getMonth() + 1; //用String的padStart方法补齐
  var d = dt.getDate();
  if (pattern.toLowerCase() == "yyyy-mm-dd") {
    return `${y}-${m}-${d}`;
  } else {
    var hh = dt.getHours();
    var mm = dt.getMinutes();
    var ss = dt.getSeconds();
    return `${y}-${m}-${d} ${hh}:${mm}:${ss} 私有`;
  }
}
