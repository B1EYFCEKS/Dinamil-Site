"use client";

import { supabase } from "@/app/api/page";
import React, { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Supabase sorgusu
      const { data, error } = await supabase
        .from("Admin") // Kullanıcı tablosu adı
        .select("name, password")
        .eq("name", name)
        .eq("password", password)
        .single();

      if (error || !data) {
        setError("Geçersiz kullanıcı adı veya şifre.");
        return;
      }

      // Giriş başarılı, yönlendirme yap
      alert(`Hoş geldiniz, ${data.name}!`);
      // Örnek: Yönlendirme yapılabilir
      window.location.href = "/admin";
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl font-bold mb-4">Giriş Yap</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Kullanıcı Adı
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300"
            required
          />
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;