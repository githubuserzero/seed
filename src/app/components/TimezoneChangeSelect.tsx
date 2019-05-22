import React, { ChangeEvent, useCallback, useState } from 'react';
import { Timezone, timezoneList, timezoneMap } from 'use-timezone';
import { useAppContextState } from '../context';

export function TimezoneChangeSelect() {
  const {timezone, updateTimezone} = useAppContextState();
  const [zoneName, updateZoneName] = useState<string>(timezone.zoneName);
  
  const onChange: (event: ChangeEvent<{value: string}>) => void = useCallback((event: ChangeEvent<{value: string}>) => {
    const nextZoneName: string = event.target.value;
    
    updateZoneName(nextZoneName);
    
    if (timezoneMap.has(nextZoneName)) {
      updateTimezone(nextZoneName);
    }
  }, [updateTimezone]);
  
  return (
    <>
      <input list="timezones"
             aria-owns="timezones"
             aria-invalid={!timezoneMap.has(zoneName)}
             value={zoneName}
             onChange={onChange}/>
      
      <datalist id="timezones"
                role="listbox"
                aria-multiselectable={false}>
        {
          timezoneList.map((tz: Timezone) => (
            <option key={tz.zoneName}
                    value={tz.zoneName}
                    aria-selected={tz.zoneName === zoneName}/>
          ))
        }
      </datalist>
    </>
  );
}