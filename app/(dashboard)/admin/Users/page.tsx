"use client";

import { useState } from "react";
import { supabase } from "@/app/api/page";

const AddUserPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    instagram: "",
    twitter: "",
    linkedin: "",
  });
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState(""); // Şifre ekleniyor
  const [error, setError] = useState("");

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("users").insert([
      {
        first_name: firstName,
        last_name: lastName,
        profile_image_url: profileImageUrl,
        bio,
        social_media_links: socialMediaLinks,
        role,
        password, // Şifre ekleniyor
      },
    ]);

    if (error) {
      setError("Kullanıcı eklenirken bir hata oluştu: " + error.message);
    } else {
      setError("");
      setFirstName("");
      setLastName("");
      setProfileImageUrl("");
      setBio("");
      setSocialMediaLinks({ instagram: "", twitter: "", linkedin: "" });
      setRole("user");
      setPassword(""); // Şifre sıfırlanıyor
      alert("Kullanıcı başarıyla eklendi!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Kullanıcı Ekle</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleAddUser}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            Ad
          </label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Soyad
          </label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profile_image_url" className="block text-sm font-medium text-gray-700">
            Profil Resmi URL&apos;si
          </label>
          <input
            type="text"
            id="profile_image_url"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Biyografi
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sosyal Medya Bağlantıları
          </label>
          <input
            type="text"
            placeholder="Instagram URL"
            value={socialMediaLinks.instagram}
            onChange={(e) =>
              setSocialMediaLinks((prev) => ({ ...prev, instagram: e.target.value }))
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={socialMediaLinks.twitter}
            onChange={(e) =>
              setSocialMediaLinks((prev) => ({ ...prev, twitter: e.target.value }))
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={socialMediaLinks.linkedin}
            onChange={(e) =>
              setSocialMediaLinks((prev) => ({ ...prev, linkedin: e.target.value }))
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="user">Kullanıcı</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Kullanıcı Ekle
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
