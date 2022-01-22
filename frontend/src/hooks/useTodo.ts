import { ChangeEvent, useEffect, useState } from "react"
import { defaultTodos } from "../data/todoData"
import { Todos } from "../Types/todo"

export const useTodo = () => {
  // State
  const [todos, setTodos] = useState<Todos[]>([])
  const [inputTodo, setInputTodo] = useState("")

  //   初期値をセット（何度もレンダリングしないようにuseEffectを使用）
  useEffect(() => setTodos(defaultTodos), [])

  // 1todoの追加
  // 1.1inputに入力した値を格納する
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value)
  }

  // 1.2todoをtodosにセットする
  const onClickTodoAdd = () => {
    if (inputTodo !== "") {
      const newTodos: Todos[] = [
        ...todos,
        { id: todos.length + 1, task: inputTodo, isCompleted: false },
      ]
      setTodos(newTodos)
      setInputTodo("")
    }
  }

  //  2 削除機能
  // 2.1 idでフィルターをかけて対象のTodoを削除

  const onClickDelete = (id: number) => {
    const delteTodo = todos.filter((todo) => todo.id !== id)
    setTodos(delteTodo)
  }

  // 3 完了機能
  // 3.1 フィルターで抽出
  const onClickComplete = (id: number) => {
    const changeCompltedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    setTodos(changeCompltedTodo)
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
