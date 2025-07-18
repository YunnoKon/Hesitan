// Modal State Manager with runes
export const PopUpState = $state({
    activeModal:[],
    activeAlert:[]
})

// Utilities function for management
export const createAlert = (msg) => {
    const alertId = `${Date.now()}-${Math.random().toString(36).substring(2,5)}`;
    PopUpState.activeAlert.push({
        id: alertId,
        message: msg
    })
}

export const createModal = (type,data = {}) => {
    const modalId = `${Date.now()}-${Math.random().toString(36).substring(2,5)}`;
    PopUpState.activeModal.push({
        id: modalId,
        type: type,
        data: data
    })
}