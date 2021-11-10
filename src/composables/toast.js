import {computed} from 'vue';
import { useStore } from 'vuex';


export const useToast = () => {
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);
    // // Toast 관련
    // let showToast = computed(()=>store.state.toast.showToast);
    // let toastMessage = computed(()=>store.getters['toast/toastMessageAdd']);
    // let toastAlertType = computed(()=>store.state.toastAlertType);    

    const triggerToast = (message, type="success") => {
      store.dispatch('toast/triggerToast',message,type);
    }

    return {
        // showToast, 
        // toastMessage,
        // toastAlertType,
        toasts,
        triggerToast
    }
}