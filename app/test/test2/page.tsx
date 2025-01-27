"use client"; // Bu satırın olması, bu component'in sadece client-side'da çalışmasını sağlar.

//import { useRouter } from "next/navigation"; // useRouter'ı doğru import ettiğinizden emin olun
import { useState, useEffect } from "react";
import { supabase } from "@/app/api/page";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Tip tanımları
interface SubCategory {
  title: string;
  description: string;
  image_url: string;
  category: string;
}

interface Category {
  title: string;
  subCategories: SubCategory[];
}

export const revalidate = 3600;

const DBSidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  /*const router = useRouter(); // `useRouter` burada client-side'da çalışıyor.*/

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("category, title, description, image_url")
        .order("category");

      if (error) {
        console.error("Kategori verileri alınamadı:", error);
        return;
      }

      const groupedCategories: Category[] = [];
      data?.forEach((item: SubCategory) => {
        const existingCategory = groupedCategories.find(
          (category) => category.title === item.category
        );

        if (existingCategory) {
          existingCategory.subCategories.push(item);
        } else {
          groupedCategories.push({
            title: item.category,
            subCategories: [item],
          });
        }
      });

      setCategories(groupedCategories);
    };

    const fetchTitles = async () => {
      const { data, error } = await supabase
        .from("tools")
        .select("title");

      if (error) {
        console.error("Başlıklar alınamadı:", error);
      } else {
        const titleList = data.map((item: { title: string }) => item.title);
        setTitles(titleList);
      }
    };

    fetchTitles();
    fetchCategories();
  }, []);

  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const router = useRouter();

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleSubCategoryClick = (category: Category, subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    setBreadcrumb([category.title, subCategory.title]);
  };

  const handleTitleClick = (title: string) => {
    const dynamicUrl = encodeURIComponent(title.toLowerCase().replace(/ /g, "-"));
    window.history.pushState(null, '', `/${dynamicUrl}`); 
  };

  const handleButtonClick = (subCategory: SubCategory) => {
    // toggleCategory ve handleTitleClick fonksiyonlarını tek bir butonla çalıştırıyoruz
    handleTitleClick(subCategory.title); // alt başlık olan title'ı URL'ye ekliyoruz
  };

  const handleDetailClick = (title: string) => {
    // URL'deki özel karakterleri ve boşlukları düzenleme
    const slugifiedTitle = title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/${encodeURIComponent(slugifiedTitle)}`); // '/detay/' kısmını kaldırdık
  };

  return (
    <div className="min-h-screen bg-gray-100 items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-4 lg:col-span-3 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Kategoriler</h2>
            <ul>
              {categories.map((category, index) => (
                <li key={index} className="mb-3">
                  <button
                    onClick={() => toggleCategory(index)}
                    className="flex items-center justify-between w-full text-gray-600 font-medium text-left py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition"
                  >
                    <span>{category.title}</span>
                    <span>{openCategory === index ? "-" : "+"}</span>
                  </button>
                  {openCategory === index && category.subCategories.length > 0 && (
                    <ul className="ml-4 mt-2">
                      {category.subCategories.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className="py-2 px-4 bg-gray-50 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
                          onClick={() => handleSubCategoryClick(category, sub)}
                        >
                          <button
                            onClick={() => handleButtonClick(sub)} // butona tıklandığında title'ı URL'ye ekle
                          >
                            {sub.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="col-span-8 lg:col-span-9 bg-white rounded-lg shadow-lg p-6">
            {/* Breadcrumb */}
            <nav className="text-gray-600 text-sm mb-4">
              <ul className="flex space-x-2">
                <li>
                  <a href="#" className="hover:underline text-gray-800">
                    Anasayfa
                  </a>
                </li>
                {breadcrumb.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mx-2">/</span>
                    <a
                      href="#"
                      className={`hover:underline ${
                        index === breadcrumb.length - 1 ? "text-gray-800 font-semibold" : ""
                      }`}
                    >
                      {crumb}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-8 lg:col-span-9 bg-white rounded-lg shadow-lg p-6">
            {selectedSubCategory ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedSubCategory.title}
                </h1>
                <p className="text-gray-600 mb-4">{selectedSubCategory.description}</p>
                <Image
                  src={selectedSubCategory.image_url}
                  alt={selectedSubCategory.title}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg mb-4"
                />
                <button
                  onClick={() => handleDetailClick(selectedSubCategory.title)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Ürün Detaylarını Gör
                </button>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Anasayfa</h1>
                <p className="text-gray-600">
                  Bir alt başlık seçerek içeriği burada görüntüleyebilirsiniz.
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBSidebar;
