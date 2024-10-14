import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface TabImageProps {
  value: string;
  image: File | undefined;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  extraImage: File[] | undefined;
  setExtraImage: Dispatch<SetStateAction<File[]>>;
}

function TabImages(props: TabImageProps) {
  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    props.setImage(file);
  }

  function handleExtraImage(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    files && props.setExtraImage(Array.from(files));
  }

  return (
    <TabsContent value={props.value} className="flex gap-4">
      <div className="flex flex-col gap-4 w-full">
        {/* Phần ảnh chính */}
        <div className="flex items-center gap-4 w-full">
          <div className="w-1/5 flex flex-col">
            <button
              type="button"
              onClick={() => document.getElementById("main-picture")?.click()}
              className="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Tải lên ảnh đại diện
            </button>
            <Input
              required
              onChange={handleImage}
              id="main-picture"
              type="file"
              accept="image/*"
            />
          </div>
          {props.image ? (
            <div className="w-28 h-28 relative">
              <img
                src={URL.createObjectURL(props.image)}
                alt="Ảnh đại diện"
                className="absolute inset-0 w-full h-full rounded-xl object-cover shadow-md"
              />
            </div>
          ) : (
            <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-xl">
              <span className="text-gray-500 text-sm">Chưa có ảnh</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="w-1/5 flex flex-col">
            <button
              type="button"
              onClick={() => document.getElementById("extra-picture")?.click()}
              className="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Tải lên ảnh phụ
            </button>
            <Input
              onChange={handleExtraImage}
              id="extra-picture"
              multiple
              type="file"
              accept="image/*"
            />
          </div>

          <ScrollArea className="h-[265px] w-4/5 border border-gray-300 rounded-md p-2">
            {props.extraImage && props.extraImage.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {props.extraImage.map((image) => (
                  <div key={image.name} className="relative w-28 h-28">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Ảnh phụ"
                      className="absolute inset-0 w-full h-full rounded-xl object-cover shadow-md"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <span className="text-gray-500 text-sm">Chưa có ảnh</span>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </TabsContent>
  );
}

export default TabImages;
