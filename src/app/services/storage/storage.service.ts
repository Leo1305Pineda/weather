import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
export const storageResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  return storageService.init();
};
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  protected storage: Storage | any = null;
  private value: any = {};
  onChange: BehaviorSubject<{ key?: string, value: any }> = new BehaviorSubject({ value: this.value });

  constructor(private _storage: Storage) {
  }

  async init() {
    const storage = await this._storage.create();
    this.storage = storage;
    const keys = await this.storage.keys();
    const promises = Promise.all(keys.map(async (key: string) => {
      return this.value[key] = await this.storage.get(key) || undefined;
    }));
    await promises.then((res) => {
      this.onChange.next({ value: this.value });
    })
    return this.storage;
  }

  getValue() {
    return this.value;
  }

  get(key: string): any {
    return this.value[key];
  }

  count(key: string): any {
    return Object.keys(this.value[key]?.docs || {}).length
  }

  async set(key: string, value: any, emit = true) {
    if (!this.storage) {
      console.warn('storage not initialized, go to routing file and to aggregate this: resolve: {storage: storageResolver}')
    }

    if (!this.value) {
      await this.init()
    } else {
      this.value[key] = value;
    }
    if (emit) {
      this.onChange.next({ key, value: this.value });
    }
    return await this.storage.set(key, this.value[key])
  }

  async clear() {
    await this.init();
    if (Object.keys(this.value).length > 0) {
      await this.storage.clear();
      this.value = {};
    }
    return this.value;
  }

  async delete(key: string, id: string) {
    if (!!id && this.value[key]?.docs) {
      delete this.value[key]?.docs[id]
      this.onChange.next({ key, value: this.value });
    }
    return await this.storage.set(key, this.value[key]);
  }
}
