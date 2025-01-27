"use client"

import Navbar from "@/components/navbar";
import NavbarHead from "@/components/navbar-head";
import Image from "next/image";
/*import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/sidebar";*/
import DBSidebar from "./test/test2/page";
//import { Jura } from "next/font/google";
import Link from "next/link";

/*const font = Jura({
  subsets: ["latin"],
  weight: ["400"],
});*/

export default function Home() {
  const resim = "/MerResim.jpg"
  return (
    <div>
      <NavbarHead />
      <div className="text-4xl someting m-7 rounded-3xl shadow-md drop-shadow-xl" style={{backgroundImage: `url(${resim})`, width: "1450px", height: "600px",}} >
        <h1
          className=" text-white p-7"
          style={{
            fontFamily: "Jura",
            left: "70px",
            top: "150px",
          }}
        >
          <span className="text-9xl">Geleneksel ve Modern</span><br /> motifleriyle evlerinizin vazgeçilmezi
        </h1>

        <div 
          className="backdrop-blur-xl top-96 rounded-2xl m-6 text-xl flex justify-between "
          style={{
            width: "250px",
          }}
        >
          <Link href="">
            <h1 className="text-white p-7">Hemen Sipariş</h1>
          </Link>
          <Image
            alt="Halı"
            src="/Halıbir.jpg"
            width={90}
            height={70}
            className="m-7"
          />
        </div>
      </div>
      <Navbar />
      <DBSidebar />
    </div>
  );
}
