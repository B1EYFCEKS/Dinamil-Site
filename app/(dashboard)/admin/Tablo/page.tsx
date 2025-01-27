"use client";

import { supabase } from "@/app/api/page";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button";  // Buton bileşenini kullandık
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react";
import NavbarTB from "./navbartb";
import Image from "next/image";

interface Tool {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const Tablo = () => {
  const [data, setData] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: tools, error } = await supabase.from<Tool>("tools").select("*");
    if (error) {
      console.error("Veri getirilirken hata oluştu:", error);
    } else {
      setData(tools || []);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("tools").delete().eq("id", id);

    if (error) {
      console.error("Silme hatası:", error);
    } else {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const categories = Array.from(new Set(data.map((item) => item.category)));

  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <div className="p-6">
      {/* Combobox for Categories */}
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex justify-between">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open.toString()}
            className="w-[200px] justify-between"
          >
            {selectedCategory
              ? categories.find((category) => category === selectedCategory)
              : "Kategori Seçin"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
              <NavbarTB />
        </div>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Kategori ara..." className="h-9" />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  value=""
                  onSelect={(currentValue) => {
                    setSelectedCategory(currentValue === selectedCategory ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  Tümü
                  <Check
                    className={`ml-auto ${selectedCategory === "" ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
                {categories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={(currentValue) => {
                      setSelectedCategory(currentValue === selectedCategory ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {category}
                    <Check
                      className={`ml-auto ${selectedCategory === category ? "opacity-100" : "opacity-0"}`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Cards for each tool */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div className="flex flex-col mb-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4 text-sm truncate">{item.description}</p>
              <div className="text-sm text-gray-500">{item.category}</div>
            </div>

            <div className="flex flex-row items-center justify-between space-x-4">
              <Image src={item.image_url} alt={item.title} className="w-32 h-32 object-cover" width={200} height={200} />
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
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

export default Tablo;
