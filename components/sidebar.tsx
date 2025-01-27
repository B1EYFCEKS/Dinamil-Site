"use client";

import { supabase } from "@/app/api/page";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Tip tanımları
interface SubCategory {
  name: string;
  content: string;
  image: string;
}

interface Category {
  title: string;
  subCategories: SubCategory[];
}

const Sidebar: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const categories: Category[] = [
    {
      title: "Kayıt Cihazı",
      subCategories: [
        { name: "NVR Kayıt Cihazı", content: "NVR Kayıt Cihazı, IP kameralar için özel olarak tasarlanmıştır.", image: "https://via.placeholder.com/600x300" },
        { name: "DVR Kayıt Cihazı", content: "DVR Kayıt Cihazı, analog kameralar için idealdir.", image: "https://via.placeholder.com/600x300" },
        { name: "Mobil Kayıt Cihazı", content: "Mobil Kayıt Cihazları, taşınabilir çözümler sunar.", image: "https://via.placeholder.com/600x300" },
        { name: "Encoder Decoder", content: "Encoder ve Decoder, video sıkıştırma için kullanılır.", image: "https://via.placeholder.com/600x300" },
      ],
    },
    {
      title: "Kamera",
      subCategories: [
        { name: "Dome Kamera", content: "Dome kameralar, iç mekan güvenliği için uygundur.", image: "https://via.placeholder.com/600x300" },
        { name: "Bullet Kamera", content: "Bullet kameralar, uzun menzilli güvenlik sağlar.", image: "https://via.placeholder.com/600x300" },
      ],
    },
    {
      title: "İnterkom",
      subCategories: [
        { name: "Audio İnterkom", content: "Sesli interkom sistemleri, bina iletişimi sağlar.", image: "https://via.placeholder.com/600x300" },
      ],
    },
    {
      title: "Access Kontrol",
      subCategories: [
        { name: "Kartlı Geçiş Sistemi", content: "Kartlı geçiş sistemleri, bina girişlerini kontrol eder.", image: "https://via.placeholder.com/600x300" },
      ],
    },
  ];

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleSubCategoryClick = (category: Category, subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    setBreadcrumb([category.title, subCategory.name]);
  };

  //const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
        const { data, error } = await supabase.from("tools").select("title, description, image_url");
        if (error) {
            console.error("Error fetching tasks:", error);
        } else {
            setTasks(data);
        }
        }
        fetchTasks();
    }, []);


  return (
    <div className="min-h-screen bg-gray-100 items-center justify-center">
      {/* Container */}
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
                          {sub.name}
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
                    <a href="#" className={`hover:underline ${index === breadcrumb.length - 1 ? "text-gray-800 font-semibold" : ""}`}>
                      {crumb}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {selectedSubCategory ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedSubCategory.name}</h1>
                <p className="text-gray-600 mb-4">{selectedSubCategory.content}</p>
                <Image
                  src={selectedSubCategory.image}
                  alt={selectedSubCategory.name}
                  className="rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Anasayfa</h1>
                <p className="text-gray-600">Bir alt başlık seçerek içeriği burada görüntüleyebilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
