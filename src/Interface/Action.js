const actionId = 'actions'
const actionsElement = document.getElementById(actionId)
const moveForwardId = 'move-forward-button'
const moveForwardElement = document.getElementById(moveForwardId)
const moveBackId = 'move-back-button'
const moveBackElement = document.getElementById(moveBackId)
const resolveId = 'actions-resolve'
const resolveElement = document.getElementById(resolveId)
import { Action } from '../Game/Action'
import { World } from '../Game/World'
import { say } from './Text'

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

export const addResolveCodeAction = (currentRoom) => {
  if (currentRoom.resolveAction !== null && currentRoom.resolveAction.isEnabled()) {
    const labelCodeElement = document.createElement('label')
    Object.assign(labelCodeElement, {
      classList: ['code-label'],
      id: 'code-label',
      innerHTML: "Enter a code to unlock the door"
    })
    resolveElement.append(labelCodeElement)

    const enterCodeElement = document.createElement('input')
    Object.assign(enterCodeElement, {
      type: 'text',
      classList: ['code-input'],
      id: 'code-input'
    })
    resolveElement.append(enterCodeElement)

    const submitCodeElement = document.createElement('button')
    Object.assign(submitCodeElement, {
      classList: ['action-button'],
      onclick: () => {
        const codeEntered = document.getElementById('code-input').value
        if (codeEntered === currentRoom.resolveAction.code) {
          say('Try the code...')
          setTimeout(() => {
            say('The door is open !')
            currentRoom.nextRoom.updateColor(),
            addMoveForwardAction(currentRoom)
            clearResolveAction()
          }, 2000)
        } else {
          console.log("wrong code")
        }
      },
      innerHTML: "Submit"
    })
    resolveElement.append(submitCodeElement)
  }
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
  const currentRoom = world.player.currentRoom
  addMoveForwardAction(currentRoom)
  addMoveBackAction(currentRoom)
  if (resolveElement.innerHTML === '') {
    addResolveCodeAction(currentRoom)
  }
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
}

export const clearResolveAction = () => {
  resolveElement.innerHTML = ''
}
