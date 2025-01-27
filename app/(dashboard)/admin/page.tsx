"use client";

import { supabase } from "@/app/api/page"; // Supabase bağlantısı
import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState(""); // Yeni kategori
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false); // Yeni kategori seçimi için durum

  // Kategorileri çekme
  const fetchCategories = async () => {
    const { data: tools, error } = await supabase.from("tools").select("category");
    if (error) {
      console.error("Kategoriler alınırken hata oluştu:", error);
    } else {
      const categories = Array.from(new Set(tools.map((tool) => tool.category)));
      setData(categories); // Kategorileri set et
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Veri ekleme
  const handleAdd = async (e) => {
    e.preventDefault();

    // Eğer yeni kategori eklenmişse, kategori adını kullan
    const categoryToUse = isNewCategory ? newCategory : category;

    const { error } = await supabase.from("tools").insert([
      {
        title,
        description,
        category: categoryToUse,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      setError("Veri eklenirken bir hata oluştu.");
    } else {
      setError("");
      setTitle("");
      setCategory("");
      setNewCategory("");
      setDescription("");
      setImageUrl("");
      fetchCategories(); // Yeni veriyi çek
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value) {
      setIsNewCategory(false); // Var olan kategori seçildiğinde yeni kategori alanını kapat
    }
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

          {/* Veri ekleme formu */}
          <form className="bg-white p-6 rounded shadow-md mb-6" onSubmit={handleAdd}>
            <h2 className="text-xl font-semibold mb-4">Yeni Veri Ekle</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Başlık
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Kategori Seçimi */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <div className="flex items-center space-x-4">
                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                >
                  <option value="">Mevcut Kategoriler</option>
                  {data.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setIsNewCategory(!isNewCategory)}
                  className="text-blue-500"
                >
                  {isNewCategory ? "Varolan Kategoriyi Seç" : "Yeni Kategori Ekle"}
                </button>
              </div>

              {/* Yeni kategori ekleme */}
              {isNewCategory && (
                <input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  required
                />
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Açıklama
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Resim URL&apos;si
              </label>
              <input
                type="text"
                id="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Ekle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
