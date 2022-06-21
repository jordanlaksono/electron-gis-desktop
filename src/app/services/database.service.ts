import { Injectable, isDevMode } from '@angular/core';

// import only the modules that we need. A default import would be: import RxDB from 'rxdb';
import { create as createRxDatabase, plugin as addRxDBPlugin } from 'rxdb/plugins/core';
import RxDBNoValidateModule from 'rxdb/plugins/no-validate';
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
import RxDBReplicationModule from 'rxdb/plugins/replication';
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';


// schema
import { RxGisDatabase, RxGisCollections } from '../schemas/RxType';
import jalanSchema from '../schemas/jalan.schema';
import { RxJalanDocument, RxJalanDocumentType } from '../schemas/jalan.schema';
import userSchema from '../schemas/user.schema';
import { RxUserDocument, RxUserDocumentType } from '../schemas/user.schema';


let collections = [{
    name: 'jalan',
    schema: jalanSchema,
    sync: false
},{
    name: 'user',
    schema: userSchema,
    sync: false
}];

let DB_INSTANCE: RxGisDatabase;

/**
* This is run via APP_INITIALIZER in app.module.ts
* to ensure the database exists before the angular-app starts up
*/
export async function initDatabase() {
    console.log('initDatabase()');
    DB_INSTANCE = await _create();
}

@Injectable()
export class DatabaseService {
    get db(): RxGisDatabase {
        return DB_INSTANCE;
    }
}

async function loadRxDBPlugins(): Promise<any> {
    addRxDBPlugin(RxDBLeaderElectionModule);
    addRxDBPlugin(RxDBReplicationModule);
    addRxDBPlugin(PouchdbAdapterHttp);
    addRxDBPlugin(PouchdbAdapterIdb);

    if (isDevMode()) {
        await Promise.all([
            import('rxdb/plugins/schema-check').then( module => addRxDBPlugin(module)),
            import('rxdb/plugins/error-messages').then( module => addRxDBPlugin(module)),
            import('rxdb/plugins/validate').then( module => addRxDBPlugin(module))
            ]);
    } else {
        addRxDBPlugin(RxDBNoValidateModule);
    }

}

async function _create(): Promise<RxGisDatabase> {
    await loadRxDBPlugins();
    console.log('DatabaseService: creating database..');
    const db = await createRxDatabase<RxGisCollections>({
        name: 'gisdatabase',
        adapter: 'idb',
        queryChangeDetection: true
    });
    console.log('DatabaseService: created database');
    (window as any)['db'] = db; // write to window for debugging

    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    return db;
}
