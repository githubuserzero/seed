import React, { ChangeEvent, useCallback, useState } from 'react';
import { Timezone, timezoneList, timezoneMap } from 'use-timezone';
import { useAppContextState } from '../context';
import styles from './TimezoneChangeSelect.module.scss';

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
    <div>
      <input list="timezones"
             className={timezoneMap.has(zoneName) ? styles.commit : styles.draft}
             value={zoneName}
             onChange={onChange}/>
      
      <datalist id="timezones">
        {
          timezoneList.map((tz: Timezone) => (
            <option key={tz.zoneName} value={tz.zoneName}/>
          ))
        }
      </datalist>
    </div>
  );
}