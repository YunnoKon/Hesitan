export function extractDateInfo(date){
    return {
        dateText: date.toLocaleDateString("en-GB",{ year: "numeric", month: "2-digit", day: "2-digit" }),
        monthText: date.toLocaleString('default', { month: 'long' }),
        monthDaysCount: new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }
}