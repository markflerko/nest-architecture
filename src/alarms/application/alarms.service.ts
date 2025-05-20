import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';

@Injectable()
export class AlarmsService {
  create(createAlarmDto: CreateAlarmCommand) {
    return 'This action adds a new alarm';
  }

  findAll() {
    return `This action returns all alarms`;
  }
}
