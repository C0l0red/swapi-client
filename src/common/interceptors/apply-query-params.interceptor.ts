import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';
import { OrderQueryParamOption } from '../enums/order-query-param-option.enum';

@Injectable()
export class ApplyQueryParamsInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T[]>,
  ): Observable<T[]> {
    const request: Request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((response) => {
        const filterKey = Object.keys(request.query).find((key) =>
          response[0]?.hasOwnProperty(key),
        );
        if (!filterKey) return response;

        const filterValue = request.query[filterKey];

        return response.filter((value) => value[filterKey] == filterValue);
      }),
      map((response: T[]) => {
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

        if (order == OrderQueryParamOption.asc) {
          return response.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
        } else {
          return response.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
        }
      }),
    );
  }
}