import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/query-users/useCreateUser";
import { useFormCreateUser } from "@/hooks/query-users/useFormCreateUser";
import useToastMessage from "@/hooks/useToastMessage";
import { Link } from "react-router-dom";
import { z } from "zod";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function CreateUserPage() {
  const { form, formSchema } = useFormCreateUser();
  const { toastLoading } = useToastMessage();
  const mutation = useCreateUser();

  function handleCreateUser(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager User</h1>{" "}
      <Link to={"/admin/users"}>
        <Button className="flex gap-2 bg-white text-black hover:bg-gray-200">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateUser)}
          className="flex flex-col gap-2 items-center"
        >
          <div className="flex flex-col bg-white gap-2 rounded-lg shadow-md border p-4">
            <h1 className="font-semibold text-xl self-center">Create User</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="status"
              render={({ field }) => (
                <FormItem className="w-72 flex items-center gap-4">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="bg-green-500 hover:bg-green-600 rounded-lg shadow-md self-center">
              Tạo
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateUserPage;
