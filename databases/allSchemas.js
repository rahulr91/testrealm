import Realm from 'realm';

// export const KEEP_LIST_SCHEMA = 'KeepList';
export const KEEP_ITEM_SCHEMA = 'KeepItem';

export const KeepItemSchema = {
  name: KEEP_ITEM_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    text: { type: 'string', indexed: true },
    done: { type: 'bool', default: false }
  }
};

// export const KeepListSchema = {
//   name: KEEP_LIST_SCHEMA,
//   primaryKey: 'id',
//   properties: {
//     id: 'int',
//     name: 'string',
//     creationDate: 'date',
//     keep: { type: 'list', objectType: KEEP_ITEM_SCHEMA}
//   }
// }

const databaseOptions = {
  path: 'keepApp.realm',
  schema: [KeepItemSchema],
  schemaVersion: 0
}

export const insertKeepItem = keepItem => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      realm.create(KEEP_ITEM_SCHEMA, keepItem)
      resolve(keepItem)
    });
  }).catch((error) => reject(error));
});

export const queryAllKeepItems = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    let allKeepData = realm.objects(KEEP_ITEM_SCHEMA);
    resolve(allKeepData)
  }).catch((error) => reject(error));
});

export const deleteAllKeepItems = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let allKeepData = realm.objects(KEEP_ITEM_SCHEMA)
      realm.delete(allKeepData)
      resolve()
    });
  }).catch((error) => reject(error));
});

export default new Realm(databaseOptions)