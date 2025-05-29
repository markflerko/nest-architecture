/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, type Type } from '@nestjs/common';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import type { SerializedEvent } from 'src/shared/domain/interfaces/serializeble-event';
import type { Event } from 'src/shared/infrastructure/event-store/schemas/event.schema';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializedEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls as any, event.data),
    };
  }

  getEventClassByType(type: string) {
    switch (type) {
      case AlarmCreatedEvent.name:
        return AlarmCreatedEvent;
    }
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
