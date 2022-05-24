export abstract class Mapper<T> {
	abstract toDomain(raw: any): T;
	toDTO?(t: T): T;
	abstract toPersistence(t: T): any;
}
