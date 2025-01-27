// components/ImageGallery.tsx
"use client";
import { supabase } from '@/app/api/page';
import { useEffect, useState } from 'react';
import { OptimizedImage } from './OptimizedImage';

interface ImageData {
  id: string;
  file_name: string;
  file_path: string;
}

export const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Resimler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square">
          <OptimizedImage
            src={image.file_path}
            alt={image.file_name}
            className="rounded-lg overflow-hidden"
          />
        </div>
      ))}
    </div>
  );
};