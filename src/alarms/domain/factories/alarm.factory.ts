import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

@Injectable()
export class AlarmFactory {
  create(name: string, severity: string) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);

    return new Alarm(alarmId, name, alarmSeverity);
  }
}
