import { useCallback, useState } from 'react';
import { getTimezone, setBrowserTimezone, Timezone } from '../data-types/timezone';

export interface Result {
  timezone: Timezone;
  updateTimezone: (timezone: string | Timezone) => void;
}

export function useTimezone(currentTimezone: string): Result {
  const [timezone, setTimezone] = useState<Timezone>(getTimezone(currentTimezone));
  
  const updateTimezone: (nextTimezone: string | Timezone) => void = useCallback((nextTimezone: string | Timezone) => {
    setTimezone(setBrowserTimezone(nextTimezone));
  }, [setTimezone]);
  
  return {
    timezone,
    updateTimezone,
  };
}