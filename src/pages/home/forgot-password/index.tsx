import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/query-customers/useForgotPassword";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const mutation = useForgotPassword();

  function handleForgotPassword() {
    mutation.mutate(email);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#daf1ff]">
      <div className="flex gap-2 flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center">Quên mật khẩu</h2>
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập Email"
        />
        <Button
          onClick={handleForgotPassword}
          className="w-full mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Gửi
        </Button>
        <Link to="/login" className=" text-blue-500 hover:underline my-2">
          Trở lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
