import { useContext, createContext } from "react";
import { Schema, Setting, DefaultSchema } from "@/types/schema-type";

type TimerContextType = {
  contentSchema: Schema;
  setContentSchema: React.Dispatch<React.SetStateAction<Schema>>;
  activeId: string | null;
  setActiveId?: React.Dispatch<React.SetStateAction<string | null>>;
  removeFieldType: (id: any) => void;
  duplicateFieldType: (id: any) => void;
  updateFieldType: (updatedField: Setting) => void;
  saveSchema: () => void;
};

export const SchemaContext = createContext<TimerContextType>({
  contentSchema: DefaultSchema,
  setContentSchema: () => {},
  activeId: null,
  setActiveId: () => {},
  removeFieldType: () => {},
  duplicateFieldType: () => {},
  updateFieldType: () => {},
  saveSchema: () => {},
});

export function useTimerContext() {
  return useContext(SchemaContext);
}
