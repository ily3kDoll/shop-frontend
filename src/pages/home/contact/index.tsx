import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFeedBack } from "@/hooks/query-feedback/useFeedback";
import useToastMessage from "@/hooks/useToastMessage";
import { useState } from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const mutation = useFeedBack();
  const { toastLoading } = useToastMessage();

  function handleFeedBack() {
    toastLoading("Vui lòng đợi");
    mutation.mutate({ name, email, phone_number: phoneNumber, message });
  }

  return (
    <div className="container w-full p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full h-min md:w-1/2 flex flex-col gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="h-64 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.5191905371885!2d105.41677653130056!3d9.754533348893887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0e8252c2be03b%3A0xa721c025d9fd8163!2zOTk1IFRy4bqnbiBIxrBuZyDEkOG6oW8sIFBoxrDhu51uZyA3LCBW4buLIFRoYW5oLCBI4bqtdSBHaWFuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732675816002!5m2!1svi!2s"
              title="Google Map - 995 Đường Trần Hưng Đạo, TP.Vị Thanh, Hậu Giang"
              className="w-full h-64 md:h-96 rounded-lg shadow-md border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div>
            <h2 className="text-xl mb-4 font-semibold">Thông tin liên hệ</h2>
            <Separator />
            <p>
              <strong>Địa chỉ:</strong> 995 Đường Trần Hưng Đạo, Phường VII,
              TP.Vị Thanh, Tỉnh Hậu Giang.
            </p>
            <p>
              <strong>Email:</strong> daothanhnghi2003@gmail.com
            </p>
            <p>
              <strong>Điện thoại:</strong> +84 832 699 789
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            Gửi thắc mắc cho chúng tôi
          </h1>
          <Separator />
          <div className="flex flex-col gap-4 mt-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập Email"
              />
              <Input
                value={phoneNumber}
                type="phone"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Số điện thoại của bạn"
              />
            </div>
            <Textarea
              className="min-h-[165px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nội dung thắc mắc"
            />
            <Button type="button" onClick={handleFeedBack}>
              Gửi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
