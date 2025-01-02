import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ThanksPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container p-4 mx-auto">
        <div className="p-8 flex flex-col items-center gap-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Cảm ơn bạn đã đặt hàng!
          </h1>
          <p className="text-lg text-gray-700 text-center">
            Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý. Một email xác
            nhận đã được gửi đến địa chỉ email của bạn. Vui lòng kiểm tra để xem
            thông tin chi tiết.
          </p>
          <p className="text-sm text-gray-500 text-center">
            Nếu không thấy email trong hộp thư chính, hãy kiểm tra thư mục spam
            hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
          <div className="bg-gray-100 p-4 rounded-md shadow-sm text-center">
            <p className="text-sm text-gray-600">
              Cần trợ giúp? Liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi:
            </p>
            <p className="text-sm text-gray-800 font-semibold">
              Email: daothanhnghi2003@gmail.com | Hotline: 0832-699-789
            </p>
          </div>

          <div className="flex gap-4">
            <Link to={"/"}>
              <Button className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow">
                Quay lại trang chủ
              </Button>
            </Link>
            <Link to={"/profile"}>
              <Button className="px-6 py-2 text-blue-500 bg-white border border-blue-500 hover:bg-blue-50 rounded-md shadow">
                Xem trạng thái đơn hàng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThanksPage;
