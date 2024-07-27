import { Flex } from 'antd';
import React, { useState, useEffect, useCallback } from "react";
import type { guestType, roomType, allocationType, TestCaseType } from "../types/types";
import InputSection from "./common/InputSection";
import { getDefaultRoomAllocation } from '../utils/utils'

type RoomAllocationProps = {
  currentTest: TestCaseType
  onChange: (result:any) => void;
};
  

const RoomAllocation:React.FC<RoomAllocationProps> = ({
  currentTest, onChange
}) => {
    const [step, setStep] = useState(0);
    const [guest, setGuest] = useState<guestType | null>(null);
    const [rooms, setRooms] = useState<roomType[]>([]);
    const [defaultRooms, setDefaultRooms] = useState<allocationType[]>([]);
    const [restOfAllocatedAdults, setRestOfAllocatedAdults] = useState(0);
    const [restOfAllocatedChildren, setRestOfAllocatedChildren] = useState(0);

    // const totalPrice = defaultRooms.reduce((acc, room) => acc + room.price, 0);

    const getRoomTotalPrice = (room: allocationType, index: number) => {
      const adultPrice = room.adult * rooms[index].adultPrice;
      const childPrice = room.child * rooms[index].childPrice;
      return rooms[index].roomPrice + adultPrice + childPrice;
    }

    const handleChage = (ev: React.ChangeEvent<HTMLInputElement>, index:number) => {

      const { name, value } = ev.target;
      // const newValue = Number(value);
      console.log('[onChange]', name, value);

      const newRooms:allocationType[] = [...defaultRooms];
      // const newTargetRoom: allocationType = { ...defaultRooms[index] };
      // const oldValue = newTargetRoom[name]; //save old value before update

      // newTargetRoom[name] = newValue;
      // newTargetRoom.price = getRoomTotalPrice(newTargetRoom, index);
      // newRooms[index] = newTargetRoom;
      // if (name === 'adult') {
      //   setRestOfAllocatedAdults(prev => {
      //     console.log('[setRestOfAllocatedAdults]: newVal', newValue, 'oldVal', oldValue, 'prev', prev);
      //     return prev - newValue;
      //   });
      // } else if (name === 'child') {
      //   setRestOfAllocatedChildren(prev => {
      //     console.log('[setRestOfAllocatedChildren]: newVal', newValue, 'oldVal', oldValue, 'prev', prev);
      //     return prev - newValue;
      //   });
      // }

      onChange(newRooms);
      setDefaultRooms(newRooms);
    }


    const getAllocatedRooms = useCallback((guest: guestType, rooms: roomType[]) => {
      const allocateRooms: allocationType[] = [];

      rooms.sort((a, b) => {
        return (a.roomPrice + a.adultPrice + a.childPrice) - (b.roomPrice + b.adultPrice + b.childPrice);
      })

      for (let i = 0; i < rooms.length ; i++) {
        const adult = restOfAllocatedAdults >= 0 ? 1 : 0 , child = 0;
        allocateRooms.push({
          adult,
          child, 
          price: rooms[i].roomPrice + rooms[i].adultPrice*adult + rooms[i].childPrice*child
        });
      }

      // setIsAllocateRoomsReady(true)
      return allocateRooms; 
   },[restOfAllocatedAdults])

    // initial
    useEffect(() => { 
      setStep(1);
    },[]);

    useEffect(() => {
      const { guest, rooms } = currentTest;
      setGuest(guest);
      setRooms(rooms);
      setRestOfAllocatedAdults(guest.adult);
      setRestOfAllocatedChildren(guest.child);

      const allocatedRooms = getAllocatedRooms(guest, rooms);
      setDefaultRooms(allocatedRooms || []);
    }, [currentTest, getAllocatedRooms]);


    return (
      <Flex vertical>
        { guest && rooms.length > 0 && (
          <Flex>
            <Flex className="text-2xl font-bold">
              <h2>住客人數：</h2>
              {guest.adult} 位大人，{guest.child} 位小孩 / {rooms.length} 房
            </Flex>
          </Flex>
        )}
        <Flex vertical>
            <Flex className="text-base bg-slate-200 w-full mt-2 p-4">
                <h2>尚未分配人數：</h2>
                {restOfAllocatedAdults} 位大人，{restOfAllocatedChildren} 位小孩 
            </Flex>
        </Flex>
        <Flex vertical className="text-lg font-bold mb-4 divide-y">
            {defaultRooms.map((room, index) => (
                <Flex vertical key={index} className="text-lg font-bold mb-4 py-4">
                    <Flex vertical gap={8}>
                        <h3>房間 {index + 1}：</h3>
                        <InputSection
                          adult={room.adult}
                          child={room.child}
                          capacity={rooms[index].capacity}
                          step={step}
                          restOfAllocatedAdults={restOfAllocatedAdults}
                          restOfAllocatedChildren={restOfAllocatedChildren}
                          onChange={(e) => handleChage(e, index)}
                          onFocus={(e) => {}}
                          onBlur={(e) => {}}
                        />
                        <div>價格: {room.price}</div>
                    </Flex>
                </Flex>
            ))}
        </Flex>
      </Flex>
    );
};

export default RoomAllocation;
