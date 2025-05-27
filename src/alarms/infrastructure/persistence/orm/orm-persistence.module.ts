import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmItemEntity } from 'src/alarms/infrastructure/persistence/orm/entity/alarm-item.entity';
import { AlarmEntity } from 'src/alarms/infrastructure/persistence/orm/entity/alarm.entity';
import { OrmCreateAlarmRepository } from 'src/alarms/infrastructure/persistence/orm/repositories/create-alarm.repository';
import { OrmFindAlarmRepository } from 'src/alarms/infrastructure/persistence/orm/repositories/find-alarm.repository';
import { OrmUpsertMaterializedAlarmRepository } from 'src/alarms/infrastructure/persistence/orm/repositories/upsert-materialized-alarm.repository';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from 'src/alarms/infrastructure/persistence/schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
    ]),
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useClass: OrmFindAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class OrmAlarmPersistenceModule {}
