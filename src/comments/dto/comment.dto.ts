import { IsString, MaxLength } from 'class-validator';

export class CommentDto {
  @IsString()
  @MaxLength(500)
  text: string;

  commenterIpAddress?: string;
  filmId?: number;
}
