import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';
import { OrderQueryParamOption } from '../enums/order-query-param-option.enum';

// Interceptor to apply query parameters to a list response
@Injectable()
export class ApplyQueryParamsInterceptor<T = any> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T[]>,
  ): Observable<T[]> {
    const request: Request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((response) => {
        return this.applyFilter(request, response);
      }),
      map((response) => {
        return this.applySort(request, response);
      }),
    );
  }

  // Applies a filter if it exists in the query params
  applyFilter(request: Request, response: T[]) {
    const filterKey = Object.keys(request.query).find((key) =>
      response[0]?.hasOwnProperty(key),
    );
    if (!filterKey) return response;

    const filterValue = request.query[filterKey];

    return response.filter((value) => value[filterKey] == filterValue);
  }

  // Sorts the results in the specified order, defaults to ascending
  applySort(request: Request, response: T[]) {
    const sortBy = request.query.sort as string;
    let order: OrderQueryParamOption = request.query
      .order as OrderQueryParamOption;

    if (!sortBy) return response;
    if (!response[0]?.hasOwnProperty(sortBy)) {
      return response;
    }
    if (!(order in OrderQueryParamOption)) {
      order = OrderQueryParamOption.asc;
    }
    // Uses gt or lt to sort, as some fields aren't numbers
    if (order == OrderQueryParamOption.asc) {
      return response.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    } else if (order == OrderQueryParamOption.desc) {
      return response.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
    }
  }
}
