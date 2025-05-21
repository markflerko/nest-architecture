import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from 'src/alarms/infrastructure/persistence/orm/entity/alarm.entity';
import { AlarmMapper } from 'src/alarms/infrastructure/persistence/orm/mappers/alarm.mapper';
import { Repository } from 'typeorm';

@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find();
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
