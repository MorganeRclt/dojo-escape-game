const actionId = 'actions'
const actionsElement = document.getElementById(actionId)
const moveForwardId = 'move-forward-button'
const moveForwardElement = document.getElementById(moveForwardId)
const moveBackId = 'move-back-button'
const moveBackElement = document.getElementById(moveBackId)
const resolveId = 'actions-resolve'
const resolveElement = document.getElementById(resolveId)
const zoomInventoryId = "zoom-inventory"
const zoomInventoryElement = document.getElementById(zoomInventoryId)
const exitId = "exit"
const exitElement = document.getElementById(exitId)

import { Action } from '../Game/Action'
import { World } from '../Game/World'
import { say } from './Text'
import { clearInventory } from './Inventory'

/**
 * Add an action to the interface
 * @param {Action} action action to register
 */
export const addAction = ({ text, callback, identifier }) => {
  const actionElement = document.createElement('button')
  Object.assign(actionElement, {
    classList: ['action-button'],
    onclick: callback,
    id: identifier,
    innerHTML: text,
  })
  actionsElement.append(actionElement)
}

export const addResolveRoomCodeAction = (currentRoom) => {
  if (currentRoom.resolveAction !== null && currentRoom.resolveAction.isEnabled()) {
    const resolveCodeElement = document.createElement('div')
    Object.assign(resolveCodeElement, {
      id: 'resolve-room'
    })

    const labelCodeElement = document.createElement('label')
    Object.assign(labelCodeElement, {
      classList: ['code-label'],
      id: 'code-label',
      innerHTML: "Enter a code to unlock the door"
    })
    resolveCodeElement.append(labelCodeElement)

    const enterCodeElement = document.createElement('input')
    Object.assign(enterCodeElement, {
      type: 'text',
      classList: ['code-input'],
      id: 'code-input'
    })
    resolveCodeElement.append(enterCodeElement)

    const submitCodeElement = document.createElement('button')
    Object.assign(submitCodeElement, {
      classList: ['action-button'],
      onclick: () => {
        const codeEntered = document.getElementById('code-input').value
        say('Try the code...')
        if (codeEntered === currentRoom.resolveAction.code) {
          setTimeout(() => {
            say('The door is open !')
            if (currentRoom.nextRoom != null) {
              currentRoom.nextRoom.updateColor(),
              addMoveForwardAction(currentRoom)
            } else {
              addExit()
            }
            document.getElementById('resolve-room').innerHTML = ''
          }, 2000)
        } else {
          setTimeout(() => {
            say('Wrong code ! Try again')
            document.getElementById('code-input').value = ''
          }, 2000)
        }
      },
      innerHTML: "Submit"
    })
    resolveCodeElement.append(submitCodeElement)

    resolveElement.append(resolveCodeElement)
  }
}

export const addInspectAction = (action) => {
  const actionElement = document.createElement('button')
  Object.assign(actionElement, {
    classList: ['action-button'],
    onclick: () => {
      clearZoom()
      const zoomElement = document.createElement('div')
      Object.assign(zoomElement, {
          classList: ['item-zoom'],
          id: action.idInspect + '-zoom'
      })
      zoomInventoryElement.append(zoomElement)
    },
    id: action.idInspect + '-zoom',
    innerHTML: action.text
  })
  actionsElement.append(actionElement)
}

export const addResolveCodeAction = (action) => {
  const resolveCodeElement = document.createElement('div')
  Object.assign(resolveCodeElement, {
    id: action.itemId
  })

  const labelCodeElement = document.createElement('label')
  Object.assign(labelCodeElement, {
    classList: ['code-label'],
    id: 'code-label-' + action.itemId,
    innerHTML: action.text
  })
  resolveCodeElement.append(labelCodeElement)

  const enterCodeElement = document.createElement('input')
  Object.assign(enterCodeElement, {
    type: 'text',
    classList: ['code-input'],
    id: 'code-input-' + action.itemId
  })
  resolveCodeElement.append(enterCodeElement)

  const submitCodeElement = document.createElement('button')
  Object.assign(submitCodeElement, {
    classList: ['action-button'],
    onclick: () => {
      const codeEntered = document.getElementById('code-input-' + action.itemId).value
      say('Try the code...')
      if (codeEntered === action.code) {
        setTimeout(() => {
          say(`The ${action.elementName} is open !`)
          document.getElementById(action.itemId).innerHTML = ''
          action.callback()
        }, 2000)
      } else {
        setTimeout(() => {
          say('Wrong code ! Try again')
          document.getElementById('code-input-' + action.itemId).value = ''
        }, 2000)
      }
    },
    innerHTML: "Submit"
  })
  resolveCodeElement.append(submitCodeElement)

  resolveElement.append(resolveCodeElement)
}

export const addMoveForwardAction = (currentRoom) => {
  if (currentRoom.forwardAction !== null && currentRoom.forwardAction.isEnabled()) {
    moveForwardElement.onclick = currentRoom.forwardAction.callback
  } else  {
    moveForwardElement.onclick = () => {}
  }
}

export const addMoveBackAction = (currentRoom) => {
  if (currentRoom.backAction !== null && currentRoom.backAction.isEnabled()) {
    moveBackElement.onclick = currentRoom.backAction.callback
  } else {
    moveBackElement.onclick = () => {}
  }
}

/**
 * Add all enabled action for current state
 * @param {World} world
 */
export const addEnabledActions = (world) => {
  world.actions.forEach((action) => action.isEnabled() && addAction(action))
  world.actionsInspect.forEach((action) => action.isEnabled() && addInspectAction(action))
  world.actionsResolve.forEach((action) => action.isEnabled() && addResolveCodeAction(action))
  const currentRoom = world.player.currentRoom
  addMoveForwardAction(currentRoom)
  addMoveBackAction(currentRoom)
  addResolveRoomCodeAction(currentRoom)
}

export const addExit = () => {
  const exitButton = document.createElement("button")
  Object.assign(exitButton, {
    classList: ["exit-button"],
    id: "exitButton",
    onclick: () => {
      console.log("Exit game")
      clearActions()
      clearZoom()
      clearInventory()
    },
    innerHTML: "Escape the boat"
  })
  exitElement.append(exitButton)
}

/**
 * Remove an action from the interface
 * @param {Action} action action to register
 */
export const removeAction = ({ identifier }) => {
  const actionElement = document.getElementById(identifier)
  if (actionElement) actionElement.parentNode.removeChild(actionElement)
}

/**
 * Clear all actions from the interface
 */
export const clearActions = () => {
  actionsElement.innerHTML = ''
  clearResolveActions()
}

export const clearResolveActions = () => {
  resolveElement.innerHTML = ''
}
 export const clearZoom = () => {
   zoomInventoryElement.innerHTML = ''
 }