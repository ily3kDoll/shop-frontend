import { useGetBlog } from "@/hooks/query-blogs/useGetBlog";
import { useParams } from "react-router-dom";

function BlogDetailPage() {
  const _id = useParams().id ?? "";
  const { data: blog } = useGetBlog(_id);

  return (
    <div className="p-8 w-full flex flex-col gap-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

        <div className="flex gap-10 items-center text-sm text-gray-500 mb-4">
          <h1>Tác giả: {blog?.created_by}</h1>
          {blog && (
            <h1>Ngày tạo: {new Date(blog?.created_at).toLocaleDateString()}</h1>
          )}
        </div>

        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
        />
      </div>
    </div>
  );
}

export default BlogDetailPage;
