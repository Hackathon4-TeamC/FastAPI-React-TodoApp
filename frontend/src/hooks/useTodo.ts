import { ChangeEvent, useEffect, useState } from "react"
import { Todos } from "../types/Todos"
import {
  deleteTodos,
  getAllTodos,
  postTodo,
  putTodoIsCompleted,
} from "../api/httpReqest"

export const useTodo = () => {
  // State
  const [todos, setTodos] = useState<Todos[]>([])
  const [inputTodo, setInputTodo] = useState("")

  //   初期値をセット（何度もレンダリングしないようにuseEffectを使用）
  useEffect(() => {
    getAllTodos()
      .then((result) => {
        if (result) {
          setTodos(result)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  // 1todoの追加
  // 1.1inputに入力した値を格納する
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value)
  }

  // 1.2todoをtodosにセットする
  const onClickTodoAdd = () => {
    if (inputTodo !== "") {
      postTodo(inputTodo)
        .then((result) => {
          if (result) {
            const newTodos: Todos[] = [
              ...todos,
              { id: result.id, task: inputTodo, isCompleted: false },
            ]
            setTodos(newTodos)
          }
        })
        .catch((err) => console.log(err))

      setInputTodo("")
    }
  }

  //  2 削除機能
  const onClickDelete = (id: number) => {
    deleteTodos(id)
    const delteTodo = todos.filter((todo) => todo.id !== id)
    setTodos(delteTodo)
  }

  // 3 完了機能
  const onClickComplete = async (argTodo: Todos) => {
    putTodoIsCompleted(argTodo).then((result) => {
      if (result) {
        const changeCompltedTodo = todos.map((todo) => {
          if (todo.id === result.id) {
            todo = result
          }
          return todo
        })
        setTodos(changeCompltedTodo)
      }
    })
  }

  return {
    actions: {
      onChangeInputValue,
      onClickTodoAdd,
      onClickDelete,
      onClickComplete,
    },
    state: {
      todos,
      inputTodo,
    },
  }
}
