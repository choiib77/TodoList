<template>
    <!-- 기본 목록 출력 형태 작성 -->
    <div v-for="(item, index) in todos" :key="item.id" class="card mt-2">


        <div class="card-body p-2 d-flex align-items-center" @click="moveToPage(item.id)" style="cursor:pointer">

            <div class="flex-grow-1">
                <!-- 
              v-model 은 양향 이라서 
              어디서 바꾸었는지 코드 분석 불가능 
            -->
                <!-- <input type="checkbox" v-model="item.completed" class="form-check-input">         -->
                <input type="checkbox" :checked="item.completed" @change="toggleTodo(index, $event)" @click.stop>

                <span 
                class="ml-3"
                :class="{todo:item.completed}"
                >
                    {{ item.subject }}
                </span>
            </div>

            <div>
                <button class="btn btn-danger btn-sm" 
                @click.stop="openModal(index)"
                >
                    삭제하기
                </button>
            </div>

        </div>


    </div>
    <Modal
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
    >
        
    </Modal>

</template>

<script>
    import {
        useRouter
    } from 'vue-router';
    import Modal from '@/components/Modal.vue';
    import {ref} from 'vue';

    export default {
        components: {
            Modal
        },
        // props: ['todos'],
        props: {
            todos: {
                type: Array,
                required: true
            }
        },

        emits: [
            'toggle-todo', 'delete-todo'
        ],

        setup(props, {
            emit
        }) {
            
            const router = useRouter();
            const showModal = ref(false);

            const toggleTodo = (index, event) => {
                // console.log('토글되네요~' + event.target.checked);
                emit('toggle-todo', index, event.target.checked);
            }
            
            
            // 모달창 띄우기
            let todoDeletedId = ref(null)
            const openModal = (index) => {
                showModal.value = true;
                todoDeletedId.value = index;
            }
              const closeModal = () => {
                showModal.value = false;
                todoDeletedId.value = null;
            }
            const deleteTodo = () => {
                emit('delete-todo', todoDeletedId.value);
                showModal.value = false;
                todoDeletedId.value = null;
            }

            
            const moveToPage = (todoId) => {
                // console.log(todoId);
                // router.push('/todos/' + todoId);
                router.push({
                    name: 'Todo',
                    params: {
                        id: todoId
                    }
                });
            }

            return {
                toggleTodo,
                deleteTodo,
                moveToPage,
                showModal,
                openModal,
                todoDeletedId,
                closeModal
            }
        }
    }
</script>

<style>

</style>