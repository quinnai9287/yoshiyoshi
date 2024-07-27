export type guestType = {
    adult: number;
    child: number;
  }
  
export type roomType = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export type allocationType = {
  adult: number;
  child: number;
  price: number;
}

export type TestCaseType = {
  guest: guestType;
  rooms: roomType[];
}