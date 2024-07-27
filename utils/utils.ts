import type { guestType, roomType, allocationType } from "../types/types";

export const getDefaultRoomAllocation = (guest: guestType, rooms: roomType[]) => {
    const { adult: totalAdults, child: totalChildren } = guest;
    const numRooms = rooms.length;

    let result: allocationType[] = [];
    let minTotalPrice = Infinity;

    const allocate = (adults: number, children:number, roomIndex:number, currentAllocation:allocationType[], currentPrice:number) => {
        if (roomIndex >= numRooms) {
            if (adults === 0 && children === 0) {
                if (currentPrice < minTotalPrice) {
                    minTotalPrice = currentPrice;
                    result = [...currentAllocation];
                }
            }
            return;
        }

        const { roomPrice, adultPrice, childPrice, capacity } = rooms[roomIndex];

        for (let a = 0; a <= Math.min(adults, capacity); a++) {
            for (let c = 0; c <= Math.min(children, capacity - a); c++) {
                if (c > 0 && a === 0) continue; // At least one adult must be present if there are children
                
                const price = roomPrice + a * adultPrice + c * childPrice;
                const nextAllocation:allocationType[] = [...currentAllocation, { adult: a, child: c, price }];
                allocate(adults - a, children - c, roomIndex + 1, nextAllocation, currentPrice + price);
            }
        }
        // Consider not using this room at all
        allocate(adults, children, roomIndex + 1, currentAllocation, currentPrice);
    }

    allocate(totalAdults, totalChildren, 0, [], 0);

    return minTotalPrice === Infinity ? [] : result;
}