import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Character } from '../entities/character.entity';
import { map, Observable } from 'rxjs';

// Interceptor to add extra properties to a Character response Object
@Injectable()
export class AddExtraPropertiesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Character[]>,
  ): Observable<any> {
    const convertCmToFeet = (valueCm: number) => {
      let inches = parseInt((valueCm * 0.393700787).toFixed(0));
      const feet = Math.floor(inches / 12);
      inches %= 12;
      return `${feet} ft ${inches} inches`;
    };

    return next.handle().pipe(
      map((characters) => {
        const count = characters.length;
        const totalHeightInCm = characters
          .map((character) => character.height)
          .reduce((a, b) => a + b);
        const totalHeightInFeet = convertCmToFeet(totalHeightInCm);

        return {
          count,
          totalHeightInCm: `${totalHeightInCm} cm`,
          totalHeightInFeet,
          characters,
        };
      }),
    );
  }
}
