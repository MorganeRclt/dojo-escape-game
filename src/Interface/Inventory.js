import { Item } from '../Game/Item'

const inventoryId = 'inventory'
const inventoryElement = document.getElementById(inventoryId)

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
        innerHTML: item.name
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
    if (item.isSelected()) {
        selectedItem.style.color = "white"
        selectedItem.style.backgroundColor = "black" 
        item.unselectItem() 
    } else {
        selectedItem.style.color = "black"
        selectedItem.style.backgroundColor = "white"
        item.selectItem()

    }
}

export const clearInventory = () => {
    inventoryElement.innerHTML = ''
}