import { Todo } from "../types/todo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Card className="p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="h-5 w-5"
        />
        <span className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
          {todo.content}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="text-destructive hover:text-destructive/90"
      >
        삭제
      </Button>
    </Card>
  );
} 