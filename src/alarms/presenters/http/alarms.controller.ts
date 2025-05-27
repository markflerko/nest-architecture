import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlarmsService } from 'src/alarms/application/alarms.service';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { CreateAlarmDto } from 'src/alarms/presenters/http/dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(
        createAlarmDto.name,
        createAlarmDto.severity,
        createAlarmDto.triggeredAt,
        createAlarmDto.items,
      ),
    );
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}
