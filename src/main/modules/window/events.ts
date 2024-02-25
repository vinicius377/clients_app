import { ipcMain } from "electron"
import MenuBuilder from "../menu"

export const loadWindowEvents = (menuBuilder: MenuBuilder) => {
  ipcMain.on('minimize', () => {
    menuBuilder.mainWindow.setFullScreen(false)
  })
}
