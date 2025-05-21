import { Injectable } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from 'src/alarms/infrastructure/persistence/in-memory/entity/alarm.entity';
import { AlarmMapper } from 'src/alarms/infrastructure/persistence/orm/mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();
  constructor() {}

  async findAll(): Promise<Alarm[]> {
    await Promise.all([]);
    const entities = Array.from(this.alarms.values());
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    await Promise.all([]);

    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id) as AlarmEntity;
    return AlarmMapper.toDomain(newEntity);
  }
}
