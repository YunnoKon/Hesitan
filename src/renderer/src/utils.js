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
        "Gemini 2.5 Flash":"gemini-2.5-flash",
        "Gemini 2.5 Flash Lite": "gemini-2.5-flash-lite",
        "Gemini 2.5 Pro":"gemini-2.5-pro",
        "Gemini 2.0 Flash":"gemini-2.0-flash",
        "Gemini 2.0 Flash Lite":"gemini-2.0-flash-lite"
      }
    }
    break;
    case "openai":{
      return {
        "GPT 4o Mini":"gpt-4o-mini",
        "GPT 4.1 Mini":"gpt-4.1-mini"
      }
    }
    break;
    case "anthropic":{
      return {
        "Claude Haiku 3.5":"claude-3-5-haiku-latest",
        "Claude Sonnet 4":"claude-sonnet-4-20250514",
        "Claude Opus 4":"claude-opus-4-20250514"
      }
    }
  }
}