import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities';
import { CurrencyEntity } from '../../currency/entities';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pk_id' })
  id: number;

  @Column()
  balance: string;

  @Column({ name: 'fk_user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.cards, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'fk_user_id',
  })
  user: UserEntity;

  @Column({ name: 'fk_currency_id' })
  currencyId: string;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.id)
  @JoinColumn({
    name: 'fk_currency_id',
  })
  currency: CurrencyEntity;
}
