import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { GetAlarmsQuery } from 'src/alarms/application/queries/get-alarms.query';
import { Alarm } from 'src/alarms/domain/alarm';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, Alarm[]>
{
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async execute(query: GetAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
