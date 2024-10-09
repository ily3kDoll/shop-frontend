import { User } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/actions";
import { useUpdateStatusUser } from "@/hooks/query-users/useUpdateStatusUser";
import { Switch } from "../ui/switch";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusUser();
      function handleStatus() {
        mutation.mutate({ _id, status: !status });
      }
      return (
        <Switch
          checkedIcon={<FaCheck />}
          unCheckedIcon={<RxCross2 />}
          checked={status}
          onCheckedChange={handleStatus}
        />
      );
    },
  },
  {
    accessorKey: "role",
    header: "role",
  },
  {
    accessorKey: "",
    header: "actions",
    cell: ({ cell, row }) => {
      const { _id } = row.original;
      return <Actions />;
    },
  },
];
