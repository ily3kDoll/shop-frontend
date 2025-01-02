import { useBlogStore } from "@/store/useBlogStore";
import { Blog } from "@/types/blog.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/actions";

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "_id",
    header: "ID",
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
  },
  {
    accessorKey: "created_by",
    header: "Created by",
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: ({ cell, row }) => {
      const { _id, title } = row.original;
      const { setModalDelete } = useBlogStore();

      return (
        <Actions
          link_update={`/admin/blogs/${_id}`}
          setModalDelete={setModalDelete}
          _id={_id}
          name={title}
        />
      );
    },
  },
];
