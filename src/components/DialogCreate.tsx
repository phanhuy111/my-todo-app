import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
} from "./ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useData from "@/lib/hook";
import { useState } from "react";
import { TypeStatus } from "@/lib/types";
import { DatePickerForm } from "./DatePicker";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.date().optional(),
});

function DialogCreate() {
  const { addItem } = useData();
  const [openmodal, setOpenModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newValue = {
      ...values,
      id: uuidv4(),
      status: "pending" as TypeStatus,
    };

    addItem(newValue);
    form.reset();
    setOpenModal(false);
  }

  return (
    <Dialog open={openmodal} onOpenChange={(open) => setOpenModal(open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel aria-required>{"Title"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel aria-required>{"Description"}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DatePickerForm name="deadline" label="Deadline" />
          </div>
        </Form>

        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogCreate;
