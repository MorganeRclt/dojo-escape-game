import { Room } from './Room'
import { drawPlayer, erasePlayer } from '../Interface/Map'
import { say } from '../Interface/Text'

/**
 *
 */
export class Player {
  /**
   * Create a player
   * @param {Room} room the initial room where the player is
   * @param {string} name the player name
   */
  constructor(room, name) {
    this.currentRoom = room
    this.name = name
    this.roomElementDiscovered = []
  }

  /**
   * Move to another room
   * @param {Room} wantedRoom
   */
  move(wantedRoom) {
    erasePlayer(this)
    this.currentRoom = wantedRoom
    drawPlayer(this)
  }

  doDiscover(roomElement) {
    this.roomElementDiscovered.push(roomElement)
  }

  hasDiscovered(roomElement) {
    console.log(this.roomElementDiscovered)
    for (var i in this.roomElementDiscovered) {
      if (this.roomElementDiscovered[i] === roomElement) {
        return true
      }
    }
    return false
  }
}
