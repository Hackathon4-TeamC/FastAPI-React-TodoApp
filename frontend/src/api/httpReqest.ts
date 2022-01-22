import axios from "axios"
import { Todos } from "../types/Todos"

// todoを全件取得
export const postTodo = async (inputTodo: string) => {
  try {
    const result = await axios.post<Todos>("http://127.0.0.1:5000/todos/", {
      task: inputTodo,
      isCompleted: false,
    })
    if (result.data) {
      return result.data
    }
  } catch (err) {
    console.log(err)
  }
}

// todoを投稿
export const getAllTodos = async () => {
  try {
    const result = await axios.get<Todos[]>("http://127.0.0.1:5000/todos/")
    if (result) {
      return result.data
    }
  } catch (err) {
    console.log(err)
  }
}

// todoを削除
export const deleteTodos = async (id: number) => {
  try {
    await axios.delete(`http://127.0.0.1:5000/todos/${id}`, {
      data: {
        id: id,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const putTodoIsCompleted = async (todo: Todos) => {
  try {
    const result = await axios.put<Todos>(
      `http://127.0.0.1:5000/todos/${todo.id}`,
      {
        task: todo.task,
        isCompleted: (todo.isCompleted = !todo.isCompleted),
      }
    )
    if (result.data) {
      return result.data
    }
  } catch (err) {
    console.log(err)
  }
}
