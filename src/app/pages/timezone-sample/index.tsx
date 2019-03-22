import { useAppContextState } from 'app/context';
import moment from 'moment-timezone';
import React from 'react';

const dateFormat: string = 'LLLL';

export default function Sample() {
  const {locale, timezone} = useAppContextState();
  
  return (
    <div>
      <table>
        <tbody>
        <tr>
          <th>TIME OF LOCAL COMPUTER</th>
          <td>{moment().locale(locale).format(dateFormat)}</td>
        </tr>
        <tr>
          <th>TIME OF CURRENT TIMEZONE "{timezone.zoneName}"</th>
          <td>{moment.tz(timezone.zoneName).locale(locale).format(dateFormat)}</td>
        </tr>
        <tr>
          <th>TIME OF "Asia/Singapore"</th>
          <td>{moment.tz('Asia/Singapore').locale(locale).format(dateFormat)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}