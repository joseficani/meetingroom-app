// import { Injectable } from '@angular/core';
// import { Room } from '../models/room.model';
// import { MOCK_ROOMS } from './mock-data';

// @Injectable({ providedIn: 'root' })
// export class RoomService {
//   private rooms = MOCK_ROOMS;
//   getRooms(): Room[] {
//     return this.rooms;
//   }
//   getRoomById(id: number): Room | undefined {
//     return this.rooms.find(r => r.id === id);
//   }
// }

import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { MOCK_ROOMS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private rooms = MOCK_ROOMS;

  getRooms() {
    return this.rooms;
  }

  getRoomById(id: number) {
    return this.rooms.find(r => r.id === id);
  }
}
