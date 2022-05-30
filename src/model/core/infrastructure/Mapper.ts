export abstract class Mapper<T> {
	abstract toDomain(raw: any): T;
	toDTO?(t: T): any;
	abstract toPersistence(t: T): any;
}
