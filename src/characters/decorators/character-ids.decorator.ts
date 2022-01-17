import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Gets Character Ids from request parameters
export const CharacterIds = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const characterIdsString = request.params.characterIds;
    return characterIdsString.split(',').map((id) => parseInt(id));
  },
);
