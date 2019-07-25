// autogenerated file

import * as grpc from 'grpc';
import { util } from 'protobufjs';
import Long = util.Long;
import * as events from 'events';

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are [google.type.Date][google.type.Date] and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: Long;

  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: Long;

  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: Long;

  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: Long;
}