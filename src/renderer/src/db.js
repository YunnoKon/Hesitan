import Dexie from 'dexie';

export const db = new Dexie('AppDatabase');
db.version(1).stores({
  task: '++id, name, description, date, hour, minute', 
});
