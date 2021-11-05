<template>
  <div class="modal-wrapper">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
            Todo 삭제
            </h5>
        <button type="button" class="close">
          <span @click="onClose">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>정말 삭제하겠습니까?</p>
      </div>
      <div class="modal-footer">
        <button 
            type="button" 
            class="btn btn-secondary" 
            @click="onClose"
        >
            닫기
        </button>
        <button 
            type="button" 
            class="btn btn-danger"
            @click="onDelete"
            >
                삭제하기
            </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    setup(props,{emit}){
        const onClose = () => {
            emit('close');
        }
        const onDelete = () => {
            emit('delete');
        }
        return {
            onClose,
            onDelete
        }
    }
}
</script>

<style>
    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 5;
    }
</style>