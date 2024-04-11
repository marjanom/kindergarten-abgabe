export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    availableSpots: number,
    image: any
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }