import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger, Form } from "@/components/ui";
import TaskList from "@/components/TaskList";
import DialogCreate from "@/components/DialogCreate";
import { TypeStatus } from "@/lib/types";
import { StringParam, useQueryParam } from "use-query-params";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      status: z.string(),
    })
  ),
});

function TodoApp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [status, setStatus] = useQueryParam("status", StringParam);
  const statusGenerated = status || "overview";

  return (
    <Form {...form}>
      <AnimatePresence>
        <div className="max-w-[600px] mx-auto my-6 py-6 px-4">
          <div className="hidden flex-col md:flex">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }} // Initial animation state (hidden and moved up)
                animate={{ opacity: 1, y: 0 }} // Animation state when component is visible
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight">TODO LIST</h2>
                <div className="flex items-center space-x-2">
                  <DialogCreate />
                </div>
              </motion.div>
              <Tabs
                value={statusGenerated}
                onValueChange={(value) => {
                  setStatus(value as TypeStatus);
                }}
                className="space-y-4"
              >
                <TabsList>
                  <TabsTrigger value="overview">All</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <motion.div
                  initial={{ opacity: 0, y: -40 }} // Initial animation state (hidden and moved up)
                  animate={{ opacity: 1, y: 0 }} // Animation state when component is visible
                  transition={{ duration: 0.6 }}
                >
                  <TaskList status={statusGenerated as TypeStatus} />
                </motion.div>
              </Tabs>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </Form>
  );
}

export default TodoApp;
