import Vue from 'vue'

export function reset(form) {
  if (form != null) {
    for (let i in form) {
      form[i] = "";
    }
  }
  return form;
}

export function getName(list, no) {

  for (let i = 0; i < list.length; i++) {

    if (list[i].value === no) {
      console.log(list[i].value, no)
      return list[i].label;
    }
  }
}

export function getCaseNumber(prefix) {
  let caseNumber = ""
  let date = new Date()
  let numPre = date.getFullYear().toString().slice(0, 2) + (date.getMonth() + 1).toString() +
    date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString()
    + date.getSeconds().toString() + date.getMilliseconds().toString()


  if (numPre.length <= 15) {
    for (let i = 0; i < 18 - numPre.length; i++) //3位随机数，用以加在时间戳后面。
    {
      caseNumber += Math.floor(Math.random() * 10);
    }
  }

  return numPre + caseNumber;
}

export const DIFFTIME = function (startTime, endTime, unit) {
  // 判断当前月天数
  function getDays(mouth, year) {
    let days = 30
    if (mouth === 2) {
      days = year % 4 === 0 ? 29 : 28
    } else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
      // 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
      days = 31
    }
    return days
  }

  const start = new Date(startTime)
  const end = new Date(endTime)
  // 计算时间戳的差
  const diffValue = end - start
  // 获取年
  const startYear = start.getFullYear()
  const endYear = end.getFullYear()
  // 获取月
  const startMouth = start.getMonth() + 1
  const endMouth = end.getMonth() + 1
  // 获取日
  const startDay = start.getDate()
  const endDay = end.getDate()
  // 获取小时
  const startHours = start.getHours()
  const endHours = end.getHours()
  // 获取分
  const startMinutes = start.getMinutes()
  const endMinutes = end.getMinutes()
  // 获取秒
  const startSeconds = start.getSeconds()
  const endSeconds = end.getSeconds()
  // 下方注释两行为调试用
  // console.log('start:', startYear, startMouth, startDay, startHours, startMinutes, startSeconds)
  // console.log('end:', endYear, endMouth, endDay, endHours, endMinutes, endSeconds)
  if (unit === 'y' || unit === 'M') {
    // 相差年份月份
    const diffYear = endYear - startYear
    // 获取当前月天数
    const startDays = getDays(startMouth, startYear)
    const endDays = getDays(endMouth, endYear)
    const diffStartMouth = (startDays - (startDay + ((startHours * 60 + startMinutes + startSeconds / 60) / 60 / 24) - 1)) / startDays
    const diffEndMouth = (endDay + ((endHours * 60 + endMinutes + endSeconds / 60) / 60 / 24) - 1) / endDays
    const diffMouth = diffStartMouth + diffEndMouth + (12 - startMouth - 1) + endMouth + (diffYear - 1) * 12
    // console.log(diffStartMouth,diffEndMouth,diffMouth)
    if (unit === 'y') {
      return Math.floor(diffMouth / 12 * 100) / 100
    } else {
      return diffMouth
    }
  } else if (unit === 'd') {
    const d = parseInt(diffValue / 1000 / 60 / 60 / 24)
    return d
  } else if (unit === 'h') {
    const h = parseInt(diffValue / 1000 / 60 / 60)
    return h
  } else if (unit === 'm') {
    const m = parseInt(diffValue / 1000 / 60)
    return m
  } else if (unit === 's') {
    const s = parseInt(diffValue / 1000)
    return s
  } else {
    console.log('请输入正确的单位')
  }
}

export function isIdentityId(identityId) {
  var patrn = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;//长度或格式校验
  //地区校验
  var aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  // 出生日期验证
  var sBirthday = (
      identityId.substr(6, 4) +
      "-" +
      Number(identityId.substr(10, 2)) +
      "-" +
      Number(identityId.substr(12, 2))
    ).replace(/-/g, "/"),
    d = new Date(sBirthday)
  // 身份证号码校验 最后4位  包括最后一位的数字/字母X
  var sum = 0,
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    codes = "10X98765432";
  for (var i = 0; i < identityId.length - 1; i++) {
    sum += identityId[i] * weights[i];
  }
  var last = codes[sum % 11]; //计算出来的最后一位身份证号码

  var errorMsg = '';
  if (identityId === '') {
    errorMsg = ""
  } else {
    if (!patrn.exec(identityId)) {
      errorMsg = "你输入的身份证长度或格式错误"
    } else if (!aCity[parseInt(identityId.substr(0, 2))]) {
      errorMsg = "你的身份证地区非法"
    } else if (sBirthday !== d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()) {
      errorMsg = "身份证上的出生日期非法"
    } else if (identityId[identityId.length - 1] !== last) {
      errorMsg = "你输入的身份证号非法"
    }
  }
  return errorMsg;
}

export function to408(self, val) {
  setTimeout(() => {
    if (val) {
      self.$router.push("/408")
    }
  }, 5000)
}

/**
 *防抖函数
 *@param fn 事件触发的操作
 *@param delay 多少毫秒内连续触发事件，不会执行
 *@returns {Function}
 */
export function debounce(fn, delay) {
  let timer = null;
  return function () {
    let self = this,
      args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  }
}
