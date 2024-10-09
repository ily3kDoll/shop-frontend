import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useToastMessage from "@/hooks/useToastMessage";
import useUserLogin from "@/hooks/query-users/useUserLogin";
import { useFormLogin } from "@/hooks/useFormLogin";
import Logo from "@/assets/logo.png";
import { z } from "zod";
import { LocalUtils } from "@/utils/local-utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const { form, formSchema } = useFormLogin();
  const mutation = useUserLogin();
  const { toastLoading } = useToastMessage();
  const token = LocalUtils.getLocalToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, [token]);

  function handleLogin(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi");
    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
      <h1 className="text-4xl">Login Page</h1>

      <img
        className="rounded-full object-cover w-60 h-20 object-center"
        src={Logo}
        alt="logo"
      />

      {mutation.error?.statusCode === 404 && (
        <h1 className="text-green-700">Không tìm thấy email</h1>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button>Đăng nhập</Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
