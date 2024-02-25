import ElectronStore from "electron-store";
import { StorageType } from "../../shared/types/Store";

export class Repository<T> {
  constructor(private store: ElectronStore<StorageType<T>> ) {}

  public insert(dto: Omit<T, 'id'>):T {
    const currentCount = this.store.get('count') || 0;
    const newList = this.store.get('data') || []
    const payload = {
        ...dto,
        id: currentCount + 1,
    } as T;
    newList.unshift(payload)
    this.store.set('data', newList);
    this.store.set('count', currentCount + 1);
    this.changeUpdatedAt()
    return payload
  }

  public find(term: string, byProperties: (keyof T)[]):T[] {
    const list = this.store.get('data') || []
    const search = (item: T) => {
      const entries = Object.entries(item as Object);
      return entries.some(([key, value]) => {
        if (!byProperties.includes(key as any)) return '';
        return value?.includes(term);
      })
    }
    return  list.filter(search)
  }

  public list(): { result:T[], count: number } {
    const list = this.store.get('data') || [];
    return {
      count: list.length,
      result: list
    }
  }

  public update(dto: Partial<T>, id: number) {
    const { index, data } = this.finById(id);
    const list = this.store.get('data') || []
    list[index] = {
      ...data,
      ...dto
    }
    this.store.set('data', list)
  }

  public delete(id: number) {
    const { data, index } = this.finById(id)
    const list = this.store.get('data') || [];
    list.splice(index, 1)
    this.store.set('data', list)
    return data
  }

  public finById(id: number) {
    let index = 0;
    let data: T = {} as T;
    const list = this.store.get('data');

    const binSearch = (list: T[], left: number, right: number, value: number): void => {
      if (right >= left) {
        const indice = Math.floor(left + (right-left)/2);
        const shot = list[indice] as any
        if (shot.id === value) {
          data = shot;
          index = indice
          return
        }
        if (shot.id > value) {
          return binSearch(list, left, indice - 1, value)
        }

        return binSearch(list, indice + 1 , right, value)
      }
      index = -1
      return;
    }
    binSearch(list, 0, list.length - 1, id);
    return {
      index,
      data
    }
  }

  private changeUpdatedAt () {
    this.store.set('updatedAt', new Date().toISOString())
  }
}
