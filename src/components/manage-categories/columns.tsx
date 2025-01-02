import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Switch } from "../ui/switch";
import { Category } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/actions";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useUpdateStatusCategory } from "@/hooks/query-categories/useUpdateStatusCategory";
import { FaFolder, FaFolderOpen } from "react-icons/fa"; // Folder icons for categories

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, getValue }) => {
      const depth = row.depth; // Get the depth level of the category
      const isSubcategory = depth > 0; // Check if it's a subcategory
      const indentLevel = depth * 20; // Increase indentation per level (20px for each level)

      return (
        <div style={{ paddingLeft: `${indentLevel}px` }}>
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? "🠋" : "➜"}
            </button>
          ) : (
            "-"
          )}{" "}
          {getValue<boolean>()}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell, row }) => {
      const { _id, status } = row.original;
      const mutation = useUpdateStatusCategory();
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
      const { setModalDelete } = useCategoryStore();

      return (
        <Actions
          link_update={`/admin/categories/${_id}`}
          setModalDelete={setModalDelete}
          _id={_id}
          name={name}
        />
      );
    },
  },
];
