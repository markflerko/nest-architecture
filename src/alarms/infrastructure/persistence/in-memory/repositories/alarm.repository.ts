import { Injectable } from '@nestjs/common';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmReadModel } from 'src/alarms/domain/read-model/alarm.read-model';
import { AlarmEntity } from 'src/alarms/infrastructure/persistence/in-memory/entity/alarm.entity';
import { AlarmMapper } from 'src/alarms/infrastructure/persistence/in-memory/mappers/alarm.mapper'; // <-- FIXED

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  constructor() {}

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    await Promise.all([]);

    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...(alarm as AlarmReadModel),
      });
      return;
    }

    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }

  async findAll(): Promise<AlarmReadModel[]> {
    await Promise.all([]);

    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    await Promise.all([]);

    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id) as AlarmEntity;
    return AlarmMapper.toDomain(newEntity);
  }
}
