import { AggregateRoot } from '@nestjs/cqrs';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { Version } from 'src/shared/domain/value-objects/version';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  loadFromHistory(history: SerializableEvent[]): void {
    const domainEvents = history.map((event) => event.data);
    super.loadFromHistory(domainEvents);

    const lastEvent = history[history.length - 1];
    this.setVersion(new Version(lastEvent.position));
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
