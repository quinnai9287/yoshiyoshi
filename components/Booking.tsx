import { Card } from 'antd';
import React from "react";
import RoomAllocation from './RoomAllocation';

type BookingProps = {
  currentTest: any; 
}

const Booking: React.FC<BookingProps> = ({currentTest}) => {

  return (
    <Card style={{ width: 500 }}>
      <RoomAllocation
        currentTest={currentTest}
        onChange={(result) => {
          console.log('RoomAllocation:[onChange]', result)
        }}
      />
    </Card>
  );
};
export default Booking;
