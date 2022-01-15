import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  constructor(partialComment: Partial<Comment>) {
    Object.assign(this, partialComment);
  }
  @PrimaryGeneratedColumn('increment', { name: 'comment_id' })
  id: number;

  @Column({ name: 'film_id', type: 'integer' })
  filmId: number;

  @Column({ type: 'varchar', length: 500 })
  text: string;

  @Column({ name: 'commenter_ip_address', type: 'varchar', length: '15' })
  commenterIpAddress: string;

  @CreateDateColumn()
  created: Date;
}
