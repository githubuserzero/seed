import timezonedb from 'generated/timezone.json';
import cookie from 'js-cookie';
import moment from 'moment-timezone';
import { cookieKeys } from './cookie';

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
}, new Map());

export function getTimezone(zoneName: string): Timezone {
  const timezone: Timezone | undefined = timezoneMap.get(zoneName);
  if (!timezone) throw new Error('Undefined timezone: ' + zoneName);
  return timezone;
}

export function getBrowserTimezone(): string {
  const zoneName: string | undefined = cookie.get(cookieKeys.timezone);
  
  if (typeof zoneName === 'string') {
    return zoneName;
  } else {
    const currentTimezone: string = moment.tz.guess();
    cookie.set(cookieKeys.timezone, currentTimezone);
    return currentTimezone;
  }
}

export function setBrowserTimezone(nextTimezone: string | Timezone) {
  const timezone: Timezone = typeof nextTimezone === 'string'
    ? getTimezone(nextTimezone)
    : nextTimezone;
  
  cookie.set(cookieKeys.timezone, timezone.zoneName);
  
  return timezone;
}