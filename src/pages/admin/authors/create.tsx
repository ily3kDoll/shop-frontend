import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAuthor } from "@/hooks/query-authors/useCreateAuthor";
import { useFormCreateAuthor } from "@/hooks/query-authors/useFormCreateAuthor";
import useToastMessage from "@/hooks/useToastMessage";
import { vi } from "react-day-picker/locale";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { z } from "zod";

function CreateAuthorPage() {
  const { form, formSchema } = useFormCreateAuthor();
  const { toastLoading } = useToastMessage();
  const mutation = useCreateAuthor();

  function handleCreateUser(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ name: data.name, date: data.date });
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager Author</h1>{" "}
      <Link to={"/admin/authors"}>
        <Button className="flex gap-2 bg-white text-black hover:bg-gray-200">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateUser)}
          className="flex flex-col gap-2 items-center"
        >
          <div className="flex flex-col gap-2 bg-white shadow-md rounded-lg item-center p-4">
            <h1 className="text-xl font-semibold self-center">Create Author</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel htmlFor="datetime">Date</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      locale={vi}
                      placeholder="Date"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="self-center bg-green-500 hover:bg-green-600 shadow-md">
              Tạo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateAuthorPage;
