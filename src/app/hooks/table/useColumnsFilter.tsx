import { RenderableRecord } from '@/client/types';
import { Column } from './types';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DragIndicator } from '@mui/icons-material';

type ColumnsFilterProps<T> = {
  localColumns: Column<T>[];
  setLocalColumns: Dispatch<SetStateAction<Column<T>[]>>;
};

interface UseColumnsFilterProps<T> {
  columns: Column<T>[];
}

export function useColumnsFilter<T extends RenderableRecord>({
  columns,
}: UseColumnsFilterProps<T>) {
  const [localColumns, setLocalColumns] = useState(columns);

  const enabledColumns = localColumns.filter((lc) => lc.enabled);

  return {
    forwardedProps: {
      localColumns,
      setLocalColumns,
    },
    enabledColumns,
    ColumnsFilterElement,
  };
}

export const ColumnsFilterElement = <T extends RenderableRecord>({
  localColumns,
  setLocalColumns,
}: ColumnsFilterProps<T>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.name;
    const n = localColumns.map((c) => ({
      ...c,
      enabled: c.id === id ? !c.enabled : c.enabled,
    }));
    setLocalColumns(n);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (localColumns && active.id !== over?.id) {
      const oldIndex = localColumns?.findIndex((item) => item.id === active?.id);
      const newIndex = localColumns?.findIndex((item) => item.id === over?.id);
      const newOrder = arrayMove(localColumns, oldIndex, newIndex);
      setLocalColumns(newOrder);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext items={localColumns} strategy={verticalListSortingStrategy}>
        <FormGroup className="p-2">
          {localColumns.map((lc) => (
            <ColumnItem key={lc.id} column={lc} handleChange={handleChange} />
          ))}
        </FormGroup>
      </SortableContext>
    </DndContext>
  );
};

const ColumnItem = <T extends RenderableRecord>({
  column,
  handleChange,
}: {
  column: Column<T>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  });
  const draggingClass = isDragging ? 'shadow-xl bg-white' : 'bg-white';
  const customTransform =
    isDragging && transform ? { ...transform, scaleX: 1.03, scaleY: 1.03 } : transform;
  const style = {
    transform: CSS.Transform.toString(customTransform),
    transition,
  };

  return (
    <Stack
      key={column.id}
      ref={setNodeRef}
      style={style}
      className={draggingClass}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      paddingX={1}
    >
      <FormControlLabel
        control={<Checkbox checked={column.enabled} onChange={handleChange} name={column.id} />}
        label={column.header}
      />
      <DragIndicator {...attributes} {...listeners} className="cursor-grab" />
    </Stack>
  );
};

