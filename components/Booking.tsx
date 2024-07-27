import { Card } from 'antd';
import React from "react";
import RoomAllocation from './RoomAllocation';

type BookingProps = {
  currentTest: any; 
  isCheapestPlan: boolean;
}

const Booking: React.FC<BookingProps> = ({currentTest, isCheapestPlan}) => {

  return (
    <Card style={{ width: 500 }}>
      <RoomAllocation
        currentTest={currentTest}
        isCheapestPlan={isCheapestPlan}
        onChange={(result) => {
          console.log('RoomAllocation:[onChange]', result)
        }}
      />
    </Card>
  );
};
export default Booking;
