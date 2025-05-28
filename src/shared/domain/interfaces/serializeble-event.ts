/**
 * @template T Event data type
 */
export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJson(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

/**
 * @template T Event data type
 */
export interface SerializedEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  data: SerializedEventPayload<T>;
}
