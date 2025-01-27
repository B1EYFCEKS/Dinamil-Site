"use client";

import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"


const NavbarHead = () => {
  return (
    <div className="bg-white shadow-dm drop-shadow-xl rounded-2xl py-3 m-7 flex justify-between items-center">
      <div>
        <h1
          className="text-black p-2 top-12 left-14 text-xl"
        >Yerli Halı Yurdun Malı</h1>
      </div>

      <div className="flex flex-row text-white">
        <div className="text-black hover:bg-slate-100 hover:text-black p-2 m-1 rounded-xl flex flex-row items-center">
          <Link href="/">Anasayfa</Link>
        </div>
        <div className="text-black hover:bg-slate-100 hover:text-black p-2 m-1 rounded-xl flex flex-row items-center">
          <Link href="/">Halı</Link>
        </div>
        <div className="text-black hover:bg-slate-100 hover:text-black p-2 m-1 rounded-xl flex flex-row items-center">
          <Link href="/">Erdem</Link>
        </div>
        <div className="text-black hover:bg-slate-100 hover:text-black p-2 m-1 rounded-xl flex flex-row items-center">
          <Link href="/">Satış Noktalarımız</Link>
        </div>
        <div className="text-black hover:bg-slate-100 hover:text-black p-2 m-1 rounded-xl flex flex-row items-center">
          <Link href="/">İletişim</Link>
        </div>
      </div>

      <div className="text-white flex ">
        <DropdownMenu>
          <DropdownMenuTrigger>Tr</DropdownMenuTrigger>
        </DropdownMenu>
        <input
            type="text"
            placeholder="Ara..."
            className="w-full pl-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-green-400 focus:border-green-400 shadow-sm text-sm"
          />
      </div>
    </div>
    /*<div className="bg-white shadow">
      <div className="container mx-auto px-4 py-7 flex items-center justify-end">
        {/* Orta: Menü Öğeleri 
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">
              <i className="fas fa-user"></i>
            </span>
            <a href="/kayit" className="text-lg text-gray-600 hover:text-gray-800">
              Kayıt
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-orange-500">
              <i className="fas fa-heart"></i>
            </span>
            <a
              href="/begenilenler"
              className="text-lg text-gray-600 hover:text-gray-800"
            >
              Beğenilenler (0)
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-pink-500">
              <i className="fas fa-shopping-bag"></i>
            </span>
            <a
              href="/sepet"
              className="text-lg text-gray-600 hover:text-gray-800"
            >
              Alışveriş Sepeti (0)
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">
              <i className="fas fa-cog"></i>
            </span>
            <a
              href="/oturum-ac"
              className="text-lg text-gray-600 hover:text-gray-800"
            >
              Oturum Aç
            </a>
          </div>
        </div>
      </div>
    </div>*/
  );
};

export default NavbarHead;
