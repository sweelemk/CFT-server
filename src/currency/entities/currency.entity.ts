import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardEntity } from '../../card/entities';

@Entity('currency')
export class CurrencyEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pk_id' })
  id: number;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column({ name: 'symbol_native' })
  symbolNative: string;

  @Column({ name: 'decimal_digits' })
  decimalDigits: number;

  @Column()
  rounding: number;

  @Column()
  code: string;

  @Column({ name: 'name_plural' })
  namePlural: string;

  @Column({ name: 'fk_card_id' })
  cardId: string;

  @OneToMany(() => CardEntity, (card) => card.id)
  @JoinColumn({
    name: 'fk_card_id',
  })
  card: CardEntity[];
}
