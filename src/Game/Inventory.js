import { Item } from './Item'
import { drawItem } from '../Interface/Inventory'


export class Inventory {
    constructor() {
        this.items = []
    }

    /**
     * Add an item to the inventory
     * @param {Item} item 
     */
    addItem(item) {
        this.items.push(item)
    }

    /**
     * Delete item from the inventory, if the item is in the inventory
     * @param {stirng} itemId 
     */
    deleteItem(itemId) {
        for (i in this.items) {
            if (this.items[i] == itemId) {
                this.items.splice(i, 1)
                break
            }
        }
    }

    /**
     * Return true if the player have the item, else false
     * @param {string} itemId - id of the item
     */
    hasItem(itemId) {
        for (var i in this.items) {
            if (this.items[i].id === itemId) {
                return true;
            } 
        }
        return false
    }

    getItem(itemId) {
        for (var i in this.items) {
            if (this.items[i].id === itemId) {
                return this.items[i]
            }
        }
        return null
    }

    hasItemBeenUsed(itemId) {
        for (var i in this.items) {
            if (this.items[i].id === itemId) {
                return this.items[i].hasBeenUsed;
            } 
        }
        return false
    }

    useItem(itemId) {
        const item = this.getItem(itemId)
        if (item != null) {
            item.useItem()
        }
    }
}