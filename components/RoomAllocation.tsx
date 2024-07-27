import { Flex } from 'antd';
import React, { useState, useEffect, useCallback, use } from "react";
import type { guestType, roomType, allocationType, TestCaseType } from "../types/types";
import InputSection from "./common/InputSection";
import { getDefaultRoomAllocation } from '../utils/utils'

type RoomAllocationProps = {
  currentTest: TestCaseType
  isCheapestPlan: boolean;
  onChange: (result:any) => void;
};
  

const RoomAllocation:React.FC<RoomAllocationProps> = ({
  currentTest, isCheapestPlan, onChange
}) => {
    const [step, setStep] = useState(0);
    const [guest, setGuest] = useState<guestType>({adult: 0, child: 0});
    const [rooms, setRooms] = useState<roomType[]>([]);
    const [allocatedAdults, setAllocatedAdults] = useState(0);
    const [allocatedChildren, setAllocatedChildren] = useState(0);
    const [restOfAllocatedAdults, setRestOfAllocatedAdults] = useState(0);
    const [restOfAllocatedChildren, setRestOfAllocatedChildren] = useState(0);
    const [defaultRooms, setDefaultRooms] = useState<allocationType[]>([]);

    const getAllRoomsTotalPrice = (rooms:allocationType[]) => {
      return rooms.reduce((acc, room) => acc + room.price, 0);
    }

    const getRoomTotalPrice = (room: allocationType, index: number) => {
      const adultPrice = room.adult * rooms[index].adultPrice;
      const childPrice = room.child * rooms[index].childPrice;
      return rooms[index].roomPrice + adultPrice + childPrice;
    }

    const handleChage = (ev: React.ChangeEvent<HTMLInputElement>, index:number) => {
      const { name, value } = ev.target;
      const newValue = Number(value);
      const newRooms:allocationType[] = [...defaultRooms];
      const newTargetRoom: allocationType = { ...defaultRooms[index] };
      // @ts-ignore
      const oldValue = newTargetRoom[name]; 
      // @ts-ignore
      newTargetRoom[name] = newValue; 
      newTargetRoom.price = getRoomTotalPrice(newTargetRoom, index);
      newRooms[index] = newTargetRoom;

     //  console.log('[change]:', name,'newValue', newValue, 'oldValue', oldValue);

      if (name === 'adult') {
        setAllocatedAdults(prev => {
          // console.log('[setAllocatedAdults]:','prev', prev, 'newValue', newValue, 'oldValue', oldValue);
          return prev + (newValue - oldValue)
        });
      } else if (name === 'child') {
        setAllocatedChildren(prev => {
         // console.log('[setAllocatedChildern]: newVal', newValue, 'oldVal', oldValue, 'prev', prev);
          return prev + (newValue - oldValue)
        });
      }

      onChange(newRooms);
      setDefaultRooms(newRooms);
    }
    
    const getAllocatedRooms = useCallback((guest: guestType, rooms: roomType[]) => {
      const allocateRooms: allocationType[] = [];

      rooms.sort((a, b) => {
        return (a.roomPrice + a.adultPrice + a.childPrice) - (b.roomPrice + b.adultPrice + b.childPrice);
      })

      for (let i = 0; i < rooms.length ; i++) {
        const adult = 0, child = 0;
        allocateRooms.push({
          adult,
          child,
          price: rooms[i].roomPrice + rooms[i].adultPrice*adult + rooms[i].childPrice*child
        });
      }

      return allocateRooms; 
   },[])

    // initial
    useEffect(() => { 
      setStep(1);
    },[]);

    useEffect(() => {
      const { guest, rooms } = currentTest;
      setGuest(guest);
      setRooms(rooms);
      setAllocatedAdults(0);
      setAllocatedChildren(0);

      const allocatedRooms = isCheapestPlan ? getDefaultRoomAllocation(guest, rooms) : getAllocatedRooms(guest, rooms);
      setDefaultRooms(allocatedRooms || []);
    }, [currentTest, isCheapestPlan, getAllocatedRooms]);

    useEffect(() => {
      if (guest) {

        // console.log('allocatedAdults', allocatedAdults, 'allocatedChildren', allocatedChildren);

        const restOfAllocatedAdults = Math.max(0, guest.adult - allocatedAdults);
        const restOfAllocatedChildren = Math.max(0, guest.child - allocatedChildren);

        // console.log('restOfAllocatedAdults', restOfAllocatedAdults, 'restOfAllocatedChildren', restOfAllocatedChildren);

        setRestOfAllocatedAdults(restOfAllocatedAdults);
        setRestOfAllocatedChildren(restOfAllocatedChildren);
      }
    }, [allocatedAdults, allocatedChildren, guest]);

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
        {guest.adult > 0 && guest.child <= guest.adult && <p>Total Price: {getAllRoomsTotalPrice(defaultRooms)}</p>}
      <Flex vertical>
        {guest ? (
          guest.adult > 0 && guest.child <= guest.adult ? (
            <Flex className="text-base bg-slate-200 w-full mt-2 p-4 ">
              <h2>尚未分配人數：</h2>
              {restOfAllocatedAdults} 位大人，{restOfAllocatedChildren} 位小孩
            </Flex>
          ) : (
            <Flex justify="center" className="text-base bg-slate-200 w-full mt-2 p-4">
              至少要有一位成人陪伴孩童
            </Flex>
          )
        ) : null}
      </Flex>
        <Flex vertical className="text-lg font-bold mb-4 divide-y">
            {guest && (guest.adult > 0 && guest.child <= guest.adult) && defaultRooms.map((room, index) => (
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
