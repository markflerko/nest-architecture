import { EventClsRegistry } from 'src/shared/infrastructure/event-store/event-cls.registry';

export const AutowiredEvent: ClassDecorator = (target: any) => {
  EventClsRegistry.add(target);
};
