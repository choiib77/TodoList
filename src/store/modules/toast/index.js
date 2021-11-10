export default {
    namespaced: true,
    state: {
        toasts: [],
        // showToast : false,
        // toastMessage : '',
        // toastAlertType : '',
        // timeout : null,        
    },
    mutations: {
        // UPDATE_TOAST_STATUS (state, payload){ 
        //     state.showToast = payload;          
        // },
        // UPDATE_TOAST_MESSAGE (state, payload) {
        //     state.toastMessage = payload;        
        // },
        // UPDATE_TOAST_ALERT_TYPE (state, payload) {    
        //     state.toastAlertType = payload;               
        // },
        // UPDATE_TOAST_TIMEOUT (state, payload) {     
        //     state.timeout = payload;                    
        // },

        // toast 추가 해준다.
        ADD_TOAST (state, payload) {
            state.toasts.push(payload);
        },
        // toast 삭제 해준다.
        REMOVE_TOAST (state) {
            state.toasts.shift();
        }

    },
    actions: {
        triggerToast ( { commit },  message, type="success") {
            // commit('UPDATE_TOAST_STATUS', true);
            // commit('UPDATE_TOAST_MESSAGE', message);
            // commit('UPDATE_TOAST_ALERT_TYPE', type);
            commit('ADD_TOAST', { 
                message, 
                type
            });

            setTimeout(() => {                
                // commit('UPDATE_TOAST_STATUS', false);
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_ALERT_TYPE', '');
                commit("REMOVE_TOAST");
            }, 10000);
            
        }
    },
    getters: {
        toastMessageAdd (state) {
            return state.toastMessage + "!!!"
        }
    }
}