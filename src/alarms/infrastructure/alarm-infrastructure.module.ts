import { Module } from '@nestjs/common';
import { InMemoryAlarmPersistenceModule } from 'src/alarms/infrastructure/persistence/in-memory/in-memory-persistence.module';
import { OrmAlarmPersistenceModule } from 'src/alarms/infrastructure/persistence/orm/orm-persistence.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmAlarmPersistenceModule
        : InMemoryAlarmPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
