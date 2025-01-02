import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent className="h-40">
        {[
          {
            link: "hotwheels?fhs_campaign=homepageslider6",
            imgSrc:
              "https://cdn0.fahasa.com/media/magentothem/banner7/BannerHomePage_HotWheels_SlideBanner_840x320_2.jpg",
            alt: "Hot Wheels",
          },
          {
            link: "sale?fhs_campaign=homepageslider1",
            imgSrc:
              "https://cdn0.fahasa.com/media/magentothem/banner7/TrangCTthang10_Mainbanner_25_10_APP_840x320.png",
            alt: "Sale",
          },
          {
            link: "alpha-books?fhs_campaign=homepageslider2",
            imgSrc:
              "https://cdn0.fahasa.com/media/magentothem/banner7/AlphaBooksT1024_Slide_840x320_1.jpg",
            alt: "Alpha Books",
          },
          {
            link: "uu-dai-ngap-tran?fhs_campaign=homepageslider3",
            imgSrc:
              "https://cdn0.fahasa.com/media/magentothem/banner7/Trangdoitac_1024_Resize_Slidebanner_840x320.png",
            alt: "Special Offers",
          },
          {
            link: "do-choi-mo-hinh?fhs_campaign=homepageslider4",
            imgSrc:
              "https://cdn0.fahasa.com/media/magentothem/banner7/TrangBlindBox_SlideBanner_840x320.jpg",
            alt: "Model Toys",
          },
        ].map((item, index) => (
          <CarouselItem key={index}>
            <a href={item.link} className="p-1">
              <Card>
                <CardContent className="flex aspect-[4/3] items-center justify-center p-6">
                  {" "}
                  {/* Độ cao của Card */}
                  <img
                    className="w-full h-auto rounded-lg" // Kích thước hình ảnh
                    src={item.imgSrc}
                    alt={item.alt}
                  />
                </CardContent>
              </Card>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
