function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl text-gray-700 mt-4">Trang không tìm thấy</h2>
        <p className="text-gray-500 mt-2">
          Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
