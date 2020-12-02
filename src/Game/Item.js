// Defined item that the player can find

export class Item {
    /**
     * @param {string} id - the id of the item
     * @param {string} name - the name of the item 
     */
    constructor(id, name) {
        this.name = name
        this.id = id
        this.selected = false
        this.hasBeenUsed = false
    }

    selectItem() {
        this.selected = true
    }

    unselectItem() {
        this.selected = false
    }

    useItem() {
        this.hasBeenUsed = true
    }

    /**
     * Retun tru if the item is selected in the inventory
     */
    isSelected() {
        return this.selected
    }
}