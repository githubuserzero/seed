import { useAppContextState } from 'app/context';
import React, { useMemo } from 'react';

export default function Main() {
  const {initialState} = useAppContextState();
  
  const testString: string = useMemo<string>(() => {
    return initialState && initialState.sample
      ? initialState.sample.testString
      : 'LOCAL VALUE';
  }, []);
  
  return (
    <div>
      THIS TEXT IS FROM {testString}
    </div>
  );
}