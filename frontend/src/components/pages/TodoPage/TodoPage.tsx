import { memo, VFC } from "react"
import styles from "./ToDoPage.module.scss"
import { InputTodo } from "../../molecules/InputTodo/InputTodo"

import { TodoTask } from "../../molecules/TodoTask/TodoTask"
import { useTodo } from "../../../hooks/useTodo"

export const TodoPage: VFC = memo(() => {
  const { actions, state } = useTodo()

  return (
    <div>
      <h1 className={styles.title}>React Todo App</h1>
      <InputTodo
        onChangeInputValue={actions.onChangeInputValue}
        onClickTodoAdd={actions.onClickTodoAdd}
        inputTodo={state.inputTodo}
      />

      <div className={styles.todoWrapper}>
        {state.todos.map((todo) => (
          <TodoTask
            key={todo.id}
            todo={todo}
            onClickComplete={actions.onClickComplete}
            onClickDelete={actions.onClickDelete}
          />
        ))}
      </div>
    </div>
  )
})
