import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUser } from "@/hooks/query-users/useGetUser";
import { useUpdateUser } from "@/hooks/query-users/useUpdateUser";
import useToastMessage from "@/hooks/useToastMessage";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function UpdateUserPage() {
  const _id = useParams().id ?? "";
  const [name, setName] = useState("");
  const { data: user } = useGetUser(_id);
  const { toastLoading } = useToastMessage();

  const mutation = useUpdateUser();

  function handleUpdate() {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ _id, name });
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Manager User</h1>{" "}
      <Link to={"/admin/users"}>
        <Button className="flex gap-2 bg-white text-black hover:bg-gray-200">
          <IoMdArrowRoundBack />
          Quay lại
        </Button>
      </Link>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-col bg-white gap-2 rounded-lg shadow-md border p-4">
          <h1 className="text-xl font-semibold self-center mb-4">
            Update User: {user?.name}
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-2">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <Input
                id="name"
                defaultValue={user?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md self-center"
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserPage;
