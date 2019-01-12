import React, { ChangeEvent, useState } from 'react';
import { useAppContextState } from '../context';
import { timezoneList, timezoneMap } from '../data-types/timezone';
import styles from './TimezoneChangeSelect.module.scss';

export function TimezoneChangeSelect() {
  const {timezone, updateTimezone} = useAppContextState();
  const [zoneName, updateZoneName] = useState<string>(timezone.zoneName);
  
  function onChange(event: ChangeEvent<{value: string}>) {
    const nextZoneName: string = event.target.value;
    
    updateZoneName(nextZoneName);
    
    if (timezoneMap.has(nextZoneName)) {
      updateTimezone(nextZoneName);
    }
  }
  
  return (
    <div>
      <input list="timezones"
             className={timezoneMap.has(zoneName) ? styles.commit : styles.draft}
             value={zoneName}
             onChange={onChange}/>
      
      <datalist id="timezones">
        {
          timezoneList.map(tz => (
            <option key={tz.zoneName} value={tz.zoneName}/>
          ))
        }
      </datalist>
    </div>
  );
}