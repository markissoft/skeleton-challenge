export interface IRepo<T> {
	exists(t: string): Promise<boolean>;
	save?(t: T): Promise<T>;
	delete?(id: any): Promise<boolean>;
	saveBulk?(t: T[]): Promise<T[]>;
}

export abstract class Repo<T> {
	public async upsert(exists: boolean, model: any, t: T): Promise<void> {
		if (!exists) {
			await model.create(t);
		} else {
			await model.update(t);
		}
	}
}
