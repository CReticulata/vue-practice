import dayjs from 'dayjs'

const jan = dayjs().month(0) // 回傳一個 2025 年 1 月的物件
console.log(jan.month()) // 0，表示 1 月
console.log(jan.subtract(1, 'month')) // 回傳一個 2024 年 12 月的物件
console.log(jan.subtract(1, 'month').month()) // 11，表示 12 月
