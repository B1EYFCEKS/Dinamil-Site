"use client";
import { supabase } from '@/app/api/page';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ImageUploadFormProps {
  onUploadSuccess?: (imageUrl: string) => void;
  onUploadError?: (error: Error) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ 
  onUploadSuccess, 
  onUploadError 
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file_name, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      
      // Önceki URL'i temizle
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      // Yeni önizleme URL'i oluştur
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }



  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!selectedImage) {
      alert('Lütfen bir resim seçin');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
        // API çağrısı
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            alert('Resim başarıyla yüklendi!');
            // Yüklenen resmin URL'i: data.imageUrl
          }
        } else {
          throw new Error('Yükleme başarısız oldu');
        }
      } catch (error) {
        console.error('Hata:', error);
        alert('Yükleme sırasında bir hata oluştu');
      }
    };

  // Component unmount olduğunda önizleme URL'ini temizle
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* Supabase Tarafı */


  const handleAddImage = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const { error } = await supabase.from("images").insert([
        {
            file_name,
        },
      ]);
  
      if (error) {
        setError("Kullanıcı eklenirken bir hata oluştu: " + error.message);
      } else {
        setError("");
        setFileName("");
        alert("Resim başarıyla eklendi!");
      }
    };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resim Seç
          </label>
          <input
            type="file"
            accept="/images/*"
            id={file_name}
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Önizleme:</p>
            <img
              src={previewUrl}
              alt="Önizleme"
              className="mt-2 max-w-full h-48 object-contain"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          disabled={!selectedImage}
        >
          Yükle
        </button>
      </form>
    </div>
  );
};

export default ImageUploadForm;