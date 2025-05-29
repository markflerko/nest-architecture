import {
  Injectable,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { ChangeStream, ChangeStreamInsertDocument } from 'mongodb';
import { Model } from 'mongoose';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { EventDeserializer } from 'src/shared/infrastructure/event-store/deserializers/event.deserializer';
import {
  Event,
  EventDocument,
} from 'src/shared/infrastructure/event-store/schemas/event.schema';

@Injectable()
export class EventsBridge
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private changeStream: ChangeStream;

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventBus: EventBus,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  onApplicationBootstrap() {
    this.changeStream = this.eventStore
      .watch()
      .on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
        if (change.operationType === 'insert') {
          this.handleEventStoreChange(change);
        }
      });
  }

  onApplicationShutdown() {
    return this.changeStream.close();
  }

  handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>) {
    const insertedEvent = change.fullDocument;
    const eventInstance = this.eventDeserializer.deserialize(insertedEvent);
    this.eventBus.subject$.next(eventInstance.data as IEvent);
  }
}
