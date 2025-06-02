import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import {
  EMPTY,
  filter,
  first,
  map,
  mergeMap,
  Observable,
  race,
  timer,
} from 'rxjs';
import { NotifyFacilitySupervisorCommand } from 'src/alarms/application/commands/notify-facility-supervisor.command';
import { AlarmAcknowledgeEvent } from 'src/alarms/domain/events/alarm-acknowledge.event';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';

@Injectable()
export class UnacknowledgedAlarmsSaga {
  private readonly logger = new Logger(UnacknowledgedAlarmsSaga.name);

  @Saga()
  start = (events$: Observable<any>): Observable<ICommand> => {
    const alarmAcknowledgedEvents$ = events$.pipe(
      ofType(AlarmAcknowledgeEvent),
    );

    const alarmCreatedEvents$ = events$.pipe(ofType(AlarmCreatedEvent));

    return alarmCreatedEvents$.pipe(
      mergeMap((alarmCreatedEvent) =>
        race(
          alarmAcknowledgedEvents$.pipe(
            filter(
              (alarmAcknowledgedEvent) =>
                alarmAcknowledgedEvent.alarmId === alarmCreatedEvent.alarm.id,
            ),
            first(),
            mergeMap(() => EMPTY),
          ),
          timer(15000).pipe(map(() => alarmCreatedEvent)),
        ),
      ),
      map((alarmCreatedEvent) => {
        this.logger.debug(
          `!!! Alarm ${alarmCreatedEvent.alarm.name} not acknowledged in 15 seconds `,
        );

        const facilityId = '12345';
        return new NotifyFacilitySupervisorCommand(facilityId, [
          alarmCreatedEvent.alarm.id,
        ]);
      }),
    );
  };
}
