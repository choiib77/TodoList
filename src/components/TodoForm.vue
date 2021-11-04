<template>
    <Toast 
    v-if="showToast" 
    :message="toastMassage" 
    :type="toastAlertType"
    />
    <div v-if="loading">
        Loading...
    </div>

    <form 
    v-else
    @submit.prevent="onSave"
    >
        <div class="row">
        <div class="col-6">
            <div class="form-group">
            <label>Subject</label>
            <input 
            type="text" 
            v-model="todo.subject" 
            class="form-control"
            >
            </div>
        </div>

    <!-- 내용을 수정.. 편집하는 form
         상태를 바꾸는 버튼은 필요없다  -->
        <div 
        v-if="editing"
        class="col-6"
        >
            <div class="form-group">
            <label>Status</label>
            <div>
            <button 
            class="btn"
            :class="todo.completed ? 'btn-success': 'btn-danger'"
            type="button"
            @click="toggleTodoStatus"
            >
                {{todo.completed ?'Completed' :'Incompeted'}}
            </button>
            </div>
            </div>
        </div>

        <!-- 내용을 입력하는 장소 -->
        <div class="col-12">
            <div class="form-group">
                <label>내용</label>
                <textarea 
                    v-model="todo.body"
                    class="form-control" 
                    cols="30" 
                    rows="10"
                ></textarea>
            </div>
        </div>
    </div>
    <button 
    class="btn btn-primary"
    type="submit"
    :disabled = 'todoUpdated'
    >
    {{editing ? 'Update':'Add'}}
    </button>
    <button
    type="button" 
    class="btn btn-outline-dark ml-2"
    @click="moveToListPage"
    >
        Cancel
        </button>
    </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'loadsh';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

    export default {
        components: {
        Toast
        },
        props : {
            editing: {
                type : Boolean,
                default:false
            }
        },
        setup(props) {

        const route = useRoute();
        const router = useRouter();

        const todo = ref({
            subject : '',
            completed : false,
            body: ''
        });   // 계속 변하는 데이터
        const originalTodo = ref(null); // 원본 보관용

        const loading = ref(true);
        const userId = route.params.id;

        // Toast 관련

        const {
            showToast,
            toastMassage,
            toastAlertType,
            triggerToast
        } = useToast();

        const getTodo = async () => {
            loading.value = true;
            try {
            const res = await axios.get(`http://localhost:3000/todo/${userId}`)
            // console.log(res.data);
            todo.value = {...res.data};
            originalTodo.value = {...res.data};
            loading.value = false;
            }catch(error){
                loading.value = false;
                console.log(error);
                triggerToast('서버가 연결되지 않습니다. 확인해주세요.','danger');
            }
        }

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        }

            const todoUpdated = computed( () => {
            // console.log(_.isEqual(todo.value, originalTodo.value));
            return _.isEqual(todo.value, originalTodo.value);
            });
        const moveToListPage = () => {
            router.push({
            name: 'Todos'
            });
        }

        const onSave = async () => {
            try{
                let res;
                const data = {
                subject : todo.value.subject,
                completed: todo.value.completed,
                body:todo.value.body
                }

                if(props.editing){
                    res = await axios.put(`http://localhost:3000/todo/${userId}`,data);
                    // 새롭게 데이터를 갱신한다.
                    originalTodo.value = {...res.data}
                    showToast.value = true;
                    triggerToast("업데이트가 되었습니다");
                }else{
                    res = await axios.post('http://localhost:3000/todo',data);
                    triggerToast("추가 되었습니다");
                    todo.value.subject = '';
                    todo.value.body = '';
                }
            
            }catch(error){
            console.log(error);
            triggerToast('서버 업데이트가 실패하였습니다.','danger');
            }
            
        }
        getTodo();

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToListPage,
            onSave,
            todoUpdated,
            
            showToast,
            toastMassage,
            toastAlertType
        }
        }

    }
</script>

<style>

</style>