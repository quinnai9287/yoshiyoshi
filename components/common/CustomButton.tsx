import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
type CustomButtonProps = {
    onLongPress: () => void;
    onClick?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onLongPress, onClick, onBlur, children, disabled = false }) => {
  const [isPressing, setIsPressing] = useState(false);
  const longPressTimerRef = useRef<number | null>(null);
  const longPressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPressing) {
      longPressTimerRef.current = window.setTimeout(() => {
        longPressIntervalRef.current = window.setInterval(() => {
          onLongPress();
        }, 100);
      }, 1000);
    } else {
      if (longPressTimerRef.current !== null) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      if (longPressIntervalRef.current !== null) {
        clearInterval(longPressIntervalRef.current);
        longPressIntervalRef.current = null;
      }
    }

    return () => {
      if (longPressTimerRef.current !== null) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      if (longPressIntervalRef.current !== null) {
        clearInterval(longPressIntervalRef.current);
        longPressIntervalRef.current = null;
      }
    };
  }, [isPressing, onLongPress]);


  const onMouseDown = () => {
    setIsPressing(true);
  };

  const onMouseUp = () => {
    setIsPressing(false);
  };

  return (
    <Button
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
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