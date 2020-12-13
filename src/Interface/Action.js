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
const timerId = "timer"
const timerElement = document.getElementById(timerId)
const arrowForwardStyle = document.getElementById("arrow-forward").style
const arrowBackStyle = document.getElementById("arrow-back").style

import { Action } from '../Game/Action'
import { World } from '../Game/World'
import { say } from './Text'
import { clearInventory } from './Inventory'
import { Timer } from '../Game/Timer'

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

export const addResolveRoomCodeAction = (currentRoom, world) => {
  if (currentRoom.resolveAction !== null && currentRoom.resolveAction.isEnabled()) {
    const resolveCodeElement = document.createElement('div')
    Object.assign(resolveCodeElement, {
      id: 'resolve-room'
    })

    const labelCodeElement = document.createElement('div')
    Object.assign(labelCodeElement, {
      classList: ['code-label'],
      id: 'code-label',
      innerHTML: "Enter a code to unlock the door  🚪"
    })
    resolveCodeElement.append(labelCodeElement)

    const enterCodeElement = document.createElement('input')
    Object.assign(enterCodeElement, {
      type: 'text',
      classList: ['code-input'],
      id: 'code-input',
    })
    resolveCodeElement.append(enterCodeElement)

    const submitCodeElement = document.createElement('button')
    Object.assign(submitCodeElement, {
      classList: ['action-resolve-button'],
      onclick: () => {
        const codeEntered = document.getElementById('code-input').value
        say('Try the code...')
        if (codeEntered.toUpperCase() === currentRoom.resolveAction.code.toUpperCase()) {
          setTimeout(() => {
            say('The door is open !')
            if (currentRoom.nextRoom != null) {
              currentRoom.nextRoom.updateColor(),
              addMoveForwardAction(currentRoom)
            } else {
              addExit(world)
              world.player.exit = true
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
      innerHTML: "✔"
    })
    resolveCodeElement.append(submitCodeElement)

    const clueButtonElement1 = document.createElement('button')
    Object.assign(clueButtonElement1, {
      classList: ["clue-button"],
      id: "clue1-" + currentRoom.resolveAction.identifier,
      onclick: () => {
        selectClue(currentRoom.resolveAction.identifier, currentRoom.resolveAction.clue1, 1)
      },
      innerHTML: "?"
    })
    resolveCodeElement.append(clueButtonElement1)

    const clueButtonElement2 = document.createElement('button')
    Object.assign(clueButtonElement2, {
      classList: ["clue-button"],
      id: "clue2-" + currentRoom.resolveAction.identifier,
      onclick: () => {
        selectClue(currentRoom.resolveAction.identifier, currentRoom.resolveAction.clue2, 2)
      },
      innerHTML: "?"
    })
    resolveCodeElement.append(clueButtonElement2)

    const clueTextElement = document.createElement("div")
    Object.assign(clueTextElement, {
      classList: ["clue-text"],
      id: "cluetext-" + currentRoom.resolveAction.identifier,
      innerHTML: ""
    })
    resolveCodeElement.append(clueTextElement)

    resolveElement.append(resolveCodeElement)
  }
}

export const addInspectAction = (action, world) => {
  const actionElement = document.createElement('button')
  Object.assign(actionElement, {
    classList: ['action-button'],
    onclick: () => {
      clearZoom(world)
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

  const labelCodeElement = document.createElement('div')
  Object.assign(labelCodeElement, {
    classList: ['code-label'],
    id: 'code-label-' + action.itemId,
    for: 'code-input-' + action.itemId,
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
    classList: ['action-resolve-button'],
    onclick: () => {
      const codeEntered = document.getElementById('code-input-' + action.itemId).value
      say('Try the code...')
      if (codeEntered.toUpperCase() === action.code.toUpperCase()) {
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
    innerHTML: "✔"
  })
  resolveCodeElement.append(submitCodeElement)

  const clueButtonElement1 = document.createElement('button')
  Object.assign(clueButtonElement1, {
    classList: ["clue-button"],
    id: "clue1-" + action.itemId,
    onclick: () => {
      selectClue(action.itemId, action.clue1, 1)
    },
    innerHTML: "?"
  })
  resolveCodeElement.append(clueButtonElement1)

  const clueButtonElement2 = document.createElement('button')
  Object.assign(clueButtonElement2, {
    classList: ["clue-button"],
    id: "clue2-" + action.itemId,
    onclick: () => {
      selectClue(action.itemId, action.clue2, 2)
    },
    innerHTML: "?"
  })
  resolveCodeElement.append(clueButtonElement2)

  const clueTextElement = document.createElement("div")
  Object.assign(clueTextElement, {
    classList: ["clue-text"],
    id: "cluetext-" + action.itemId,
    innerHTML: ""
  })
  resolveCodeElement.append(clueTextElement)

  resolveElement.append(resolveCodeElement)
}

export const selectClue = (actionId, clue, clueNb) => {
  const clueTextElement = document.getElementById("cluetext-" + actionId)
  const clueButtonElement = document.getElementById("clue" + clueNb + "-" + actionId)
  let clueButtonOtherElement = document.getElementById("clue1-" + actionId)
  if (clueNb === 1) {
    clueButtonOtherElement = document.getElementById("clue2-" + actionId)
  }

  if (clueTextElement.innerHTML === "") {
    clueTextElement.innerHTML = clue
    clueButtonElement.style.background = "white"
    clueButtonElement.style.color = "rgb(1, 41, 93)"
  } else if (clueTextElement.innerHTML === clue) {
    clueTextElement.innerHTML = ""
    clueButtonElement.style.background = "rgb(1, 41, 93)"
    clueButtonElement.style.color = "white"
  } else if (clueTextElement.innerHTML !== clue) {
    clueTextElement.innerHTML = clue
    clueButtonElement.style.background = "white"
    clueButtonElement.style.color = "rgb(1, 41, 93)"
    clueButtonOtherElement.style.background = "rgb(1, 41, 93)"
    clueButtonOtherElement.style.color = "white"
  }
}

export const addMoveForwardAction = (currentRoom) => {
  if (currentRoom.forwardAction !== null && currentRoom.forwardAction.isEnabled()) {
    moveForwardElement.onclick = currentRoom.forwardAction.callback
    arrowForwardStyle.color = "white"
  } else  {
    moveForwardElement.onclick = () => {}
    arrowForwardStyle.color = "rgb(1, 41, 93)"
  }
}

export const addMoveBackAction = (currentRoom) => {
  if (currentRoom.backAction !== null && currentRoom.backAction.isEnabled()) {
    moveBackElement.onclick = currentRoom.backAction.callback
    arrowBackStyle.color = "white"
  } else {
    moveBackElement.onclick = () => {}
    arrowBackStyle.color = "rgb(1, 41, 93)"
  }
}

export const addTimer = (timer) => {
  const newTimerElement = document.createElement('div')
      Object.assign(newTimerElement, {
          classList: ['timer'],
          id: "timer",
          innerHTML: timer.timerString
      })
  timerElement.append(newTimerElement)
}

export const updateTimer = (timer) => {
  timerElement.innerHTML = timer.timerString
}

/**
 * Add all enabled action for current state
 * @param {World} world
 */
export const addEnabledActions = (world) => {
  world.actions.forEach((action) => action.isEnabled() && addAction(action))
  world.actionsInspect.forEach((action) => action.isEnabled() && addInspectAction(action, world))
  world.actionsResolve.forEach((action) => action.isEnabled() && addResolveCodeAction(action))
  const currentRoom = world.player.currentRoom
  addMoveForwardAction(currentRoom)
  addMoveBackAction(currentRoom)
  addResolveRoomCodeAction(currentRoom, world)
}

export const addExit = (world) => {
  if (document.getElementById("exitButton") === null) {
    const exitButton = document.createElement("button")
    Object.assign(exitButton, {
      classList: ["exit-button"],
      id: "exitButton",
      onclick: () => {
        clearActions()
        clearZoom(world)
        clearInventory()
        if (world.inventory.hasItem("treasurer4")) {
          endGame(2)
        } else {
          endGame(1)
        }
      },
      innerHTML: "Escape the boat"
    })
    exitElement.append(exitButton)

    const exitText = document.createElement("p")
    Object.assign(exitText, {
      classList: ["indication"],
      innerHTML: "! You can't go back to the boat after escaping !"
    })
    exitElement.append(exitText)
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
  clearResolveActions()
}

export const clearResolveActions = () => {
  resolveElement.innerHTML = ''
}
 export const clearZoom = (world) => {
   zoomInventoryElement.innerHTML = ''
   const items = world.inventory.items
        for (let i in items) {
            items[i].unselectItem()
            document.getElementById(items[i].id).style.backgroundColor = "rgb(149, 240, 239)"
        }
 }

/**
 * Called when the game end
 * @param {Int} endingCode - 0, 1 or 2 : 0 if failure, 1 if escape but no treasure, 2 if escape with the treasure
 */
export const endGame = (endingCode) => {
  document.getElementById("game").style.display = "none"
  document.getElementById("end-game").style.display = "block"
  if (endingCode === 0) {
    document.getElementById("end-game").innerHTML = "Time is over, you run out of oxygen !"
  } else if (endingCode === 1) {
    document.getElementById("end-game").innerHTML = "Congratulation, you escaped the boat ! But the treasure will last forever in the wreck of SS president Coolidge..."
  } else {
    document.getElementById("end-game").innerHTML = "Congratulation, you escaped the boat and you found the treasure ! What an adventure..."
  }
}