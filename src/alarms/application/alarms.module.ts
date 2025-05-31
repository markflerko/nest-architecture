import { DynamicModule, Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AcknowledgedAlarmCommandHandler } from 'src/alarms/application/commands/acknowledge-alarm.command-handler';
import { CreateAlarmCommandHandler } from 'src/alarms/application/commands/create-alarm.command-handler';
import { AlarmAcknowledgeEventHandler } from 'src/alarms/application/event-handlers/alarm-acknowledged.event-handler';
import { AlarmCreatedEventHandler } from 'src/alarms/application/event-handlers/alarm-created.event-handler';
import { GetAlarmsQueryHandler } from 'src/alarms/application/queries/get-alarms.query-handler';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { AlarmsController } from 'src/alarms/presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  imports: [CqrsModule], // <-- Add CqrsModule here
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgedAlarmCommandHandler,
    AlarmAcknowledgeEventHandler,
  ],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [CqrsModule, infrastructureModule], // <-- Also add here for dynamic module
    };
  }
}
