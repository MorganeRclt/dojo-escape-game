import { World } from './Game/World'
import { say } from './Interface/Text'
import { addAction, addMoveForwardAction, addMoveBackAction, addResolveRoomCodeAction, addInspectAction, addExit } from './Interface/Action'
import { drawItem } from './Interface/Inventory'
import { Item } from './Game/Item'

const main = () => {

/********************************************** CREATE WORLD ***************************************/
  
  const world = new World('World')

/********************************************** CREATE ROOMS ***************************************/
  
  const room1 = world.createRoom({
    name: 'Captain Cabin',
    isHead: true,
    },
  )
  const room2 = world.createRoom({ 
    name: 'Cargo Hold',
    xPos: 1,
    color: 'black',
    },
)
  const room3 = world.createRoom({
    name: 'Saloon',
    xPos: 2,
    color: 'black',
    },
  )
  const room4 = world.createRoom({
    name: 'Lady Room',
    xPos: 3,
    color: 'black',
    isTail: true,
    },
  )

/********************************************** CREATE PLAYER ***************************************/
  
  const player = world.createPlayer('John Doe')

/********************************************** CREATE MOVE ACTIONS ***************************************/
  
  const moveAction12 = world.createMoveAction(
    {
      text: 'Move to room 2',
      isEnabled: () => player.currentRoom === room1 && room2.color !== 'black',
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
      isEnabled: () => player.currentRoom === room2 && room3.color !== 'black',
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
      isEnabled: () => player.currentRoom === room3 && room4.color !== 'black',
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
      text: "Get items on the captain's desk",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} searches on the captain's desk...`)
          setTimeout(() => {
            say(`${player.name} found navigation map with strange indications...`)
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
      text: "Get items on the wall",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks at the wall...`)
          setTimeout(() => {
            say(`${player.name} found an American flag, with writings on it`)
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
      text: "Look under the sofa",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the sofa...`)
          setTimeout(() => {
            say(`${player.name} found a bottle (there's just enough left for a nightcap !)`)
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
      text: "Look under the counter",
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
      text: "Look on the table",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the counter...`)
          setTimeout(() => {
            say(`${player.name} found an intact bottle in the middle of the glass !`)
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
      text: "Look at the bar shelf",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks int the bar shelf...`)
          setTimeout(() => {
            say(`${player.name} found a bottle !`)
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
      text: "Look at the table",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look at the table...`)
          setTimeout(() => {
            say(`${player.name} found a music score.`)
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
      text: "Look at the sofa",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look at the sofa..`)
          setTimeout(() => {
            say(`${player.name} found a strange code.`)
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
      text: "Use old key, tiny key and big key to open the trunk",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} tries the keys..`)
          setTimeout(() => {
            say(`${player.name} has found the Lady treasure !!`)
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
      text: "Inspect the rudder",
      isEnabled: () => player.currentRoom === room1 && !inventory.hasItem(key1r2.id)
    },
    "rudderr1"
  )
  1234
  world.createInspectAction(
    {
      text: "Inspect the captain's desk",
      isEnabled: () => player.currentRoom === room1 && inventory.hasItem(mapr1.id) && !inventory.hasItem(key1r2.id)
    },
    "circler1"
  )

  world.createInspectAction(
    {
      text: "Inspect the lock of the trunk",
      isEnabled: () => player.currentRoom === room1 && player.hasDiscovered('trunkr1') && !inventory.hasItem(key1r2.id)
    },
    "circlesolr1"
  )

  /******** ROOM 2 **********/
  world.createInspectAction(
    {
      text: "Inspect the wall",
      isEnabled: () => player.currentRoom === room2 && room3.color === "black"
    },
    "symbr2"
  )

  world.createInspectAction(
    {
      text: "Inspect the door's lock",
      isEnabled: () => player.currentRoom === room2 && room3.color === "black" && room2.userHaveFoundDoor
    },
    "symbsolr2"
  )

  world.createInspectAction(
    {
      text: "Inspect room's inventory",
      isEnabled: () => player.currentRoom === room2 && !inventory.hasItem(key2r3.id)
    },
    "containerr2"
  )

  /******** ROOM 3 **********/
  world.createInspectAction(
    {
      text: "Inspect the wall at your left",
      isEnabled: () => player.currentRoom === room3 && room4.color === "black"
    },
    "morse1r3"
  )

  world.createInspectAction(
    {
      text: "Inspect the wall in front of you",
      isEnabled: () => player.currentRoom === room3 && room4.color === "black"
    },
    "morse2r3"
  )

  world.createInspectAction(
    {
      text: "Inspect the wall at your right",
      isEnabled: () => player.currentRoom === room3 && room4.color === "black"
    },
    "morse3r3"
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
      isEnabled: () => player.currentRoom === room1 && room2.color === 'black' && room1.userHaveFoundDoor
    },
   "SESENW"
  )

  world.createResolveCodeAction(
    {
      text: "Enter a code to unlock the trunk",
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
      isEnabled: () => player.currentRoom === room2 && room3.color === 'black' && room2.userHaveFoundDoor
    },
    "henry nelson"
  )

  world.createResolveCodeAction(
    {
      text: "Look in container number...",
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
            say(`${player.name} code !`)
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && room4.color === 'black' && room3.userHaveFoundDoor
    },
    "1514"
  )

  world.createResolveCodeAction(
    {
      text: "Enter a code to unlock the register",
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
    "1011931"
  )

  room1.addResolveAction(resolveRoom1)
  room2.addResolveAction(resolveRoom2)
  room3.addResolveAction(resolveRoom3)
  room4.addResolveAction(resolveRoom4)


 /********************************************** CREATE OTHER ACTIONS ***************************************/
  
  /******** ROOM 1 **********/
  const initLookGround = world.createAction(
    {
      text: "Look on the ground",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look on the ground...`)
          setTimeout(() => {
            say(`${player.name} has found a trap door, locked by a code !`)
            room1.userHaveFoundDoor = true
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room1 && !room1.userHaveFoundDoor
    }
  )

  const initLookDoor = world.createAction(
    {
      text: "Inspect the Captain's Cabin entrance door",
      callback: () => 
        new Promise((resolve) => {
          say(`${player.name} inspect the entrance door...`)
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
      text: "Look under captain's desk",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look under the captain's desk...`)
          setTimeout(() => {
            say(`${player.name} has found a trunk, closed by a code !`)
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
      text: "Look around the room",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look around the room...`)
          setTimeout(() => {
            say(`${player.name} has found a service door, locked by a code !`)
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
      text: "Look at the end of the room",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look at the end of the room...`)
          setTimeout(() => {
            say(`${player.name} has found a door, locked by a code !`)
            room3.userHaveFoundDoor = true
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room3 && !room3.userHaveFoundDoor
    }
  )

  world.createAction(
    {
      text: "Look at the bar",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look at the bar...`)
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
      text: "Look around the Lady Room",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look around the room...`)
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
      text: "Look at the big luxury trunk",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} look carefully a the trunk...`)
          setTimeout(() => {
            say(`The trunk is closed by three locks : one old, one big, on tiny.`)
            resolve()
          }, 3000)
      }),
      isEnabled: () => player.currentRoom === room4 && !inventory.hasItem(treasurer4.id)
    }
  )

/********************************************** GAME BEGIN ***************************************/
  room2.updateColor()
  room3.updateColor()
  room4.updateColor()
  setTimeout(() => {
    say(`${player.name} wakes up.`),
    addMoveForwardAction(
      player.currentRoom
    )
    addAction(getMapr1)
    addAction(getSymbr1)
    addAction(initLookGround)
    addAction(initLookDoor)
    addAction(initLookUnderDesk)
    addInspectAction(inspectActionRubber)
    addResolveRoomCodeAction(
      player.currentRoom
    )
    
  }, 1200)
}
void main()
