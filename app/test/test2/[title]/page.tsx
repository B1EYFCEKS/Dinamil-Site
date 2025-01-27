"use client"; // Bu satır, bu component'in sadece client-side'da çalışmasını sağlar.

import { useState, useEffect } from "react";
import { supabase } from "@/app/api/page"; // Supabase API bağlantınızı import edin
import Image from "next/image";

interface SubCategory {
  title: string;
  description: string;
  image_url: string;
}

interface SubCategoryy {
  title: string;
  description: string;
  image_url: string;
  category: string;
}

interface Category {
  title: string;
  subCategories: SubCategoryy[];
}

const DynamicPage = () => {
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  /*const [categories, setCategories] = useState<Category[]>([]);
  const [titles, setTitles] = useState<string[]>([]);*/
  const [selectedTitle] = useState<string | null>(null); // Tıklanan başlık
  // selectedTitle "setSelectedTitle"
  useEffect(() => {
    // Kategorileri çekme işlemi
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
      data?.forEach((item: SubCategoryy) => {
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

  useEffect(() => {
    if (selectedTitle) {
      // Başlık seçildiğinde Supabase'den veri çekme işlemi
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("tools")
          .select("*")
          .ilike("title", decodeURIComponent(selectedTitle).replace(/-/g, " "));

        if (error || !data || data.length === 0) {
          return;
        }

        setSubCategory(data[0]);
      };

      fetchData();
    }
  }, [selectedTitle]); // selectedTitle değiştiğinde veri çek

  // Başlığa tıklandığında tetiklenecek fonksiyon
  /*const handleTitleClick = (title: string) => {
    setSelectedTitle(title); // Başlık seçildiğinde setSelectedTitle ile değeri güncelle
  };*/

  if (!subCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Başlık bulunamadı!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-blue-600">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Seçilen Başlık: {selectedTitle}</h2>
      </div>
      <h1 className="text-3xl font-bold mb-4">{subCategory.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{subCategory.description}</p>
      <Image
        src={subCategory.image_url}
        alt={subCategory.title}
        className="rounded-lg shadow-lg"
        style={{ maxWidth: "600px" }}
      />
    </div>
  );
};

export default DynamicPage;
