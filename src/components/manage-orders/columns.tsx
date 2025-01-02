import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderStatus } from "@/types/order.type";
import { useOrderStore } from "@/store/useOrderStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useChangeStatusOrder } from "@/hooks/query-orders/useChangeStatusOrder";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const { setModalDetail } = useOrderStore();
      const handleModalDetail = () => {
        setModalDetail(true, { _id: row.original._id });
      };
      return (
        <h1
          onClick={handleModalDetail}
          className="cursor-pointer hover:text-orange-500"
        >
          {row.original.email}
        </h1>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const currentStatus = row.original.status;
      const mutation = useChangeStatusOrder();

      function handleStatus(e: string) {
        mutation.mutate({ id: row.original._id, status: e });
      }

      return (
        <Select onValueChange={handleStatus} defaultValue={currentStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={OrderStatus.PENDING}>Đang xử lý</SelectItem>
              <SelectItem value={OrderStatus.DELIVERING}>
                Đang giao hàng
              </SelectItem>
              <SelectItem value={OrderStatus.DELIVERED}>
                Giao thành công
              </SelectItem>
              <SelectItem value={OrderStatus.CANCELLED}>
                Đơn hàng đã hủy
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
];
