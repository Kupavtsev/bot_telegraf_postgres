import React from 'react';
import { useTimer } from 'react-timer-hook';
import ListAds from './ListAds';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => console.warn('onExpire called') });


  return (
    <div >
      <div >
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <div >
        {isRunning
          ? <ListAds />
          : <div>No new messages</div>
        }
      </div>

    </div>
  );
}

export default function Timer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer
  return (
    <div >
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}