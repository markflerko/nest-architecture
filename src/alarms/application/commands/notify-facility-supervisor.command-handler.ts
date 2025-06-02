import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifyFacilitySupervisorCommand } from 'src/alarms/application/commands/notify-facility-supervisor.command';

@CommandHandler(NotifyFacilitySupervisorCommand)
export class NotifyFacilitySupervisorCommandHandler
  implements ICommandHandler<NotifyFacilitySupervisorCommand>
{
  private readonly logger = new Logger(
    NotifyFacilitySupervisorCommandHandler.name,
  );

  async execute(command: NotifyFacilitySupervisorCommand) {
    this.logger.debug(
      `Processing NotifyFacilitySupervisorCommand: ${JSON.stringify(command)}`,
    );
  }
}
