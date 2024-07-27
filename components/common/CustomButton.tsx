import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import _ from 'lodash';

type CustomButtonProps = {
    onLongPress: () => void;
    onClick: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onLongPress, onClick, onBlur, children, disabled = false }) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  const handleDebouncedPress = useCallback(_.debounce(() => {
    setIsPressing(true);
  }, 300), []);

  useEffect(() => {
    return () => {
      // Clean up timers on unmount
      if (pressTimer) clearTimeout(pressTimer);
      handleDebouncedPress.cancel();
    };
  }, [pressTimer, handleDebouncedPress]);

  const startPress = () => {
    handleDebouncedPress();

    const press = setTimeout(() => {
      if (isPressing) {
        onLongPress();
        setIsPressing(false);
      }
    }, 500);

    setPressTimer(press);
  };

  const endPress = () => {
    if (pressTimer) clearTimeout(pressTimer);
    handleDebouncedPress.cancel();
    setIsPressing(false);
  };

  return (
    <Button
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onClick={onClick}
      onBlur={onBlur}
      className="w-[48px] h-[48px] flex items-center justify-center"
      style={{
        fontSize: '16px',
        backgroundColor: isPressing ? '#ddd' : '#fff',
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};


export default CustomButton;