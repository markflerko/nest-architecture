import { DynamicModule, Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAlarmCommandHandler } from 'src/alarms/application/commands/create-alarm.command-handler';
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
