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

                <label :class="{todo:item.completed}" class="form-check-label mx-2" style="cursor:pointer;">
                    {{ item.subject }}
                </label>
            </div>

            <div>
                <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
                    Delete
                </button>
            </div>

        </div>


    </div>
</template>

<script>
    import {
        useRouter
    } from 'vue-router';

    export default {
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

            const toggleTodo = (index, event) => {
                // console.log('토글되네요~' + event.target.checked);
                emit('toggle-todo', index, event.target.checked);
            }
            const deleteTodo = (index) => {
                emit('delete-todo', index);
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
                moveToPage
            }
        }
    }
</script>

<style>

</style>