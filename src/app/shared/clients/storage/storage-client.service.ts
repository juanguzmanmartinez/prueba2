import { Injectable } from '@angular/core';
import { CryptoService } from '@clients/crypto/crypto.service';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class StorageClientService {
  private STORAGE_NAME_EVENT = 'storage';

  constructor(private cryptoService: CryptoService) {}

  public get storage(): Storage {
    return localStorage;
  }

  public get storage$() {
    return fromEvent<StorageEvent>(window, this.STORAGE_NAME_EVENT).pipe(
      filter((event) => event && event.storageArea === this.storage)
    );
  }

  public cleanStorage() {
    const { storage } = this;
    return storage.clear();
  }

  public getStorageItem(key: string) {
    const { storage } = this;
    return storage.getItem(key);
  }

  public setStorageItem(key: string, value: string) {
    const { storage } = this;
    return storage.setItem(key, value);
  }

  public removeStorageItem(key: string) {
    const { storage } = this;
    return storage.removeItem(key);
  }

  setStorageCrypto(field, cryptoItem) {
    // localStorage.setItem(
    //   field,
    //   this.cryptoService.set(JSON.stringify(cryptoItem))
    // );
    localStorage.setItem(field, JSON.stringify(cryptoItem));
  }

  getStorageCrypto(field) {
    // const cryptoItem = this.decryptItem(field);
    // return JSON.parse(cryptoItem);
    return JSON.parse(localStorage.getItem(field));
  }

  public decryptItem(key: string) {
    try {
      const encrypted = localStorage.getItem(key);
      if (encrypted) {
        return this.cryptoService.get(encrypted);
      }
    } catch (e) {}
    return null;
  }
}
