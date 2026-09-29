type TDBConfig = {
  dbName: string;
  version: number;
  tables: Record<
    string,
    {
      name: string;
      keyPath?: string;
    }
  >;
};

let connection: null | IDBOpenDBRequest = null;

const init = async (config: TDBConfig): Promise<null | IDBOpenDBRequest> => {
  return new Promise((resolve, reject) => {
    const connection = indexedDB.open(config.dbName, (config.version = 1));

    connection.onupgradeneeded = () => {
      const db = connection.result;

      for (const table of Object.values(config.tables)) {
        const { name, keyPath } = table;
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath });
        }
      }
    };

    connection.onerror = function () {
      reject(null);
    };

    connection.onsuccess = function () {
      resolve(connection);
    };
  });
};

const run = async (config: TDBConfig) => {
  connection = await init(config);
};

const put = <T extends { indexDbId: string }>(tableName: string, data: T) => {
  if (!connection) {
    throw new Error('Помилка ініціалізації бази даних');
  }

  return new Promise((resolve, reject) => {
    const transaction = connection.result.transaction(tableName, 'readwrite');

    const obj = transaction.objectStore(tableName);

    obj.put(data);

    transaction.oncomplete = () => {
      resolve(data);
    };
    transaction.onerror = () => {
      reject();
    };
    transaction.onabort = () => {
      reject();
    };
  });
};

const getAll = <T>(tableName: string): Promise<IDBRequest<T[]> | null> => {
  if (!connection) {
    throw new Error('Помилка ініціалізації бази даних');
  }

  return new Promise((resolve, reject) => {
    const transaction = connection.result.transaction(tableName, 'readwrite');

    const obj = transaction.objectStore(tableName);

    const result = obj.getAll();

    result.onsuccess = () => {
      resolve(result);
    };
    result.onerror = () => {
      reject(null);
    };
    transaction.onabort = () => {
      reject(null);
    };
  });
};

export { getAll, put, run };
