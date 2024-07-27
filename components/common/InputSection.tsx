import { Flex } from 'antd';
import React, { useState } from "react";
import CustomInputNumber from './CustomInputNumber';

type InputSectionProps = {
    adult:number,
    child:number,
    capacity:number,
    step:number,
    restOfAllocatedAdults: number,
    restOfAllocatedChildren: number,
    onChange: (result: any) => void,
    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => void;
};

const InputSection:React.FC<InputSectionProps> = ({ 
    adult, 
    child,
    step, 
    capacity,
    restOfAllocatedAdults,
    restOfAllocatedChildren,
    onChange,
    onBlur,
    onFocus,
 }) => {
    const [adultValue, setAdultValue] = useState(adult);
    const [childrenValue, setChildrenValue] = useState(child);

    return (
        <>
            <Flex justify="space-between" align="center" className="w-full">
                <div>大人</div>
                <CustomInputNumber
                    min={0}
                    max={30} 
                    step={step}
                    name="adult"
                    value={adultValue}
                    setValue={setAdultValue}
                    disabled={false}
                    disabledDecrease={adultValue <=0}
                    disabledIncrease={adultValue+childrenValue >= capacity || restOfAllocatedAdults <= 0}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </Flex>
            <Flex justify="space-between" align="center" className="w-full">
                <div>小孩</div>
                <CustomInputNumber
                    min={0}
                    max={30}
                    step={step}
                    name="child"
                    value={childrenValue}
                    setValue={setChildrenValue}
                    disabled={false}
                    disabledDecrease={childrenValue <=0}
                    disabledIncrease={adultValue+childrenValue >= capacity || restOfAllocatedChildren <= 0}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </Flex>
        </>
    )
};


export default InputSection;