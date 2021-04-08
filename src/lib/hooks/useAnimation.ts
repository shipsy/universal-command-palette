import * as React from 'react';

export interface StartProps {
  from: number;
  to: number;
  duration?: number; // milliseconds, default: to - from
  delay?: number; // milliseconds
  onChange: (animationValue: number) => Promise<void>;
}

const useAnimation = () => {
  // const timer = React.useRef(undefined as NodeJS.Timeout | undefined);
  const timer = React.useRef(undefined as number | undefined);
  const delay = React.useRef(undefined as NodeJS.Timeout | undefined);
  const FRAME_INTERVAL = 50; // milliseconds

  const start = (props: StartProps) => {
    const DELAY = props.delay || 0;
    delay.current = setTimeout(() => {
      console.log('Starting...');
      const startTime = new Date().valueOf();
      // timer.current = setInterval(() => handleFrame(props, startTime), FRAME_INTERVAL);
      handleFrame(props, startTime)
    }, DELAY);
  };

  const handleFrame = (props: StartProps, startTime: number) => {
    // console.log('Next frame');
    const { to, from, duration, onChange } = props;
    const currentTime = new Date().valueOf();
    const elapsedTime = currentTime - startTime;
    const elapsedFraction = elapsedTime / (duration || (to - from));
    const animationValue = from + (to - from) * elapsedFraction;

    // console.log({ elapsedTime, elapsedFraction });
    // console.log({ toClip: elapsedFraction <= 1 });

    if (!duration || elapsedFraction <= 1) {
      // console.log({ elapsedFraction, from, to, animationValue });
      onChange(animationValue); //.then(() => console.log('{ e }'));
      timer.current = requestAnimationFrame(() => handleFrame(props, startTime));
    } else {
      // console.log({ elapsedFraction, from, to, animationValue });
      // stop();
    }
  };

  const stop = () => {
    console.log('Stopping...');
    clearTimeout((delay.current as unknown) as number);
    delay.current = undefined;
    timer.current && cancelAnimationFrame(timer.current);
    // clearInterval((timer.current as unknown) as number);
    timer.current = undefined;
  };

  return {
    start,
    stop,
  };
};

export default useAnimation;
