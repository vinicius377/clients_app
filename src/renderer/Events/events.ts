import { Channels } from "../../shared/events";
import { ResponseEvent } from "../../shared/events/Response";


export async function request<T = any >(channel: Channels): Promise<T> {
    window.electron.ipcRenderer.sendMessage(channel);
    return new Promise((res, rej) => {
        window.electron.ipcRenderer.once(channel, (response: any) => {
            if (response satisfies ResponseEvent<T>) {
                if (response.status === 'error') {
                    rej({ error: response.error })
                }
                res(response.data as T)
            }  else {
                rej({ error: 'invalid-response' })
            }
        })
    })
} 