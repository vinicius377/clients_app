import { Client } from "../../../shared/types/Client";
import { Repository } from "../Repository";
import { store } from "./schema";

export class ClientRepository extends Repository<Client>{
  constructor() {
    super(store)
  }
}

export const clientRepository = new ClientRepository();
