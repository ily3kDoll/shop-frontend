import { useUpdateStatusCustomer } from "@/hooks/query-customers/useUpdateStatusCustomer";
import { Customer } from "@/types/customer.type";
import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "../ui/switch";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export const columns: ColumnDef<Customer>[] = [
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
    header: "Name",
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
  },
  {
    accessorKey: "image_url",
    header: "Main image",
    cell: ({ row }) => {
      const { image_url } = row.original;

      return <img className="w-10 h-10 object-cover" src={image_url} alt="" />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusCustomer();
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
];
