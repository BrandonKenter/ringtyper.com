import { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

const CountdownTimer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const currentDateMilliseconds = Date.now();
  const previousMidnightUTCMilliseconds = new Date(
    new Date().setUTCHours(0, 0, 0, 0)
  ).getTime();
  const millisecondsSinceMidnightUTC =
    currentDateMilliseconds - previousMidnightUTCMilliseconds;
  const millisecondsToNextMidnightUTC = 86400000 - millisecondsSinceMidnightUTC;

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <section
        data-cy="countdown-banner"
        className=" flex flex-col items-center text-neutral-300"
      >
        <div className="flex text-neutral-500">
          <div className="flex items-center justify-center rounded-lg px-1">
            <span className="text-lg font-extrabold text-neutral-400">
              {zeroPad(hours)}
            </span>
            <span className="text-sm font-semibold pl-1">Hrs</span>
          </div>
          <div className="flex items-center justify-center rounded-lg px-1 ">
            <span className="text-lg font-extrabold text-neutral-400">
              {zeroPad(minutes)}
            </span>
            <span className="text-sm font-semibold pl-1">Mins</span>
          </div>
          <div className="flex items-center justify-center rounded-lg px-1">
            <span className="text-lg font-extrabold text-neutral-400">
              {zeroPad(seconds)}
            </span>
            <span className="text-sm font-semibold pl-1">Secs</span>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Countdown
      renderer={renderer}
      date={modalOpen ? Date.now() : Date.now() + millisecondsToNextMidnightUTC}
      onComplete={() => setModalOpen(true)}
    />
  );
};

export default CountdownTimer;
