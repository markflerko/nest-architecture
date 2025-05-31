import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AcknowledgeAlarmCommand } from 'src/alarms/application/commands/acknowledge-alarm.command';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { GetAlarmsQuery } from 'src/alarms/application/queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

  acknowledge(id: string) {
    return this.commandBus.execute(new AcknowledgeAlarmCommand(id));
  }
}
