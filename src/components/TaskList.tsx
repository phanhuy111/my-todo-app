import useData from "@/lib/hook";
import { Grip, Trash } from "lucide-react";
import DialogEdit from "./DialogEdit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Checkbox,
} from "./ui";
import { cn } from "@/lib/utils";
import { Task, TypeStatus } from "@/lib/types";
import { format } from "date-fns";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect } from "react";

function TrashConfirm(props: { id: string }) {
  const { deleteItem } = useData();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="cursor-pointer" size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteItem(props.id);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const getFieldIndexesToSwap = (originalOrder: string[], newOrder: string[]) => {
  const indexesToSwap: number[] = [];

  for (const [i, fieldId] of originalOrder.entries()) {
    const fieldIndexInNewOrder = newOrder.findIndex(
      (newFieldId) => newFieldId === fieldId
    );
    if (fieldIndexInNewOrder !== i) indexesToSwap.push(i);
  }

  const [indexA, indexB] = indexesToSwap;
  return [indexA, indexB];
};

function TaskList({ status }: { status: TypeStatus }) {
  const { data, updateStatus, setData } = useData();
  const form = useFormContext();
  const { fields, swap } = useFieldArray({
    control: form.control,
    name: "items",
    keyName: "customId",
  });

  useEffect(() => {
    form.reset({
      items: data,
    });
  }, [data]);

  const filtedData: Task[] =
    status === "pending" || status === "completed"
      ? (fields as Task[]).filter((item) => item.status == status)
      : (fields as Task[]);

  const onReorder = (newOrder: string[]) => {
    const originalOrder = filtedData.map((field) => field.id);
    const [indexA, indexB] = getFieldIndexesToSwap(originalOrder, newOrder);
    swap(indexA, indexB);
  };

  return (
    <AnimatePresence initial={false}>
      <Reorder.Group
        axis="y"
        values={filtedData.map((field) => field.id.toString())}
        onReorder={onReorder}
        className="space-y-8"
      >
        {filtedData.map((item) => {
          const isCompleted = item.status !== "pending";
          return (
            <Reorder.Item
              key={item.id}
              value={item.id}
              className="flex items-center gap-2"
              onDragEnd={() => {
                setData(fields as Task[]);
              }}
            >
              <Grip size={16} className="text-gray-400 cursor-grab" />
              <Checkbox
                checked={isCompleted}
                onCheckedChange={() => {
                  updateStatus(
                    item.id,
                    (isCompleted ? "pending" : "completed") as TypeStatus
                  );
                }}
              />
              <div className="ml-4 space-y-1">
                <div className="flex items-center space-x-2">
                  <p
                    className={cn(
                      "text-sm font-medium leading-none",
                      isCompleted && "line-through"
                    )}
                  >
                    {item.title}
                  </p>
                  {item.deadline && (
                    <p className={cn("text-sm leading-none")}>
                      {`- ${format(item.deadline, "dd/MM/yyyy")}`}
                    </p>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    isCompleted && "line-through"
                  )}
                >
                  {item.description}
                </p>
              </div>

              <div className="flex flex-row ml-auto gap-4">
                <DialogEdit id={item.id} />
                <TrashConfirm id={item.id} />
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </AnimatePresence>
  );
}

export default TaskList;
