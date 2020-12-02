import { Room } from '../Game/Room'
import { Player } from '../Game/Player'
import { World } from '../Game/World'

const canvasId = 'map'
const scaling = 100
const playerSize = 1 / 10

const mapCanvas = document.getElementById(canvasId)
const mapContext = mapCanvas.getContext('2d')

/**
 * @param {Room} room - The room to draw
 */
export const drawRoom = (room) => {
  mapContext.fillStyle = room.color
  if (room.isHead) {
    drawHead(room)
  } else if (room.isTail) {
    drawTail(room)
  } else {
    drawRect(room)
  }
}

export const drawRect = (room) => {
  mapContext.fillRect(
    room.xPos * scaling,
    room.yPos * scaling,
    room.width * scaling,
    room.height * scaling
  )
}

export const drawHead = (room) => {
  mapContext.beginPath()
  mapContext.moveTo(
    (room.xPos + 0.5) * scaling,
    room.yPos * scaling
  )
  mapContext.lineTo(
    (room.xPos + 1) * scaling,
    room.yPos * scaling
  )
  mapContext.lineTo(
    (room.xPos + 1) * scaling,
    (room.yPos + 1) * scaling
  )
  mapContext.lineTo(
    (room.xPos + 0.5) * scaling,
    (room.yPos + 1) * scaling
  )
  mapContext.bezierCurveTo(
    (room.xPos - 0.1) * scaling, (room.yPos + 1) * scaling,
    (room.xPos - 0.1) * scaling, room.yPos * scaling,
    (room.xPos + 0.5) * scaling, room.yPos * scaling
  )
  mapContext.fill()
}

export const drawTail = (room) => {
  mapContext.beginPath()
  mapContext.moveTo(
    room.xPos * scaling,
    room.yPos * scaling
  )
  mapContext.lineTo(
    (room.xPos + 0.5) * scaling,
    room.yPos * scaling,
  )
  mapContext.bezierCurveTo(
    (room.xPos + 1.1) * scaling, room.yPos * scaling,
    (room.xPos + 1.1) * scaling, (room.yPos + 1) * scaling,
    (room.xPos + 0.5) * scaling, (room.yPos + 1) * scaling
  )
  mapContext.lineTo(
    room.xPos * scaling,
    (room.yPos + 1) * scaling
  )
  mapContext.closePath()
  mapContext.fill()
}

/**
 * @param {Player} player - The player to draw
 */
export const drawPlayer = (player) => {
  mapContext.fillStyle = 'rgb(255, 165, 0)'
  const playerXPos =
    (player.currentRoom.xPos + player.currentRoom.width / 2) * scaling
  const playerYPos =
    (player.currentRoom.yPos + player.currentRoom.height / 2) * scaling
  mapContext.beginPath()
  mapContext.arc(
    playerXPos,
    playerYPos,
    playerSize * scaling,
    0,
    Math.PI * 2,
    true
  )
  mapContext.fill()
}

/**
 * @param {Player} player - The player to erase
 */
export const erasePlayer = (player) => {
  mapContext.fillStyle = player.currentRoom.color
  mapContext.strokeStyle = player.currentRoom.color
  const playerXPos =
    (player.currentRoom.xPos + player.currentRoom.width / 2) * scaling
  const playerYPos =
    (player.currentRoom.yPos + player.currentRoom.height / 2) * scaling
  mapContext.beginPath()
  mapContext.arc(
    playerXPos,
    playerYPos,
    playerSize * scaling,
    0,
    Math.PI * 2,
    true
  )
  mapContext.fill()
  mapContext.stroke()
}

/**
 * Draw a given world.
 * @param {World} world - The world to draw.
 */
export const drawMap = (world) => {
  world.rooms.forEach(drawRoom)
  drawPlayer(world.player)
}
