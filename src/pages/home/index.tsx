import Carousel from "@/components/home/carousel";
import ProductTabs from "@/components/home/producttabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="relative w-full h-[700px] mb-8 flex items-center">
        <div className="absolute inset-0">
          <Carousel />
        </div>
        <div className="relative z-10 flex-1 px-10 lg:px-20">
          <div className="bg-black bg-opacity-50 p-5 rounded-lg max-w-lg">
            <h2 className="text-3xl lg:text-4xl font-bold mb-5 text-white drop-shadow-lg">
              Khám phá Thế Giới Manga
            </h2>
            <p className="text-lg mb-5 text-white drop-shadow-lg">
              Hãy cùng đắm chìm trong những câu chuyện thú vị và hấp dẫn nhất!
            </p>
            <Link to="/products">
              <Button
                variant="ghost"
                className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Khám phá ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <img
          loading="lazy"
          className="w-full h-auto"
          src="https://res.cloudinary.com/dmsuwoosx/image/upload/v1732522003/Manga_LDP_Mainbanner_web_1920x700_wlogeu.webp"
          alt="Banner phụ"
          width="1920"
          height="auto"
        />
      </div>

      <div className="px-4 lg:px-40">
        <img
          loading="lazy"
          className="w-full h-auto"
          src="https://res.cloudinary.com/dmsuwoosx/image/upload/v1733549670/Manga_LDP_Tagname_02_tmqnjc.webp"
          alt="Tagline Manga"
        />
        <div className="my-8">
          <ProductTabs />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
