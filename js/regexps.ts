const regexps: RegExp[] = [
  // 正整数
  /^\d+$/,

  // 负整数
  /^-\d+$/,

  // 整数
  /^-?\d+$/,

  // 正数
  /^\d*\.?\d+$/,

  // 负数
  /^-\d*\.?\d+$/,

  // 数字
  /^-?\d*\.?\d+$/,

  // 邮箱
  /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,

  // 手机号码
  /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,

  // 身份证号
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  // 中国邮政编码
  /[1-9]\d{5}(?!\d)/,

  // 国内电话号码
  /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/,

  // 车牌号
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,

  // URL
  /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,

  // 年/月/日（年-月-日、年.月.日）
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,

  // 日期
  /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,

  // 中文字符
  /[\u4e00-\u9fa5]/,

  // 帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
  /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/,

  // 空白行
  /\n\s*\r/,

  // IP地址
  /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/,

  // IPv4地址
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  // 首尾空白字符
  /^\s*|\s*$/,

  // 是否为图片类型URL
  /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i,

  // 是否为视频类型URL
  /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i,
];
