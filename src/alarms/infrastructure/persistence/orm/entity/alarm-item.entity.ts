import { AlarmEntity } from 'src/alarms/infrastructure/persistence/orm/entity/alarm.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('alarm_item')
export class AlarmItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => AlarmEntity, (alarm) => alarm.items)
  alarm: AlarmEntity;
}
