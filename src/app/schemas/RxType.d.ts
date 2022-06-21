import { RxDatabase } from 'rxdb';
// import schema
import { RxJalanDocument, RxJalanCollection } from './jalan.schema';
import { RxUserDocument, RxUserCollection } from './user.schema';


export type RxGisCollections = { 
  jalan: RxJalanCollection;
  user: RxUserCollection;
};

export type RxGisDatabase = RxDatabase<RxGisCollections>;