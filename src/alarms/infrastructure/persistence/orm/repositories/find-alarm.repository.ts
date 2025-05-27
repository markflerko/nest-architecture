import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-model/alarm.read-model';
import { MaterializedAlarmView } from 'src/alarms/infrastructure/persistence/schemas/materialized-alarm-view.schema';

@Injectable()
export class OrmFindAlarmRepository implements FindAlarmRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find();
  }
}
