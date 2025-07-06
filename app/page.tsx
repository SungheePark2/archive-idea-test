"use client";

import { useState } from "react";
import { Todo } from "./types/todo";
import { TodoItem } from "./components/TodoItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      content: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">할 일 목록</h1>
        
        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="할 일을 입력하세요"
            className="flex-1"
          />
          <Button onClick={addTodo}>추가</Button>
        </div>

        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-muted-foreground">
              할 일이 없습니다. 새로운 할 일을 추가해보세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
