<template>
    <div class="toast-box">
         <div 
            class="alert" 
            :class="`alert-${type}`"
            role="alert"
        >
            {{ message }}
        </div>
    </div>
</template>

<script>
import { useToast } from '@/composables/toast'
    export default {
        setup(){
            const { toasts } = useToast();
            return {
                toasts
            }
        }
    }
</script>

<style>
    .toast-box {
        position: fixed;
        right: 10px;
        top: 10px;
    }
</style>