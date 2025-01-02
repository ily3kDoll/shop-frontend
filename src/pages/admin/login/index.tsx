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
import Logo from "@/assets/logo2.png";
import { z } from "zod";
import { LocalUtils } from "@/utils/local-utils";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen bg-[#daf1ff]">
      <Link to="" className="flex items-center text-4xl font-bold">
        <span>Manga</span>
        <img
          className="object-cover w-14 h-14 drop-shadow-lg -mx-1"
          src={Logo}
          alt="logo"
        />
        <span>Store</span>
      </Link>

      <div className="mt-5 w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl mb-5 font-semibold text-center">
          Đăng Nhập Admin
        </h2>

        {mutation.error?.statusCode === 404 && (
          <h1 className="text-green-700">Không tìm thấy email</h1>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="mt-4">Đăng nhập</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
