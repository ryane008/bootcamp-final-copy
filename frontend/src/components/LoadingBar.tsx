import React, { useState, useEffect } from 'react';

interface Props{
    duration: number;
}
const LoadingBar = ({ duration }:Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResetButtonEnabled, setIsResetButtonEnabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);
        setIsResetButtonEnabled(true);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [duration, isLoading]);

  const resetLoadingBar = () => {
    setIsLoading(true);
    setIsResetButtonEnabled(false);
  };

  return (
    <div>
      <div className={`loading-bar ${isLoading ? 'loading' : 'loaded'}`}>
        <div className="bar"></div>
      </div>
      {isLoading ? (
        <p>Wait for it...</p>
      ) : (
        <button
          onClick={resetLoadingBar}
          disabled={!isResetButtonEnabled}
        >
          Click me!!!
        </button>
      )}
    </div>
  );
};

export default LoadingBar;
