import DialogDelete from "@/components/dialog-delete";
import { columns } from "@/components/manage-authors/columns";
import DataTable from "@/components/table/data-table";
import { useDeleteAuthor } from "@/hooks/query-authors/useDeleteAuthor";
import { useGetAllAuthors } from "@/hooks/query-authors/useGetAllAuthors";
import useDebounce from "@/hooks/useDebounce";
import { useAuthorStore } from "@/store/useAuthorStore";
import { useState } from "react";

function AuthorsPage() {
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 2000);
  const { modalDelete, setModalDelete, _id, name } = useAuthorStore();
  const mutation = useDeleteAuthor();
  const { data, isLoading } = useGetAllAuthors({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: debounced,
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manager Authors</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            link_create="/admin/authors/create-author"
            data={data?.entities ?? []}
            columns={columns}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        )}
      </div>
      <DialogDelete
        open={modalDelete}
        name={name}
        _id={_id}
        mutation={mutation}
        setModalDelete={setModalDelete}
      />
    </>
  );
}

export default AuthorsPage;
