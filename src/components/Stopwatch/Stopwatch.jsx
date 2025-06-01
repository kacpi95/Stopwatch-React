import { useState, useEffect } from 'react';
import styles from './Stopwatch.module.scss';

export default function Stopwatch() {
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(0);

  const handleStart = () => {
    setTimer(
      setInterval(() => {
        setTime((prevValue) => prevValue + 10);
      }, 10)
    );
  };
  const handleStop = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };
  const handleReset = () => {
    handleStop();
    setTime(0);
  };
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const format = () => {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let miliseconds = Math.floor((time % 1000) / 10);

    let formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let formatHours = hours < 10 ? `0${hours}` : `${hours}`;
    

    return `${formatHours}: ${formatMinutes}: ${formatSeconds}: ${miliseconds}0`;
  };
  return (
    <div className={styles.container}>
      <div className={styles.time}>{format()}</div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleStart}>
          START
        </button>
        <button className={styles.button} onClick={handleStop}>
          STOP
        </button>
        <button className={styles.button} onClick={handleReset}>
          RESET
        </button>
      </div>
    </div>
  );
}
