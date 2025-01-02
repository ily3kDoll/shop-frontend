import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Switch } from "../ui/switch";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/actions";
import { useUpdateStatusProduct } from "@/hooks/query-products/useUpdateStatusProduct";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "author_id",
    header: "Author",
    cell: ({ row }) => {
      const author = row.original.author_id;
      return <h1>{author?.name}</h1>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusProduct();
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
    accessorKey: "",
    header: "Actions",
    cell: ({ cell, row }) => {
      const { _id, name } = row.original;
      const { setModalDelete } = useProductStore();

      return (
        <Actions
          link_update={`/admin/products/${_id}`}
          setModalDelete={setModalDelete}
          _id={_id}
          name={name}
        />
      );
    },
  },
];
