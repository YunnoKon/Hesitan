import { join } from 'path';
import { safeStorage, app } from 'electron';
import { promises as fs } from 'fs';

const configPath = join(app.getPath('userData'), 'app_config.enc');

function replaceTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in data ? data[key] : match
  );
}

// Lazy loading factory function
async function createProvider(provider, apiKey){
    let providerInstance;
    switch(provider){
        case "google":{
          const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
          providerInstance = createGoogleGenerativeAI({
            apiKey:apiKey
          })
        }
        break;
        case "openai":{
          const { createOpenAI } = await import("@ai-sdk/openai")
          providerInstance = createOpenAI({
            apiKey:apiKey
          })
        }
        break;
        case "anthropic":{
          const { createAnthropic } = await import("@ai-sdk/anthropic")
          providerInstance = createAnthropic({
            apiKey:apiKey
          })
        }
        break;
    }
    return providerInstance;
}

// Config Storage Utilties
async function storeConfig(config){
  if(safeStorage.isEncryptionAvailable()){
    const jsonString = JSON.stringify(config)
    const encrypted = safeStorage.encryptString(jsonString)
    await fs.writeFile(configPath, encrypted);
  }
}

async function getConfig() {
  if (safeStorage.isEncryptionAvailable()) {
    try {
      const encrypted = await fs.readFile(configPath);
      if (encrypted) {
        const buffer = Buffer.from(encrypted, 'base64');
        return JSON.parse(safeStorage.decryptString(buffer));
      }
    } catch {
      // Fallback to return nothing to assign
      return null;
    }
  }
  return null;
}

// Format Error Message
function classifyError(errorText) {
  const errorRules = [
    { pattern: /key/, message: 'Agent: Invalid API Key Provided.' },
    { pattern: /quota|credits/, message: 'Agent: You’ve hit your usage limit.' },
  ];
  const text = errorText.toLowerCase();
  
  for (const rule of errorRules) {
    if (rule.pattern.test(text)) {
      return rule.message
    }
  }
  
  // Fallback to debug
  return errorText;
}

export { replaceTemplate, createProvider, storeConfig, getConfig, classifyError }