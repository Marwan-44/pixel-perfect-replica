/** Tiny IndexedDB wrapper for uploaded images (too large for localStorage). Browser only. */
const DB_NAME = "raqeeb-site";
const STORE = "images";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T> | void): Promise<T | void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    const req = run(store);
    tx.oncomplete = () => {
      db.close();
      resolve(req ? req.result : undefined);
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllImages(): Promise<Record<string, Blob>> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const out: Record<string, Blob> = {};
    const req = store.openCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        out[String(cursor.key)] = cursor.value as Blob;
        cursor.continue();
      }
    };
    tx.oncomplete = () => {
      db.close();
      resolve(out);
    };
    tx.onerror = () => reject(tx.error);
  });
}

export const putImage = (key: string, blob: Blob) => withStore("readwrite", (s) => s.put(blob, key));
export const deleteImage = (key: string) => withStore("readwrite", (s) => s.delete(key));
export const clearImages = () => withStore("readwrite", (s) => s.clear());
