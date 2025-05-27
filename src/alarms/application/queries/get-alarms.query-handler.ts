import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { GetAlarmsQuery } from 'src/alarms/application/queries/get-alarms.query';
import { AlarmReadModel } from 'src/alarms/domain/read-model/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmRepository) {}

  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
