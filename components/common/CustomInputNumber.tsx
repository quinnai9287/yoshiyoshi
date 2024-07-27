import { Flex } from 'antd';
import React, { useEffect, useRef, useCallback} from "react";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton from './CustomButton';
import _ from 'lodash';

type CustomInputNumberProps = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>,
  disabled: boolean;
  disabledDecrease: boolean;
  disabledIncrease: boolean;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
};

const CustomInputNumber:React.FC<CustomInputNumberProps> = ({
  min = 0,
  max = 100,
  step = 1,
  name,
  value,
  setValue,
  disabled = false,
  disabledDecrease = false,
  disabledIncrease = false,
  onChange, //這個一路傳去roomAllocation 格式 name, value
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const event = new Event('input', { bubbles: true });
      inputRef.current.value = String(value);
      inputRef.current.dispatchEvent(event);
    }
  }, [value]);

  const handleIncrease = () => {
    if( value <= max && value >=0 ) setValue(prev => prev + step); 
  }

  const handleDecrease = () => {
    if( value <= max && value >=0 ) setValue(prev => prev - step);
  }

  const handleChage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if( Number(ev.target.value) < min) return setValue(min);
    if( Number(ev.target.value) > max) return setValue(max);
    onChange(ev)
  }

  return (
    <Flex onBlur={onBlur} onFocus={onFocus} gap={8}>
      <CustomButton
        onClick={handleDecrease}
        onLongPress={handleDecrease}
        disabled={disabledDecrease}
      >
        <MinusOutlined />
      </CustomButton>
      <input
        ref={inputRef}
        min={min}
        max={max}
        name={name}
        step={step}
        onInput={handleChage}
        className="text-center w-[48px] h-[48] border border-gray-300 rounded-md"
        disabled={disabled}
      />
      <CustomButton
        onClick={handleIncrease}
        onLongPress={handleIncrease}
        disabled={disabledIncrease}
      >
        <PlusOutlined />
      </CustomButton>
    </Flex>
  );
};

export default CustomInputNumber;
