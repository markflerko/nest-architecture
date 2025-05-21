import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { AlarmEntity } from 'src/alarms/infrastructure/persistence/orm/entity/alarm.entity';
import { OrmAlarmRepository } from 'src/alarms/infrastructure/persistence/orm/repositories/alarm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: AlarmRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class OrmAlarmPersistenceModule {}
