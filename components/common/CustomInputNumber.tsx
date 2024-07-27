import { Flex } from 'antd';
import React, { useEffect, useRef} from "react";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import CustomButton from './CustomButton';

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
  onChange,
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODIG
    if (inputRef.current) {
      const event = new Event('input', { bubbles: true });
      inputRef.current.value = String(value);
      inputRef.current.dispatchEvent(event);
    }
  }, [value]);

  return (
    <Flex onBlur={onBlur} onFocus={onFocus} gap={8}>
      <CustomButton
        onLongPress={() => { alert('long press')}}
        disabled={disabledDecrease}
        onClick={() => {
          setValue(prev => prev - step)
        }}
      >
        <MinusOutlined />
      </CustomButton>
      <input
        ref={inputRef}
        min={min}
        max={max}
        name={name}
        step={step}
        value={value}
        onInput={onChange}
        className="text-center w-[48px] h-[48]"
        disabled={disabled}
      />
      <CustomButton
        onLongPress={() => { alert('long press') }}
        disabled={disabledIncrease}
        onClick={() => {
          setValue(prev => prev + step)
        }}
      >
        <PlusOutlined />
      </CustomButton>
    </Flex>
  );
};

export default CustomInputNumber;
