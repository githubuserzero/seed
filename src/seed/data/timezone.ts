import { get, set } from 'js-cookie';
import { DateTime } from 'luxon';
import * as timezonedb from '../../timezone.json';
import { cookieKeys } from 'app/data';

export interface Timezone {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
}

export const timezoneList: Timezone[] = Array.from(timezonedb.zones);

export const timezoneMap: Map<string, Timezone> = timezoneList.reduce((map, timezone) => {
  map.set(timezone.zoneName, timezone);
  return map;
}, new Map);

export function getTimezone(timezoneName: string): Timezone {
  const timezone: Timezone | undefined = timezoneMap.get(timezoneName);
  if (!timezone) throw new Error('Undefined timezone: ' + timezoneName);
  return timezone;
}

export function getInitialTimezone(): string {
  const timezone: string | undefined = get(cookieKeys.timezone);
  
  if (typeof timezone === 'string') {
    return timezone;
  } else {
    const timezone: string = DateTime.local().zoneName;
    set(cookieKeys.timezone, timezone);
    return timezone;
  }
}

export const updateTimezone: () => (timezone: string | Timezone) => Timezone = () => timezone => {
  const tz: Timezone = typeof timezone === 'string'
    ? getTimezone(timezone)
    : timezone;
  
  set(cookieKeys.timezone, timezone);
  
  return tz;
};