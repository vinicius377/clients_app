import { Client } from "../../shared/types/Client";
import { request } from "./events";

interface ClientList {
    count: number;
    result: Client[]
} 

class ClientEvent {
    async list() {
        return request<ClientList>('client:list')
    }
}

export const clientEvents = new ClientEvent();