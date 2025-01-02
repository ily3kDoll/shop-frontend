import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/actions";
import { Author } from "@/types/author.type";
import { useAuthorStore } from "@/store/useAuthorStore";

export const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",

    cell: ({ row }) => {
      const { date } = row.original;
      return new Date(date ?? new Date()).toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ cell, row }) => {
      const { _id, name } = row.original;
      const { setModalDelete } = useAuthorStore();

      return (
        <Actions
          link_update={`/admin/authors/${_id}`}
          setModalDelete={setModalDelete}
          _id={_id}
          name={name}
        />
      );
    },
  },
];
