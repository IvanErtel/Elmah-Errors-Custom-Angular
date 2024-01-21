export class PaginatedResponse<T> {
    result!: T[];
    totalItems!: number;
    pageNumber!: number;
    pageSize!: number;

    constructor(params: Partial<PaginatedResponse<T>>) {
        Object.assign(this, params);
    }
}