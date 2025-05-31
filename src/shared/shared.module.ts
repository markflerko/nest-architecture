import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AggregateRehydrator } from 'src/shared/application/aggregate-rehydrator';
import { SharedInfrastructureModule } from 'src/shared/infrastructure/shared-infrastructure.module';

@Module({
  imports: [CqrsModule, SharedInfrastructureModule],
  providers: [AggregateRehydrator],
  exports: [SharedInfrastructureModule, AggregateRehydrator],
})
export class SharedModule {}
