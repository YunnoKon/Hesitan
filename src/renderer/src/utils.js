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
        "Gemma 3n E2B":"gemma-3n-e2b-it",
        "Gemma 3n E4B":"gemma-3n-e4b-it"
      }
    }
  }
}