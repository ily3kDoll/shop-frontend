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
import { useFormCreateAuthor } from "@/hooks/query-authors/useFormCreateAuthor";
import { useGetAuthor } from "@/hooks/query-authors/useGetAuthor";
import { useUpdateAuthor } from "@/hooks/query-authors/useUpdateAuthor";
import useToastMessage from "@/hooks/useToastMessage";
import { useEffect } from "react";
import { vi } from "react-day-picker/locale";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

function UpdateAuthorPage() {
  const _id = useParams().id ?? "";
  const { form, formSchema } = useFormCreateAuthor();
  const { toastLoading } = useToastMessage();
  const { data: author } = useGetAuthor(_id);
  const mutation = useUpdateAuthor();

  function handleCreateUser(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ id: _id, body: { name: data.name, date: data.date } });
  }

  useEffect(() => {
    if (author) {
      form.setValue("name", author?.name ?? ""),
        form.setValue("date", new Date(author.date) ?? undefined);
    }
  }, [author]);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager Author</h1>{" "}
      <Link to={"/admin/authors"}>
        <Button className="flex gap-2">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateUser)}
          className="flex flex-col gap-2 items-center"
        >
          <div className="flex flex-col gap-2 bg-white shadow-md rounded-lg item-center p-4">
            <h1 className="text-xl font-semibold self-center">Update Author</h1>
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
                <FormItem className="flex flex-col gap-2">
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
            <Button className="self-center bg-blue-500 hover:bg-blue-600 shadow-md">
              Lưu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UpdateAuthorPage;
