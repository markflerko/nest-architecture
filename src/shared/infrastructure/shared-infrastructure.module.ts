import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs'; // <-- Add this import
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { EventDeserializer } from 'src/shared/infrastructure/event-store/deserializers/event.deserializer';
import { EventsBridge } from 'src/shared/infrastructure/event-store/events-bridge';
import { MongoEventStore } from 'src/shared/infrastructure/event-store/mongo-event-store';
import { EventStorePublisher } from 'src/shared/infrastructure/event-store/publishers/event-store.publisher';
import { EventSchema } from 'src/shared/infrastructure/event-store/schemas/event.schema';
import { EventSerializer } from 'src/shared/infrastructure/event-store/serializers/event.serializer';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [
    EventSerializer,
    EventStorePublisher,
    MongoEventStore,
    EventsBridge,
    EventDeserializer,
  ],
})
export class SharedInfrastructureModule {}
