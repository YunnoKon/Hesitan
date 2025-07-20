export function extractDateInfo(date){
    return {
        dateText: date.toLocaleDateString("en-GB",{ year: "numeric", month: "2-digit", day: "2-digit" }),
        monthText: date.toLocaleString('default', { month: 'long' }),
        monthDaysCount: new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }
}

export function getModel(provider){
  switch(provider){
    case "google":{
      return {
        "Gemini 2.5 Flash Lite": "gemini-2.5-flash-lite-preview-06-17",
        "Gemini 2.5 Flash":"gemini-2.5-flash",
        "Gemini 2.5 Pro":"gemini-2.5-pro",
        "Gemini 2.0 Flash":"gemini-2.0-flash",
        "Gemini 2.0 Flash Lite":"gemini-2.0-flash-lite"
      }
    }
  }
}