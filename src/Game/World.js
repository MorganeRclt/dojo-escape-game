import { Player } from './Player'
import { Room } from './Room'
import { Item } from './Item'
import { Inventory } from './Inventory'
import { drawRoom, drawPlayer } from '../Interface/Map'
import { drawItem, clearInventory, drawUsedItem } from '../Interface/Inventory'
import { Action, MoveAction, GetItemsAction, ResolveCodeAction, InspectAction } from './Action'
import { clearActions, clearResolveActions, addEnabledActions, clearZoom } from '../Interface/Action'
import { Timer } from './Timer'

export class World {
  /**
   * @type {Room[]}
   */
  rooms = []

  /**
   * @type {Action[]}
   */
  actions = []

  /**
   * @type {InspectAction[]}
   */
  actionsInspect = []

  /**
   * @type {ResolveCodeAction[]}
   */
  actionsResolve = []

  /**
   * @type {MoveAction[]}
   */
  moveActions = []

  /**
   * @type {Player | undefined}
   */
  player = undefined

  /**
   * Inventory
   * @type {Inventory}
   */
  inventory = new Inventory()

  /**
   * Timer
   * @type {Timer}
   */
  timer = new Timer(this)

  constructor(name) {
    this.name = name
  }

  /**
   * @private
   * @param {()=>Promise<void> | undefined} callback to do on action click
   */
  wrapCallbackForAutomaticActionsDisplay(callback) {
    return () => {
      clearActions()
      return (callback ? callback() : Promise.resolve(null))
        .then(() => {
          addEnabledActions(this)
        })
        .catch(console.error)
    }
  }

  /**
   * @param {Object} roomConfiguration - this is the room configuration
   */
  createRoom(roomConfiguration, items, forwardAction, backAction) {
    const room = new Room(roomConfiguration, items)
    this.rooms.push(room)
    drawRoom(room)
    return room
  }

  /**
   * Create an action
   * @param {Object} actionConfig the action config
   * @param {string} actionConfig.text the action text
   * @param {()=>void | undefined} actionConfig.isEnabled evaluated after each action for action availability, if undefined the action is not automatically enabled
   * @param {()=>Promise<void> | undefined} actionConfig.callback to do on action click
   */
  createAction(actionConfig) {
    const action = new Action({
      ...actionConfig,
      world: this,
      callback: this.wrapCallbackForAutomaticActionsDisplay(
        actionConfig.callback
      ),
    })
    this.actions.push(action)
    return action
  }

  /**
   * Create a move action
   * @param {Object} actionConfig the action config
   * @param {string} actionConfig.text the action text
   * @param {()=>void | undefined} actionConfig.isEnabled evaluated after each action for action availability, if undefined the action is not automatically enabled
   * @param {()=>Promise<void> | undefined} actionConfig.callback to do on action click
   * @param {Room} wantedRoom the room to move to
   */
  createMoveAction(actionConfig, wantedRoom) {
    const action = new MoveAction(
      {
        ...actionConfig,
        world: this,
        callback: this.wrapCallbackForAutomaticActionsDisplay(
          actionConfig.callback
        ),
      },
      this.player,
      wantedRoom
    )
    this.moveActions.push(action)
    return action
  }

  createGetItemsAction(actionConfig, item) {
    const action = new GetItemsAction(
      {
        ...actionConfig,
        world: this,
        callback: this.wrapCallbackForAutomaticActionsDisplay(
          actionConfig.callback
        ),
      },
      item,
      this.inventory,
    )
    this.actions.push(action)
    return action
  }

  createResolveRoomCodeAction(actionConfig, code, clue1, clue2) {
    const action = new ResolveCodeAction(
      {
        ...actionConfig,
        world: this,
        callback: this.wrapCallbackForAutomaticActionsDisplay(
          actionConfig.callback
        )
      },
      code,
      clue1,
      clue2
    )
    return action
  }

  createResolveCodeAction(actionConfig, code, clue1, clue2, elementId, elementName, item) {
    const action = new ResolveCodeAction(
      {
        ...actionConfig,
        world: this,
        callback: this.wrapCallbackForAutomaticActionsDisplay(
          actionConfig.callback
        )
      },
      code,
      clue1,
      clue2,
      elementId,
      elementName,
      item,
      this.inventory
    )
    this.actionsResolve.push(action)
    return action
  }

  createInspectAction(actionConfig, idInspect) {
    const action = new InspectAction(
      {
        ...actionConfig,
        world: this,
        callback: this.wrapCallbackForAutomaticActionsDisplay(
          actionConfig.callback
        )
      },
      idInspect
    )
    this.actionsInspect.push(action)
    return action
  }

  /**
   * Create a new player
   * @param {string} name the player name
   * @returns {Player} the created player
   */
  createPlayer(name) {
    if (this.rooms.length === 0) {
      throw new Error(
        'The world needs to have at least one room for the player to start'
      )
    }
    const player = new Player(this.rooms[0], name)
    this.player = player
    drawPlayer(player)
    return player
  }

  createInventory() {
    return this.inventory
  }

  updateInventory() {
    clearInventory()
    this.inventory.items.forEach((item) => {
      if (this.inventory.hasItemBeenUsed(item.id)) {
        drawUsedItem(item)
      } else {
        drawItem(item, this)
      }
    })
    return this.inventory
  }

  createTimer() {
    return this.timer
  }
}
