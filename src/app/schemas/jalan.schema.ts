import { RxJsonSchema, RxDocument, RxCollection } from 'rxdb';

const schema: RxJsonSchema = {
  title: 'jalan schema',
  description: 'skema database untuk jalan',
  version: 0,
  type: 'object',
  properties: {
    idJalan: {
      type: 'string',
      primary: true,
    },
    nama_jalan: {
      type: 'string',
    },
    koordinat: {
      type: 'array',
      items: {
        type: "array"
      }
    }
  },
  required: ['idJalan', 'nama_jalan']
};
export default schema;

export type RxJalanDocumentType = {
  idJalan: string;
  nama_jalan: string;
  koordinat: Array<Array<number>>;
};


export type RxJalanDocument = RxDocument<RxJalanDocumentType>;
export type RxJalanCollection = RxCollection<RxJalanDocumentType, {}>;

