import { Button } from "@mui/material"
import { VFC } from "react"
import { Todos } from "../../../types/Todos"
import styles from "./TodoTask.module.scss"

interface Props {
  todo: Todos
  onClickComplete: (todo: Todos) => void
  onClickDelete: (id: number) => void
}

export const TodoTask: VFC<Props> = (props) => {
  const { todo, onClickComplete, onClickDelete } = props
  return (
    <div className={styles.taskWrapper}>
      <span className={todo.isCompleted ? styles.completed : ""}>
        {todo.task}
      </span>

      <Button
        className={styles.btn}
        variant="outlined"
        onClick={() => onClickComplete(todo)}
      >
        完了
      </Button>
      <Button
        className={styles.btn}
        variant="outlined"
        onClick={() => onClickDelete(todo.id)}
      >
        削除
      </Button>
    </div>
  )
}
