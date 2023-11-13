import dbConnect from "../connectors/mongodb/mongoose-connector";

export abstract class BaseService {
  connector: any;

  abstract getAll(): any;
  abstract getById(id: string): any;
  abstract create(create: any): any; //TODO How to use Generics Here?
  abstract update(update: any): any;
  abstract deleteById(id: string): void;
  abstract deleteAll(): void;
  async _getConnection() {
    //TODO is there a global connector I can use in the scope of this?
    if (this.connector) return this.connector;
    this.connector = await dbConnect();
    return this.connector;
  }
}
