import { Item } from '../Game/Item'

const inventoryId = 'inventory'
const inventoryElement = document.getElementById(inventoryId)
const zoomInventoryId = "zoom-inventory"
const zoomInventoryElement = document.getElementById(zoomInventoryId)

/**
 * 
 * @param {Item} item 
 * @param {World} world
 */
export const drawItem = (item, world) => {
    const itemElement = document.createElement('button')
    Object.assign(itemElement, {
        classList: ['item-button'],
        onclick: function() { onSelectItem(item, world) },
        id: item.id,
    })
    inventoryElement.append(itemElement)
}

export const drawUsedItem = (item, world) => {
    const itemElement = document.createElement('button')
    Object.assign(itemElement, {
        classList: ['item-button-used'],
        id: item.id,
        innerHTML: item.name
    })
    inventoryElement.append(itemElement)
}

/**
 * 
 * @param {Item} item 
 * @param {World} world 
 */
export const onSelectItem = (item, world) => {
    const selectedItem = document.getElementById(item.id)
    // TODO : improve
    unZoom()
    if (item.isSelected()) {
        selectedItem.style.color = "rgb(0, 142, 207)"
        selectedItem.style.backgroundColor = "rgb(149, 240, 239)" 
        item.unselectItem() 
    } else {
        const items = world.inventory.items
        for (let i in items) {
            items[i].unselectItem()
            document.getElementById(items[i].id).style.backgroundColor = "rgb(149, 240, 239)"
        }
        selectedItem.style.color = "rgb(149, 240, 239)"
        selectedItem.style.backgroundColor = "rgb(0, 142, 207)"
        item.selectItem()
        zoomOn(item)

    }
}

export const zoomOn = (item) => {
    const zoomElement = document.createElement('button')
    Object.assign(zoomElement, {
        classList: ['item-zoom'],
        id: item.id + '-zoom'
    })
    zoomInventoryElement.append(zoomElement)
}

export const unZoom = () => {
    zoomInventoryElement.innerHTML = ''
}

export const clearInventory = () => {
    inventoryElement.innerHTML = ''
}