import { Location } from 'history';
import { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { InitialState } from '../data/initialState';

export interface Result {
  initialState: InitialState | null;
}

export function useInitialState(defaultInitialState: InitialState | null): Result {
  const [initialState, setInitialState] = useState<InitialState | null>(defaultInitialState);
  const {location} = useReactRouter();
  const [lastLocation, setLastLocation] = useState<Location>(location);
  
  useEffect(() => {
    if (lastLocation.pathname !== location.pathname) {
      setLastLocation(location);
      setInitialState(null);
    }
  }, [location, lastLocation]);
  
  return {initialState};
}