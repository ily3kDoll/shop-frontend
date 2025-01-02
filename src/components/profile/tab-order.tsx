import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useGetOrderMe } from "@/hooks/query-orders/useGetOrderMe";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPrice } from "@/utils/common";
import ModalOrderDetail from "./modal-order-detail";
import { OrderStatus } from "@/types/order.type";

interface TabOrderProps {
  value: string;
}

function TabOrder(props: TabOrderProps) {
  const { data: orders } = useGetOrderMe();
  const { setModalDetail } = useOrderStore();

  let total = 0;
  orders?.forEach((item) => {
    total += item.total;
  });

  function handleModalDetail(id: string) {
    setModalDetail(true, { _id: id });
  }

  function getStatusText(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return "Chưa xử lý";
      case OrderStatus.DELIVERING:
        return "Đang giao";
      case OrderStatus.DELIVERED:
        return "Đã giao";
      case OrderStatus.CANCELLED:
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  }

  return (
    <>
      <TabsContent
        value={props.value}
        className="flex flex-col items-center gap-2 w-full"
      >
        {/* Phần Bảng đơn hàng */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-[900px]">
          <h2 className="text-2xl font-bold text-center mb-4">
            Lịch sử đơn hàng
          </h2>
          <Table>
            <TableCaption>Danh sách sản phẩm bạn đã mua.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hoá đơn</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Ngày mua</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell
                    onClick={() => handleModalDetail(item._id)}
                    className="font-medium hover:text-orange-400 cursor-pointer"
                  >
                    {item._id}
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusText(item.status)}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Tổng tiền đã mua</TableCell>
                <TableCell className="text-right">
                  {formatPrice(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </TabsContent>
      <ModalOrderDetail />
    </>
  );
}

export default TabOrder;
