import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from '../../card/entities';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pk_id' })
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'profile_image' })
  profileImage: string;

  @Column({ nullable: true })
  phone: number;

  @OneToMany(() => CardEntity, (card) => card.user)
  cards: CardEntity[];
}
