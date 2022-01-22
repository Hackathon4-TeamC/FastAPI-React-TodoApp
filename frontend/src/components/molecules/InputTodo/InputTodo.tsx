import { Button, TextField } from "@mui/material"
import { ChangeEventHandler, memo, VFC } from "react"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import styles from "./InputTodo.module.scss"

interface Props {
  onChangeInputValue: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  inputTodo: string
  onClickTodoAdd: () => void
}

export const InputTodo: VFC<Props> = memo((props) => {
  const { onChangeInputValue, inputTodo, onClickTodoAdd } = props

  return (
    <div className={styles.inputWrapper}>
      <TextField
        id="standard-search"
        label="タスクを入力"
        type="search"
        variant="standard"
        onChange={onChangeInputValue}
        value={inputTodo}
      />

      <Button variant="outlined" onClick={onClickTodoAdd}>
        追加
      </Button>
    </div>
  )
})
