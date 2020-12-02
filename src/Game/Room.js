const randomValue = () => Math.floor(Math.random() * 255)
const randomColor = () =>
  `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`
import { drawRoom } from '../Interface/Map'

export class Room {
  /**
   * @param {Object} roomConfiguration - this is the room configuration
   * @param {string} roomConfiguration.name - the name of the room
   * @param {number} roomConfiguration.height - room height
   * @param {number} roomConfiguration.width - room width
   * @param {number} roomConfiguration.xPos - room horizontal emplacement
   * @param {number} roomConfiguration.yPos - room vertical emplacement
   * @param {string} roomConfiguration.color - the room color
   * @param {Action} forwardAction - Action to move forward 
   * @param {Action} backAction - Action to move back
   */
  constructor({ name, height = 1, width = 1, xPos = 0, yPos = 0, color, isHead = false, isTail = false }) {
    this.name = name
    this.height = height
    this.width = width
    this.xPos = xPos
    this.yPos = yPos
    this.color = color ? color : randomColor()

    this.isHead = isHead
    this.isTail = isTail 

    this.backAction = null
    this.forwardAction = null
    this.resolveAction = null

    this.nextRoom = null

    this.userHaveFoundDoor = false
  }

  /**
   * Add move forward and move back actions
   * @param {Action} forwardAction 
   * @param {Action} backAction 
   */
  addMoveActions(forwardAction, backAction) {
    this.forwardAction = forwardAction
    this.backAction = backAction
  }
  
  addResolveAction(resolveAction) {
    this.resolveAction = resolveAction
  }

  addNextRoom(nextRoom) {
    this.nextRoom = nextRoom
  }

  /**
   * @param {string} color - The new color
   */
  updateColor(color) {
    this.color = color ? color : randomColor()
    drawRoom(this)
  }

  /**
   * Get items in the room
   */
  getItems() {
    return this.items
  }
}
