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

  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  >    
  </Toast>

</template>

<script>
  import Toast from '@/components/Toast.vue'
  import { useToast } from '@/composables/toast'
  import { useStore } from 'vuex'

  export default {
    components : {
      Toast
    }, 
    setup(){
      // vuex.state 출력
      const store = useStore();
      console.log(store.state);

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

<style>

</style>