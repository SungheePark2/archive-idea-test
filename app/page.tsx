import { Metadata } from "next";
import { useState } from "react";
import { Todo } from "./types/todo";
import { TodoItem } from "./components/TodoItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import KakaoAd from "@/components/ui/KakaoAd";

// 페이지별 메타데이터 설정
export const metadata: Metadata = {
  title: "할 일 목록 | Archive Idea",
  description: "효율적인 할 일 관리를 위한 심플한 투두리스트 애플리케이션입니다.",
  alternates: {
    canonical: "https://archive-idea-test-azure.vercel.app",
  },
};

// 클라이언트 컴포넌트
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo.trim(),
      is_completed: false,
      created_at: new Date().toISOString(),
      user_id: ""
    };
    
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
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

  const completedCount = todos.filter(todo => todo.is_completed).length;
  const totalCount = todos.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">할 일 목록</h1>
          {totalCount > 0 && (
            <p className="text-muted-foreground">
              총 {totalCount}개 중 {completedCount}개 완료
            </p>
          )}
        </header>
        
        <section className="relative" aria-label="할 일 입력 및 목록">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl opacity-50" />
          <div className="relative bg-card/50 backdrop-blur-xl rounded-lg p-8 shadow-lg">
            <div className="flex gap-2 mb-8">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="새로운 할 일을 입력하세요"
                className="flex-1 bg-background/50"
                aria-label="할 일 입력"
              />
              <Button onClick={addTodo} size="icon" aria-label="할 일 추가">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </AnimatePresence>
              
              {todos.length === 0 && (
                <div className="text-center py-12" role="status">
                  <p className="text-muted-foreground mb-2">
                    아직 할 일이 없습니다
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    위 입력창에 할 일을 입력하고 추가해보세요!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="flex justify-center">
          <KakaoAd
            unit="DAN-Pbw7BR1WscZOdBgB"
            width="728"
            height="90"
          />
        </aside>
      </div>
    </main>
  );
}
