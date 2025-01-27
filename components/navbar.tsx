"use client";

//import { useRouter } from "next/navigation"; // useRouter'ı doğru import ettiğinizden emin olun
import React, { useState, useEffect } from "react";
//import { supabase } from "@/app/api/page";



/*interface SubCategory {
  title: string;
  description: string;
  image_url: string;
  category: string;
}

interface Category {
  title: string;
  subCategories: SubCategory[];
}*/

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [delayTimeout, setDelayTimeout] = useState(null);

  //const [categories, setCategories] = useState<Category[]>([]);
  //const [titles, setTitles] = useState<string[]>([]);
  //const router = useRouter(); // `useRoute

  const menuItems = [
    {
      title: "Koleksiyonlar",
      href: "/Koleksiyonlar",
      subMenu: [
        { title: "Koleksiyon", href: "/Koleksiyonlar" },
      ],
    },
    {
      title: "Haberler",
      href: "/Haberler",
      subMenu: [
        { title: "Haber", href: "/Haber" },
      ],
    },
    {
      title: "Kurumsal",
      href: "/Kurumsal",
      subMenu: [
        { title: "Kurumsal", href: "/Kurumsal" },
      ],
    },
    {
      title: "Halı",
      href: "/access-kontrol",
      subMenu: [
        { title: "Halı", href: "/Halı" },
      ],
    },
    {
      title: "Video",
      href: "/Video",
      subMenu: [
        { title: "Video", href: "/Video" },
      ],
    },
    {
      title: "Sosyal Sorumluluk Projelerimiz",
      href: "/SSP",
      subMenu: [
        { title: "Sosyal Sorumluluk Politikası", href: "/SSP" },
        { title: "Merinos Servi Erdemoğlu Camii", href: "/MSEC" },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    // Gecikme varsa temizle
    if (delayTimeout) clearTimeout(delayTimeout);
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    // Gecikmeli olarak menüyü kapat
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 300); // 300ms gecikme
    setDelayTimeout(timeout);
  };

  useEffect(() => {
    /*const fetchCategories = async () => {
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
        };*/

        /*const fetchTitles = async () => {
          const { data, error } = await supabase
            .from("tools")
            .select("title");
    
          if (error) {
            console.error("Başlıklar alınamadı:", error);
          } else {
            const titleList = data.map((item: { title: string }) => item.title);
            setTitles(titleList);
          }
        };*/

    // Temizleme
    return () => {
      if (delayTimeout) clearTimeout(delayTimeout);
    };
  }, [delayTimeout]);

  return (
    <div className="bg-white text-black border border-gray-600 shadow-xl drop-shadow-md my-5 p-5 m-7 rounded-xl mt-1 sticky top-5">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative group mx-4"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={item.href}
              className="cursor-pointer hover:text-green-400"
            >
              {item.title}
            </a>
            {item.subMenu.length > 0 && activeMenu === index && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <a
                    key={subIndex}
                    href={subItem.href}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-green-500"
                  >
                    {subItem.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
