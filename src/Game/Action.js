import { Player } from './Player'
import { Room } from './Room'
import { randomId } from './utils'
import { say } from '../Interface/Text'

export class Action {
  /**
   * Create an action
   * @param {Object} actionConfig the action config
   * @param {string} actionConfig.text the action text
   * @param {()=>void | undefined} actionConfig.isEnabled evaluated after each action for action availability, if undefined the action is not automatically enabled
   * @param {()=>Promise<void>} actionConfig.callback to do on action click
   */
  constructor({ text, callback, isEnabled = () => false }) {
    this.text = text
    this.callback = callback
    this.isEnabled = isEnabled
    this.identifier = randomId()
  }
}

export class MoveAction extends Action {
  /**
   * Create a move action to change room
   * @param {Object} actionConfig the action config
   * @param {Player} player the player to move
   * @param {Room} wantedRoom the room to move to
   */
  constructor(actionConfig, player, wantedRoom) {
    super({
      ...actionConfig,
      callback: () => {
        player.move(wantedRoom)
        say(`${player.name} moves to ${wantedRoom.name}`)
        return actionConfig.callback()
      },
    })
  }
}

/**
   * Add an item to the inventory when the player find it
   */
export class GetItemsAction extends Action {
  
  /**
   * 
   * @param {Object} actionConfig 
   * @param {Item} item
   * @param {Inventory} inventory 
   */
  constructor(actionConfig, item, inventory) {
    super({
      ...actionConfig,
      callback: () => {
        inventory.addItem(item)
        say(`Add ${item.name} to the inventory`)
        return actionConfig.callback()
      }
    })
  }
}

export class ResolveCodeAction extends Action {

  constructor(actionConfig, code) {
    super({...actionConfig})
    this.code = code
  }
}
