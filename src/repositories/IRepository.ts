export default interface IRepository<T> {
   get(): T;
   getAll(): T[];

   insert(t: T): void;
   update(t: T): void;
   delete(t: T): void;
}
