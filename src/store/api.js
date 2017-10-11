export default {
    getStorage() {
        return localStorage['banks'] ? JSON.parse(localStorage['banks']) : []
    },

    getId() {
        return this.getStorage().length + 1
    },

    fetch() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.getStorage()), 1000)
        })
    },

    save(row) {
        const list = this.getStorage()
        
        if (row.id > 0) {
            let oldRow = list.filter((item) => item.id === row.id)[0]
            let index = list.indexOf(oldRow)
            list[index] = row
        } else {
            row.id = this.getId()
            list.push(row)
        }

        localStorage['banks'] = JSON.stringify(list)

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(list), 1000)
        })
    }
}