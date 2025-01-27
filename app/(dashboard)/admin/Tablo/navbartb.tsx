"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/api/page";
//import { HoverCard } from "radix-ui";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import Image from "next/image";


interface Admin {
  profile_image_url: string;
  first_name: string;
  bio: string;
  // diğer özellikleri ekleyin
}

const NavbarTB = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  

  useEffect(() => {
    const fetchAdmin = async () => {
      const { data, error } = await supabase.from("users").select("*").eq("role", "admin").limit(1);

      if (error) {
        console.error("Admin bilgisi alınırken bir hata oluştu:", error.message);
      } else if (data && data.length > 0) {
        setAdmin(data[0]); // İlk admin kullanıcısını alıyoruz
      }
    };

    fetchAdmin();
  }, []);

  return (
    <nav className="text-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        {admin ? (
          <div className="flex items-center">
            <HoverCard>
                <HoverCardTrigger>
                <a
                    className="ImageTrigger"
                    href="https://instagram.com/osmanxcan_"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <Image
                        className="Image normal rounded-full"
                        src={admin.profile_image_url || "/default-avatar.png"}
                        alt="Radix UI"
                        width={40}
                        height={40}
                    />
                </a>
                </HoverCardTrigger>
                <HoverCardContent>
                <Image
                  className="Image large rounded-full"
                  src={admin.profile_image_url}
                  alt="Radix UI"
                  height={60}
                  width={60}
					      />
					<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
						<div>
							<div className="Text bold py-3">{admin.first_name}</div>
						</div>
						<div className="Text">
							{admin.bio}
						</div>
					</div>
                </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <p>Admin kullanıcı bulunamadı.</p>
        )}
      </div>
    </nav>
  );
};

export default NavbarTB;
