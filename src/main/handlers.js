import { BrowserWindow } from "electron";
import { storeConfig, getConfig } from "./utils.js"

export const handlers = {
    'config:save': (_, args) => {
        storeConfig(args)
    },
    'config:get': async (_, args) => {
        return await getConfig();
    },
    'window:minimize': (_, args) => {
        BrowserWindow.getFocusedWindow()?.minimize()
    }
}