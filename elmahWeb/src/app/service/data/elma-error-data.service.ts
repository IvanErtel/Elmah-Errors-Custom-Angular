import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { PaginatedResponse } from 'src/app/interfaces/grilla/paginated-response.interface';
import { ElmaError } from 'src/app/models/ElmaError.model';
import { PaginatedQueryOptions } from 'src/app/models/paginated-query-options';

@Injectable({
  providedIn: 'root'
})
export class ElmaErrorDataService {
private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getPaginated(paginatedQueryOptions: PaginatedQueryOptions): Observable<PaginatedResponse<ElmaError>>{
    return this.http.post<PaginatedResponse<ElmaError>>( this.apiUrl, paginatedQueryOptions)
  }

  getErrores(): Observable<ElmaError[]>{
    return this.http.get<ElmaError[]>(this.apiUrl);
  }
}
