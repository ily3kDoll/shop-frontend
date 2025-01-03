import TabDescription from "@/components/manage-products/tab-description";
import TabImages from "@/components/manage-products/tab-images";
import TabInfo from "@/components/manage-products/tab-info";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllAuthors } from "@/hooks/query-authors/useGetAllAuthors";
import { useGetAllNameAuthors } from "@/hooks/query-authors/useGetAllNameAuthors";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllNameCategories";
import { useCreateProduct } from "@/hooks/query-products/useCreateProduct";
import { useFormCreateProduct } from "@/hooks/query-products/useFormCreateProduct";

import useToastMessage from "@/hooks/useToastMessage";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { z } from "zod";

const tabData = [
  {
    value: "info",
    title: "Thông tin",
    content: "Manage your account settings and preferences.",
  },
  {
    value: "description",
    title: "Mô tả sản phẩm",
    content: "Change your password and security settings.",
  },
  {
    value: "image",
    title: "Ảnh sản phẩm",
  },
];

function CreateProductPage() {
  const [activeTab, setActiveTab] = useState("info");
  const { form, formSchema } = useFormCreateProduct();
  const { data: categories } = useGetAllNameCategories();
  const { data: authors } = useGetAllNameAuthors();
  const [image, setImage] = useState<File>();
  const { toastLoading } = useToastMessage();
  const [extraImages, setExtraImages] = useState<File[]>([]);

  const mutate = useCreateProduct();

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    toastLoading("Vui lòng đợi");
    mutate.mutate({
      product: values,
      main_image: image ?? null,
      extra_images: extraImages,
    });
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Manager Product</h1>{" "}
      <Link to={"/admin/products"}>
        <Button className="flex gap-2 bg-white text-black hover:bg-gray-200">
          <IoMdArrowRoundBack /> Quay lại
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className="flex flex-col gap-2 items-center"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col gap-4"
          >
            {" "}
            <TabsList className="flex h-auto items-start justify-start gap-2 !bg-transparent">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "w-full justify-start",
                    activeTab === tab.value
                      ? "!bg-slate-500 !text-white"
                      : "hover:bg-slate-500 hover:text-white"
                  )}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="w-[950px] bg-white rounded-lg shadow-lg px-4">
              <TabInfo
                value="info"
                form={form}
                categories={categories}
                authors={authors}
              />
              <TabDescription value="description" form={form} />
              <TabImages
                value="image"
                image={image}
                setImage={setImage}
                extraImage={extraImages}
                setExtraImage={setExtraImages}
              />
            </div>
          </Tabs>
          <Button className="bg-green-500 hover:bg-green-600 rounded-lg shadow-md self-end">
            Tạo
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateProductPage;
