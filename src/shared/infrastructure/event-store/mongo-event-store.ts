import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { EventStore } from 'src/shared/application/ports/event-store';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { EventDeserializer } from 'src/shared/infrastructure/event-store/deserializers/event.deserializer';
import { Event } from 'src/shared/infrastructure/event-store/schemas/event.schema';

@Injectable()
export class MongoEventStore implements EventStore {
  private readonly logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  async getEventsByStreamId(streamId: string): Promise<SerializableEvent[]> {
    const events = await this.eventStore
      .find({ streamId })
      .sort({ position: 1 });

    if (events.length === 0) {
      throw new Error(`Aggregate with id ${streamId} does not exist`);
    }

    return events.map((event) =>
      this.eventDeserializer.deserialize(event.toJSON() as Event),
    );
  }

  async persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventStore.startSession();

    try {
      session.startTransaction();

      await this.eventStore.insertMany(events, { session, ordered: true });

      await session.commitTransaction();
      this.logger.debug(`Events inserted successfully to the event store`);
    } catch (error) {
      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;

      if (error?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        this.logger.error(`Events could not be persisted. Aggregate is stale`);
        console.error(error.writeErrors?.[0]?.err?.errmsg);
      } else {
        throw error;
      }

      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }
}
