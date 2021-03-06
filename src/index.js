//import "bootstrap"
import { World } from './Game/World'
import { say } from './Interface/Text'
import { addAction, addMoveForwardAction, addMoveBackAction, addResolveRoomCodeAction, addInspectAction, addExit, addTimer } from './Interface/Action'
import { drawItem } from './Interface/Inventory'
import { Item } from './Game/Item'
import { Timer } from './Game/Timer'

var namePlayer = "John Doe"

const game = () => {
  const backgroundColor = window.getComputedStyle( document.body ,null).getPropertyValue('background-color'); 

/********************************************** CREATE WORLD ***************************************/
  
  const world = new World('World')

/********************************************** CREATE ROOMS ***************************************/
  
  const room1 = world.createRoom({
    name: 'Captain Cabin',
    isHead: true,
    finalColor : "rgb(163, 58, 24)"
    },
  )
  const room2 = world.createRoom({ 
    name: 'Cargo Hold',
    xPos: 1,
    color: backgroundColor,
    finalColor: "rgb(201, 99, 62)"
    },
)
  const room3 = world.createRoom({
    name: 'Saloon',
    xPos: 2,
    color: backgroundColor,
    finalColor: "rgb(206, 140, 82)"
    },
  )
  const room4 = world.createRoom({
    name: 'Lady Room',
    xPos: 3,
    color: backgroundColor,
    finalColor: "rgb(244, 211, 159)",
    isTail: true,
    },
  )

/********************************************** CREATE PLAYER ***************************************/
  
  const player = world.createPlayer(namePlayer)

/********************************************** CREATE MOVE ACTIONS ***************************************/
  
  const moveAction12 = world.createMoveAction(
    {
      text: 'Move to room 2',
      isEnabled: () => player.currentRoom === room1 && room2.color !== backgroundColor,
    },
    room2
  )

  const moveAction21 = world.createMoveAction(
    {
      text: 'Move to room 1',
      isEnabled: () => player.currentRoom === room2,
    },
    room1
  )

  const moveAction23 = world.createMoveAction(
    {
      text: 'Move to room 3',
      isEnabled: () => player.currentRoom === room2 && room3.color !== backgroundColor,
    },
    room3
  )

  const moveAction32 = world.createMoveAction(
    {
      text: 'Move to room 2',
      isEnabled: () => player.currentRoom === room3,
    },
    room2
  )

  const moveAction34 = world.createMoveAction(
    {
      text: 'Move to room 4',
      isEnabled: () => player.currentRoom === room3 && room4.color !== backgroundColor,
    },
    room4
  )

  const moveAction43 = world.createMoveAction(
    {
      text: 'Move to room 3',
      isEnabled: () => player.currentRoom === room4,
    },
    room3
  )

  room1.addMoveActions(moveAction12, null)
  room2.addMoveActions(moveAction23, moveAction21)
  room3.addMoveActions(moveAction34, moveAction32)
  room4.addMoveActions(null, moveAction43)

  room1.addNextRoom(room2)
  room2.addNextRoom(room3)
  room3.addNextRoom(room4)

/********************************************** INVENTORY AND ITEMS ***************************************/

  var inventory = world.createInventory()

  /********* Create items **********/
  const mapr1 = new Item('mapr1', "Navigation map", "assets/icon-map.png", "")
  const symbr1 = new Item('symbr1', "American flag with symbols", "", "")
  const key1r2 = new Item('key1r2', "Old key", "", "")
  const key2r3 = new Item('key2r3', "Big key", "", "")
  const key3r4 = new Item('key3r4', 'Tiny key', "", "")
  const bottle1r3 = new Item('bottle1r3', 'Bottle', "", "")
  const bottle2r3 = new Item('bottle2r3', 'Bottle', "", "")
  const bottle3r3 = new Item('bottle3r3', 'Bottle', "", "")
  const bottle4r3 = new Item('bottle4r3', 'Bottle', "", "")
  const scorer4 = new Item('scorer4', "Music Score", "", "")
  const pianosolr4 = new Item('pianosolr4', 'Strange code', "", "")
  const treasurer4 = new Item('treasurer4', "Treasure of the Lady", "", "")

  /********************************************** CREATE GETITEMSACTIONS ***************************************/

  /******** ROOM 1 **********/
  const getMapr1 = world.createGetItemsAction(
    {
      text: "Get items on the captain's desk  &#128110;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} searches on the captain's desk...`)
          setTimeout(() => {
            say(`${player.name} finds a navigation map with strange indications...`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room1 && !inventory.hasItem(mapr1.id)
    },
    mapr1
  )

  const getSymbr1 = world.createGetItemsAction(
    {
      text: "Get items on the wall &#11036;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks at the wall...`)
          setTimeout(() => {
            say(`${player.name} finds a flag, with writings on it`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room1 && !inventory.hasItem(symbr1.id)
    },
    symbr1
  )

  /******** ROOM 3 **********/

  world.createGetItemsAction(
    {
      text: "Look under the sofa  &#128715;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the sofa...`)
          setTimeout(() => {
            say(`${player.name} finds a bottle (there's just enough left for a last glass !)`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && !inventory.hasItem(bottle1r3.id)
    },
    bottle1r3
  )

  world.createGetItemsAction(
    {
      text: "Look under the counter &#127866;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the counter...`)
          setTimeout(() => {
            say(`${player.name} found a full bottle !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && !inventory.hasItem(bottle2r3.id)
    },
    bottle2r3
  )

  world.createGetItemsAction(
    {
      text: "Look on the table  &#127867;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the table...`)
          setTimeout(() => {
            say(`${player.name} finds a bottle hidden under seaweeds !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && !inventory.hasItem(bottle3r3.id)
    },
    bottle3r3
  )

  world.createGetItemsAction(
    {
      text: "Look at the bar shelf  &#127870;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks into the bar shelf...`)
          setTimeout(() => {
            say(`${player.name} finds a bottle !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && !inventory.hasItem(bottle4r3.id)
    },
    bottle4r3
  )

  /******** ROOM 4 **********/
  world.createGetItemsAction(
    {
      text: "Look at the table  &#127869;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks at the table...`)
          setTimeout(() => {
            say(`${player.name} finds a music score.`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room4 && !inventory.hasItem(scorer4.id)
    },
    scorer4
  )

  world.createGetItemsAction(
    {
      text: "Look at the sofa  &#128715;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks at the sofa...`)
          setTimeout(() => {
            say(`${player.name} finds a strange code.`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room4 && !inventory.hasItem(pianosolr4.id)
    },
    pianosolr4
  )

  
  world.createGetItemsAction(
    {
      text: "Use old key, tiny key and big key to open the trunk  &#128273;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} tries the keys...`)
          setTimeout(() => {
            say(`${player.name} finds President Coolidge's treasure !!`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room4 && inventory.hasItem(key1r2.id) && inventory.hasItem(key2r3.id) 
                        && inventory.hasItem(key3r4.id) && !inventory.hasItem(treasurer4.id)
    },
    treasurer4
  )

 /********************************************** CREATE INSPECT ACTIONS ***************************************/
  
  /******** ROOM 1 **********/
  const inspectActionRubber = world.createInspectAction(
    {
      text: "Inspect the rudder  &#128674;",
      isEnabled: () => player.currentRoom === room1 && !inventory.hasItem(key1r2.id)
    },
    "rudderr1"
  )
  1234
  world.createInspectAction(
    {
      text: "Inspect the captain's desk   &#128110;",
      isEnabled: () => player.currentRoom === room1 && inventory.hasItem(mapr1.id) && !inventory.hasItem(key1r2.id)
    },
    "circler1"
  )

  world.createInspectAction(
    {
      text: "Inspect the lock of the trunk  &#128271;",
      isEnabled: () => player.currentRoom === room1 && player.hasDiscovered('trunkr1') && !inventory.hasItem(key1r2.id)
    },
    "circlesolr1"
  )

  /******** ROOM 2 **********/
  world.createInspectAction(
    {
      text: "Inspect the wall  &#11036;",
      isEnabled: () => player.currentRoom === room2 && room3.color === backgroundColor
    },
    "symbr2"
  )

  world.createInspectAction(
    {
      text: "Inspect the door's lock   &#128271;",
      isEnabled: () => player.currentRoom === room2 && room3.color === backgroundColor && room2.userHaveFoundDoor
    },
    "symbsolr2"
  )

  world.createInspectAction(
    {
      text: "Inspect room's inventory  &#128220;",
      isEnabled: () => player.currentRoom === room2 && !inventory.hasItem(key2r3.id)
    },
    "containerr2"
  )

  /******** ROOM 3 **********/
  world.createInspectAction(
    {
      text: "Inspect the wall to your left  &#11036;",
      isEnabled: () => player.currentRoom === room3 && room4.color === backgroundColor
    },
    "morse1r3"
  )

  world.createInspectAction(
    {
      text: "Inspect the wall in front of you  &#11036;",
      isEnabled: () => player.currentRoom === room3 && room4.color === backgroundColor
    },
    "morse2r3"
  )

  world.createInspectAction(
    {
      text: "Inspect the wall to your right  &#11036;",
      isEnabled: () => player.currentRoom === room3 && room4.color === backgroundColor
    },
    "morse3r3"
  )

  world.createInspectAction(
    {
      text: "Inspect the piano  &#127929;",
      isEnabled: () => player.currentRoom === room3 && !player.exit
    },
    "pianor3"
  )


 /********************************************** CREATE RESOLVE CODE ACTION ***************************************/

   /******** ROOM 1 **********/
  const resolveRoom1 = world.createResolveRoomCodeAction(
    {
      text: "Resolve code for door Room1",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} enter the code...`)
          setTimeout(() => {
            say(`${player.name} code !`)
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room1 && room2.color === backgroundColor && room1.userHaveFoundDoor
    },
   "SESENW",
   "Use only the navigation map",
   "This code is composed by letters S, N, E, W"
  )

  world.createResolveCodeAction(
    {
      text: "Enter a code to unlock the trunk  &#128274;",
      callback: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            inventory = world.updateInventory()
            resolve()
          }, 10)
        }),
      isEnabled: () => player.currentRoom === room1 && player.hasDiscovered('trunkr1') && !inventory.hasItem(key1r2.id)
    },
    "15167",
    "Use the rubber and the cross with digits on the captain's desk",
    "Each symbol on the rubber corresponds to a digit",
    "trunkr1",
    "trunk",
    key1r2
  )

  /******** ROOM 2 **********/
  const resolveRoom2 = world.createResolveRoomCodeAction(
    {
      text: "Resolve code for Room2",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} enter the code...`)
          setTimeout(() => {
            say(`${player.name} code !`)
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room2 && room3.color === backgroundColor && room2.userHaveFoundDoor
    },
    "henry nelson",
    "Use the symbols found in captain's room and those on the wall",
    "The code is a name, with a space between name and forename"
  )

  world.createResolveCodeAction(
    {
      text: "Look in container number...  &#128230;",
      callback: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            inventory = world.updateInventory()
            resolve()
          }, 10)
        }),
      isEnabled: () => player.currentRoom === room2 && !inventory.hasItem(key2r3.id)
    },
    "C6",
    "Use only the container's inventory",
    "All symbols are repeated 4 times, except one",
    "containerr2",
    "container",
    key2r3
  )

  /******** ROOM 3 **********/
  const resolveRoom3 = world.createResolveRoomCodeAction(
    {
      text: "Resolve code for foor Room3",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} enters the code...`)
          setTimeout(() => {
            console.log("callback init")
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && room4.color === backgroundColor && room3.userHaveFoundDoor
    },
    "1514",
    "Use only the morse code on the wall, find first a code with 5 letters",
    "The final code is composed by 4 digits"
  )

  world.createResolveCodeAction(
    {
      text: "Enter a code to unlock the register  &#128176;",
      callback: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          inventory = world.updateInventory()
          resolve()
        }, 10)
      }),
      isEnabled: () => player.currentRoom === room3 && player.hasDiscovered('registerr3') && !inventory.hasItem(key3r4.id)
    },
    "1942",
    "Use the four bottles",
    "Look at the level of the bottles",
    "registerr3",
    "register",
    key3r4
  )

  /******** ROOM 3 **********/
  const resolveRoom4 = world.createResolveRoomCodeAction(
    {
      text: "Resolve code for foor Room4",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} enters the code...`)
          setTimeout(() => {
            say(`${player.name} code !`)
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room4 && room4.userHaveFoundDoor && !player.exit
    },
    "1011931",
    "Use the piano, the score and the paper with lines (and Internet if you're not a musician)",
    "The first piano-key is a do. The score gives the order, and the lines give the associated number."
  )

  room1.addResolveAction(resolveRoom1)
  room2.addResolveAction(resolveRoom2)
  room3.addResolveAction(resolveRoom3)
  room4.addResolveAction(resolveRoom4)


 /********************************************** CREATE OTHER ACTIONS ***************************************/
  
  /******** ROOM 1 **********/
  const initLookGround = world.createAction(
    {
      text: "Look on the ground  &#9973;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks on the ground...`)
          setTimeout(() => {
            say(`${player.name} finds a trap door, locked by a code !`)
            room1.userHaveFoundDoor = true
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room1 && !room1.userHaveFoundDoor
    }
  )

  const initLookDoor = world.createAction(
    {
      text: "Inspect the Captain's Cabin entrance door  🚪",
      callback: () => 
        new Promise((resolve) => {
          say(`${player.name} inspects the entrance door...`)
          setTimeout(() => {
            say(`No way, the door is blocked. Find another exit !`)
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room1
    }
  )

  const initLookUnderDesk = world.createAction(
    {
      text: "Look under the captain's desk  &#128110;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the captain's desk...`)
          setTimeout(() => {
            say(`${player.name} finds a trunk, closed by a code !`)
            player.doDiscover('trunkr1')
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room1 && !player.hasDiscovered('trunkr1')
    }
  )

  /******** ROOM 2 **********/
  world.createAction(
    {
      text: "Look around the room  &#9973;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks around the room...`)
          setTimeout(() => {
            say(`${player.name} finds a service door, locked by a code !`)
            room2.userHaveFoundDoor = true
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room2 && !room2.userHaveFoundDoor
    }
  )

  /******** ROOM 3 **********/
  world.createAction(
    {
      text: "Look at the back of the room  &#9973;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks at the back of the room...`)
          setTimeout(() => {
            say(`${player.name} finds a door, locked by a code !`)
            room3.userHaveFoundDoor = true
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room3 && !room3.userHaveFoundDoor
    }
  )

  world.createAction(
    {
      text: "Look at the bar  &#129347;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks at the bar...`)
          setTimeout(() => {
            say(`${player.name} has found the register, it's locked by a code !`)
            player.doDiscover('registerr3')
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room3 && !player.hasDiscovered('registerr3')
    }
  )

  /******** ROOM 4 **********/
  world.createAction(
    {
      text: "Look around the Lady Room  &#9973;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks around the room...`)
          setTimeout(() => {
            say(`${player.name} has found an exit door locked by a code !`)
            room4.userHaveFoundDoor = true
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room4 && !room4.userHaveFoundDoor
    }
  )

  world.createAction(
    {
      text: "Look at the big luxury trunk  &#128180;",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks carefully at the trunk...`)
          setTimeout(() => {
            say(`The trunk is closed by three locks : one old, one big, on tiny.`)
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room4 && !inventory.hasItem(treasurer4.id)
    }
  )

/********************************************** CREATE TIMER ***************************************/
  const timer = world.createTimer()

/********************************************** GAME BEGIN ***************************************/
  setTimeout(() => {
    say(`Good luck ${player.name} !`),
    addMoveForwardAction(
      player.currentRoom
    )
    addMoveBackAction(
      player.currentRoom
    )
    addAction(getMapr1)
    addAction(getSymbr1)
    addAction(initLookGround)
    addAction(initLookDoor)
    addAction(initLookUnderDesk)
    addInspectAction(inspectActionRubber, world)
    addResolveRoomCodeAction(
      player.currentRoom
    )
    timer.start()
    addTimer(timer)
    
  }, 1200)
}

const setName = () => {
  const newName = document.getElementById("namePlayer").value
  if (newName.length != 0) {
    namePlayer = newName
  }
}

const beginning = () => {
  document.getElementById("start-game").addEventListener("click", beginGame)
}

const beginGame = () => {
  setName()
  document.getElementById("beginning-game").style.display = "none"
  document.getElementById("game").style.display = "block"
  game()
}

void beginning()
