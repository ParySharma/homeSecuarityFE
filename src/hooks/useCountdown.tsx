import { useEffect, useState } from 'react';
import moment from 'moment';

const useCountdown = (targetDate: string) => {
  const target = moment(targetDate);

  const getDifference = () => {
    const now = moment();
    const duration = moment.duration(target.diff(now));
    return duration.asMilliseconds() <= 0 ? moment.duration(0) : duration;
  };

  const [duration, setDuration] = useState(getDifference());

  useEffect(() => {
    const interval = setInterval(() => {
      const newDuration = getDifference();
      setDuration(newDuration);

      if (newDuration.asMilliseconds() <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(duration);
};

const getReturnValues = (duration: moment.Duration) => {
  return {
    days: String(Math.floor(duration.asDays())).padStart(2, '0'),
    hours: String(Math.floor(duration.hours())).padStart(2, '0'),
    minutes: String(Math.floor(duration.minutes())).padStart(2, '0'),
    seconds: String(Math.floor(duration.seconds())).padStart(2, '0'),
  };
};

export default useCountdown;
