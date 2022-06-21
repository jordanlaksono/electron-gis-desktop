import { RxJsonSchema } from 'rxdb';
import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import { Observable } from 'rxjs';

const schema: RxJsonSchema = {
  title: 'user schema',
  description: 'skema database untuk user',
  version: 0,
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      primary: true,
    },
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['_id', 'username','password']
};
export default schema;

export type RxUserDocumentType = {
  _id: string;
  username: string;
  password: string;
};

export type RxUserDocument = RxDocument<RxUserDocumentType>;
export type RxUserCollection = RxCollection<RxUserDocumentType, {}>;


