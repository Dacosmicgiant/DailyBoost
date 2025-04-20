"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
}

export function TodoCard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  // Add a function to fetch todos from the API
  const fetchTodosFromAPI = async (userId: string) => {
    try {
      const response = await fetch(`/api/todos?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch todos")
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching todos:", error)
      return []
    }
  }

  // Add a function to save a todo to the API
  const saveTodoToAPI = async (todo: Omit<Todo, "id">, userId: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: todo.text,
          userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save todo")
      }

      return await response.json()
    } catch (error) {
      console.error("Error saving todo:", error)
      return null
    }
  }

  // Add a function to update a todo in the API
  const updateTodoInAPI = async (id: string, completed: boolean, userId: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          completed,
          userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update todo")
      }

      return true
    } catch (error) {
      console.error("Error updating todo:", error)
      return false
    }
  }

  // Add a function to delete a todo from the API
  const deleteTodoFromAPI = async (id: string, userId: string) => {
    try {
      const response = await fetch(`/api/todos?id=${id}&userId=${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete todo")
      }

      return true
    } catch (error) {
      console.error("Error deleting todo:", error)
      return false
    }
  }

  // Note: In a real application, you would implement user authentication
  // and use the user's ID for the API calls. For now, we'll continue using
  // localStorage as a fallback when the user is not authenticated.

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (e) {
        console.error("Error parsing saved todos:", e)
      }
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Omit<Todo, "id"> = {
      text: newTodo.trim(),
      completed: false,
    }

    // In a real application, you would use the user's ID here
    const userId = "test-user"

    saveTodoToAPI(todo, userId).then((newTodoWithId) => {
      if (newTodoWithId) {
        setTodos([...todos, newTodoWithId])
        setNewTodo("")
      }
    })
  }

  const toggleTodo = (id: string) => {
    // In a real application, you would use the user's ID here
    const userId = "test-user"

    updateTodoInAPI(id, !todos.find((todo) => todo.id === id)?.completed, userId).then((success) => {
      if (success) {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
      }
    })
  }

  const deleteTodo = (id: string) => {
    // In a real application, you would use the user's ID here
    const userId = "test-user"

    deleteTodoFromAPI(id, userId).then((success) => {
      if (success) {
        setTodos(todos.filter((todo) => todo.id !== id))
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Focus</CardTitle>
        <CardDescription>Keep track of your important tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No tasks yet. Add some tasks to get started!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between p-3 rounded-md border bg-card">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
