import TabInfo from "@/components/profile/tab-info";
import TabOrder from "@/components/profile/tab-order";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProfilePage() {
  return (
    <div className="p-4 w-full">
      <Tabs className="flex p-4 gap-20" defaultValue="account">
        <TabsList className="h-min bg-white p-4 rounded-lg flex flex-col justify-start items-start gap-4 shadow-md">
          <TabsTrigger
            value="account"
            className="tab-trigger bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-300"
          >
            Thông tin tài khoản
          </TabsTrigger>
          <TabsTrigger
            value="order"
            className="tab-trigger bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-300"
          >
            Lịch sử đơn hàng
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-col items-center w-full">
          <TabInfo value="account" />
          <TabOrder value="order" />
        </div>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
