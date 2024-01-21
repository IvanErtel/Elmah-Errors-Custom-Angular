import { ISearchChip } from "../interfaces/grilla/search-chip.interface";

export class PaginatedQueryOptions {
    PageSize!: number;
    PageNumber!: number;
    Filters!: ISearchChip[];
    StartDate?: Date;
    EndDate?: Date;
    TextFilter?:string;

    constructor(params: Partial<PaginatedQueryOptions>) {
        Object.assign(this, params);
    }
}