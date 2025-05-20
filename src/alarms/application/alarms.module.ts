import { Module } from '@nestjs/common';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { AlarmsController } from 'src/alarms/presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory],
})
export class AlarmsModule {}
