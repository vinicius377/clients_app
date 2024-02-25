import { ipcMain } from "electron";
import { ClientEvent } from "../../shared/events/Client";
import { clientRepository } from "../models/clients/repository";

ipcMain.on(ClientEvent["client:insert"], (event, data) => {
  try {
    const client = clientRepository.insert(data)
    event.sender.send(ClientEvent["client:insert"], { status: 'success', data: client })
  } catch(error) {
    event.sender.send(ClientEvent["client:insert"], { status: 'error', err: error })
  }
})

ipcMain.on(ClientEvent['client:list'], (event) => {
  try {
    const clients = clientRepository.list()
    event.sender.send(ClientEvent['client:list'], { status: 'success', data: clients })
  }  catch(error) {
    event.sender.send(ClientEvent["client:list"], { status: 'error', err: error })
  }
})