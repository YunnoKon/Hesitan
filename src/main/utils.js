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
    const encrypted = await fs.readFile(configPath);
    if (encrypted) {
      const buffer = Buffer.from(encrypted, 'base64');
      return JSON.parse(safeStorage.decryptString(buffer));
    }
  }
  return null;
}

export { replaceTemplate, createProvider, storeConfig, getConfig }