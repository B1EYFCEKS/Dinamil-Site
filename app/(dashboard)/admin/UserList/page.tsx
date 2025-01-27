"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/api/page"; // Supabase bağlantısı
import Image from "next/image";

interface Admin {
  id: string;
  role: string;
  profile_image_url: string;
  first_name: string;
  last_name: string;
  social_media_links: Record<string, string>;
  bio: string;
  // diğer özellikleri ekleyin
}

const UsersPage = () => {
  const [users, setUsers] = useState<Admin[]>([]); // Kullanıcı verilerini tutacak
  const [loading, setLoading] = useState(true); // Yükleniyor durumunu kontrol et
  const [error, setError] = useState<string>(""); // Hata mesajı
  const [deleting, setDeleting] = useState(false); // Silme işlemi durumu

  // Kullanıcıları Supabase'ten al
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        setError("Kullanıcı bilgileri alınırken hata oluştu: " + error.message); // Hata mesajı
      } else {
        setUsers(data); // Verileri state'e al
      }

      setLoading(false); // Yükleme tamamlandı
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true); // Silme işlemini başlat
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      setError("Kullanıcı silinirken hata oluştu: " + error.message); // Hata mesajı
    } else {
      setUsers(users.filter((user) => user.id !== id)); // Silinen kullanıcıyı listeden kaldır
      setError(""); // Hata mesajını sıfırla
    }

    setDeleting(false); // Silme işlemi tamamlandı
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Hata mesajını ekrana yazdır
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Kullanıcılar</h1>

      {/* Kullanıcı Sayısı veya Uyarı Mesajı */}
      {users.length > 0 ? (
        <p className="mb-4 text-green-500">
          Toplam Kullanıcı Sayısı: <strong>{users.length}</strong>
        </p>
      ) : (
        <p className="mb-4 text-red-500">Henüz kullanıcı eklemediniz.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user: Admin) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="capitalize text-gray-600">
                {user.role}
            </h3>
            <div className="flex flex-col items-center justify-center">
            <Image
              src={user.profile_image_url || "/default-avatar.png"}
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{user.bio}</p>

            <div className="text-sm text-gray-500">
              {user.social_media_links?.instagram && (
                <div>
                  Instagram:{" "}
                  <a
                    href={user.social_media_links.instagram}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {user.social_media_links.instagram}
                  </a>
                </div>
              )}
              {user.social_media_links?.twitter && (
                <div>
                  Twitter:{" "}
                  <a
                    href={user.social_media_links.twitter}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {user.social_media_links.twitter}
                  </a>
                </div>
              )}
              {user.social_media_links?.linkedin && (
                <div>
                  LinkedIn:{" "}
                  <a
                    href={user.social_media_links.linkedin}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {user.social_media_links.linkedin}
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => handleDelete(user.id)}
              className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              disabled={deleting}
              >
              Sil
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
