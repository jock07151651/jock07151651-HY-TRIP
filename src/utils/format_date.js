import dayjs from 'dayjs'

export function formatMonthDay(date) {
  // 格式化为 月日
  return dayjs(date).format("MM月DD日")
}

export function getDiffDays(startDate, endDate) {
  // 后一天 减去 前一天
  return dayjs(endDate).diff(startDate, "day")
}
