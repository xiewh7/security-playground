import { defineStore } from 'pinia'

const commonStore = defineStore('common', {
    state () {
        return {
            isAdmin: false
        }
    },
    actions: {
        changePermission (isAdmin) {
            this.isAdmin = isAdmin
        }
    },
    persist: true,
})

export default commonStore