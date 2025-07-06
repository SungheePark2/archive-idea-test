import { Todo } from "../types/todo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formattedDate = format(parseISO(todo.created_at), "M월 d일 a h:mm", { locale: ko });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      role="listitem"
    >
      <Card className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.is_completed}
              onCheckedChange={() => onToggle(todo.id)}
              className="h-5 w-5 transition-all duration-200"
              aria-label={`${todo.title} 완료 여부`}
            />
            <div className="flex flex-col gap-1 min-w-0">
              <label
                htmlFor={`todo-${todo.id}`}
                className={`${
                  todo.is_completed 
                    ? "line-through text-muted-foreground" 
                    : "text-foreground"
                } transition-all duration-200 truncate cursor-pointer`}
              >
                {todo.title}
              </label>
              <time 
                dateTime={todo.created_at}
                className="text-xs text-muted-foreground"
              >
                {formattedDate}
              </time>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            aria-label={`${todo.title} 삭제`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
} 