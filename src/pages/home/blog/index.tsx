import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useGetAllBlogs } from "@/hooks/query-blogs/useGetAllBlog";
import { Link } from "react-router-dom";

function BlogHomePage() {
  const { data: blogs } = useGetAllBlogs({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });

  return (
    <div className="container mx-auto p-8">
      {blogs?.entities && blogs.entities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {blogs.entities.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/blogs/${blog._id}`}>
                <img
                  className="w-full h-[200px] object-cover transform hover:scale-110 transition-transform duration-300"
                  src={blog.image_url}
                  alt={blog.title}
                />
              </Link>
              <div className="p-6">
                <Link to={`/blogs/${blog._id}`}>
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-orange-500 mb-4 line-clamp-2 min-h-[56px]">
                    {blog.title}
                  </h2>
                </Link>
                <div
                  className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  {/* Author section */}
                  <p className="flex-1 truncate w-[120px]">
                    Tác giả: {blog.created_by}
                  </p>
                  {/* Date section */}
                  <p className="text-right">
                    Ngày tạo: {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-6 shadow-lg rounded-lg mb-8 max-w-md mx-auto">
          <p className="text-lg font-semibold text-gray-800">
            Không có bài viết nào hiển thị tại thời điểm này.
          </p>
          <p className="text-sm text-gray-600">
            Hãy quay lại sau hoặc kiểm tra các bài viết khác.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <nav className="flex items-center space-x-6">
          <button className="px-5 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transform hover:scale-110 transition-all duration-300">
            <AiOutlineLeft />
          </button>
          <span className="text-sm text-gray-500">1 - 10</span>
          <button className="px-5 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transform hover:scale-110 transition-all duration-300">
            <AiOutlineRight />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default BlogHomePage;
