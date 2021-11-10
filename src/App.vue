<template>
  <!-- 메뉴자리 -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link 
      class="navbar-brand" 
      :to="{ name: 'Home' }"
    >
      Home
    </router-link> 

    <router-link 
      class="nav-item mr-2" 
      :to="{ name: 'Todos' }"
    >
      Todos
    </router-link>

    <router-link 
      class="nav-item mr-auto" 
      :to="{ name: 'TodoCreate' }"
    >
      할일 추가
    </router-link>

  </nav>

  <div class="container">
    <router-view></router-view>
  </div>
  <transition name="slide">
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"
    >    
    </Toast>
  </transition>
</template>

<script>
  import Toast from '@/components/Toast.vue'
  import { useToast } from '@/composables/toast'

  export default {
    components : {
      Toast
    }, 
    setup(){
    

      const {
          showToast, 
          toastMessage,
          toastAlertType,
          triggerToast
        } = useToast();

      return {
        showToast, 
        toastMessage,
        toastAlertType,
        triggerToast
      }

    }
  }
</script>

<style scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .slide-enter-from, 
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
    .slide-enter-to,
    .slide-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
</style>