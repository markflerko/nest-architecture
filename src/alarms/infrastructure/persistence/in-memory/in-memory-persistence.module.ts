import { Module } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { OrmAlarmRepository } from 'src/alarms/infrastructure/persistence/orm/repositories/alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryAlarmPersistenceModule {}
