import { IncludeOptions, WhereOptions } from 'sequelize/types';
export interface IBaseQuery {
	raw?: boolean;
	where?: WhereOptions;
	limit?: number;
	offset?: number;
	include?: IncludeOptions[];
}

export class BaseQuery {
	private baseQuery: IBaseQuery = {};
	get query() {
		return this.baseQuery;
	}
	setWhere(where: WhereOptions) {
		this.baseQuery.where = where;
		return this;
	}
	setLimit(limit: number) {
		this.baseQuery.limit = limit;
		return this;
	}
	setInclude(include: IncludeOptions[]) {
		this.baseQuery.include = include;
		return this;
	}
	setOffset(offset: number) {
		this.baseQuery.offset = offset;
		return this;
	}

	// just to return data not + sequelieze metadata
	setRaw(raw: boolean) {
		this.baseQuery.raw = raw;
		return this;
	}
	static create() {
		return new BaseQuery();
	}
}
