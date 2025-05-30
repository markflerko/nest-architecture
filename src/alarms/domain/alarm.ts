import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmAcknowledgeEvent } from 'src/alarms/domain/events/alarm-acknowledge.event';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { SerializedEventPayload } from 'src/shared/domain/interfaces/serializable-event';

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();

  constructor(public id: string) {
    super();
  }

  acknowledge() {
    this.apply(new AlarmAcknowledgeEvent(this.id));
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }

  [`on${AlarmCreatedEvent.name}`](
    event: SerializedEventPayload<AlarmCreatedEvent>,
  ) {
    this.name = event.alarm.name;
    this.severity = new AlarmSeverity(event.alarm.severity.value);
    this.triggeredAt = new Date(event.alarm.triggeredAt as Date);
    this.isAcknowledged = event.alarm.isAcknowledged;
    this.items = event.alarm.items.map(
      (item) => new AlarmItem(item.id, item.name, item.type),
    );
  }

  [`on${AlarmAcknowledgeEvent.name}`](
    event: SerializedEventPayload<AlarmAcknowledgeEvent>,
  ) {
    if (this.isAcknowledged) {
      throw new Error('Alarm has already been acknowledged');
    }

    this.isAcknowledged = true;
  }
}
