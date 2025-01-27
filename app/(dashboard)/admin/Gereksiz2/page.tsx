// components/ImageList.tsx
"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/app/api/page';

interface ImageData {
  id: string;
  image_name: string;
  image_path: string;
  file_path: string;
  file_name: string;
}

export default function ImageList() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Hata:', error);
      return;
    }

    setImages(data);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id}>
          <Image
            src={image.file_path}
            alt={image.file_name}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}