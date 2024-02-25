import Store, { Schema } from 'electron-store';
import path from 'path';
import { Client } from '../../../shared/types/Client';
import { StorageType } from '../../../shared/types/Store';
import ElectronStore from 'electron-store';
import { srcPath } from '../../util';

const clientSchema: Schema<Client> = {
  cpf: {
    type: 'number',
  },
  name: {
    type: 'string',
  },
  id: {
    type: 'integer'
  }
}

const schema: Schema<StorageType<Client>> = {
  data: {
    type: 'array',
    items: {
      type: 'object',
      properties: clientSchema,
    }
  },
  count: {
    type: 'integer'
  },
  updatedAt: {
    type: 'string'
  }
}

export const store = new ElectronStore<StorageType<Client>>({
  cwd: path.resolve(srcPath, 'db'),
  name: 'clients',
  schema
});
