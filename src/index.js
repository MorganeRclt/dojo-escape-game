import { World } from './Game/World'
import { say } from './Interface/Text'
import { addAction, addMoveForwardAction, addMoveBackAction, addResolveCodeAction } from './Interface/Action'
import { drawItem } from './Interface/Inventory'
import { Item } from './Game/Item'

const main = () => {
  const world = new World('World')

  /********* Create rooms **********/
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

  /********* Create player **********/
  const player = world.createPlayer('John Doe')

  /********* Create move actions **********/
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

  /********* Create inventory **********/ 
  var inventory = world.createInventory()

  /********* Create items **********/
  const mapr1 = new Item('mapr1', "Navigation map")
  const wallr2 = new Item('wallr2', "Symbols on the wall")
  const coder3 = new Item('coder3', "Paper with a code")
  const key1r2 = new Item('key1r2', "Old key")
  const key2r3 = new Item('key2r3', "Big key")
  const key3r4 = new Item('key3r4', 'Tiny key')

  /********* Create getItemsActions **********/
  const getMapr1 = world.createGetItemsAction(
    {
      text: "Search on Captain's desk",
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

  world.createGetItemsAction(
    {
      text: "Look at the wall",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks carrefully at the wall...`)
          setTimeout(() => {
            say(`${player.name} found strange symbols on the wall, he wrote it into the ivnentary`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room2 && !inventory.hasItem(wallr2.id)
    },
    wallr2
  )

  world.createGetItemsAction(
    {
      text: "Look into the trunk",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks carrefully into the trunk...`)
          setTimeout(() => {
            say(`${player.name} found a code into the trunk !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && !inventory.hasItem(coder3.id)
    },
    coder3
  )

  world.createGetItemsAction(
    {
      text: "Look into the container",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks into the container...`)
          setTimeout(() => {
            say(`${player.name} found an old key !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room2 && !inventory.hasItem(key1r2.id)
    },
   key1r2
  )

  world.createGetItemsAction(
    {
      text: "Look under the bar",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} looks under the bar...`)
          setTimeout(() => {
            say(`${player.name} found a big key !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room3 && !inventory.hasItem(key2r3.id)
    },
   key2r3
  )

  world.createGetItemsAction(
    {
      text: "Search into the drawer",
      callback: () =>
        new Promise((resolve) => {
          say(`${player.name} searches into the drawer...`)
          setTimeout(() => {
            say(`${player.name} found a tiny key !`)
            inventory = world.updateInventory()
            resolve()
          }, 3000)
        }),
      isEnabled: () => player.currentRoom === room4 && !inventory.hasItem(key3r4.id)
    },
   key3r4
  )

  // /********** Create Resolve actions **********/
  const testResolve = world.createResolveCodeAction(
    {
      text: "Resolve code",
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
   "1234"
  )

  room1.addResolveAction(testResolve)

  /*********** Create other actions *********/
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

  world.createMoveAction(
    {
      text: 'Move to room 3',
      callback: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            say(`${player.name} found the exit 🎉`)
          }, 1200)
          resolve()
        }),
      isEnabled: () => player.currentRoom === room2 && room3.color !== 'black' && inventory.hasItemBeenUsed("key23"),
    },
    room3
  )


  world.createAction({
    text: 'Use the tiny key',
    callback: () =>
      new Promise((resolve) => {
        say(`${player.name} searches what to do ...`)
        setTimeout(() => {
          if (room3.color !== 'black' && player.currentRoom === room2) {
            say(`${player.name} open the trap door with the tiny key !`)
            inventory.useItem("key23")
            inventory = world.updateInventory()
          } else {
            say(`${player.name} don't know what to do with the key`)
          }
          // Update inventory : suppress element
          resolve()
        }, 3000)
      }),
    isEnabled: () => inventory.hasItem("key23") && !inventory.hasItemBeenUsed("key23"),
  })

  // Game begin

  setTimeout(() => {
    say(`${player.name} wakes up.`),
    addMoveForwardAction(
      player.currentRoom
    )
    addAction(getMapr1)
    addAction(initLookGround)
    addAction(initLookDoor)
    addResolveCodeAction(
      player.currentRoom
    )
    
  }, 1200)
}
void main()
