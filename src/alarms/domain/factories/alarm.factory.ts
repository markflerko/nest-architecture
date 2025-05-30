import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

@Injectable()
export class AlarmFactory {
  create(
    name: string,
    severity: string,
    triggeredAt: Date,
    items: Array<{ name: string; type: string }>,
  ) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);

    const alarm = new Alarm(alarmId);
    alarm.name = name;
    alarm.severity = alarmSeverity;
    alarm.triggeredAt = triggeredAt;
    items
      .map((item) => new AlarmItem(randomUUID(), item.name, item.type))
      .forEach((item) => alarm.addAlarmItem(item));

    alarm.apply(new AlarmCreatedEvent(alarm), { skipHandler: true });

    return alarm;
  }
}
