import {ref, onUnmounted} from 'vue';

export const useToast = () => {
    // Toast 관련
    let showToast = ref(false);
    let toastMessage = ref('');
    let toastAlertType = ref(''); 
    let timeout = ref(null);       

    // 마지막 메모리 정리를 할 수 있는 시간입니다.
    onUnmounted(() => {
      clearTimeout(timeout.value);
    });

    const triggerToast = (message, type="success") => {
      showToast.value = true;
      toastMessage.value = message;
      toastAlertType.value = type;
      timeout.value = setTimeout(() => {        
        showToast.value = false;
        toastMessage.value = '';
        toastAlertType.value = '';
      }, 5000);
    }

    return {
        showToast, 
        toastMessage,
        toastAlertType,
        triggerToast
    }
}