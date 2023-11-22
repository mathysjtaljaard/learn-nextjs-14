
export abstract class AbstractRepository {
  abstract getAll(): any;
  abstract getById(id: string): any;
  abstract create(create: any): any; //TODO How to use Generics Here?
  abstract update(update: any): any;
  abstract deleteById(id: string): void;
  abstract deleteAll(): void;
  abstract totalCount(match?: any): any;
  abstract findByQuery(query: any): any;
}
