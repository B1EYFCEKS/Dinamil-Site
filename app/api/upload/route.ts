// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Benzersiz dosya adı oluştur
    const imageName = `${Date.now()}_${file.name}`;
    // Resmi public/images klasörüne kaydet
    const imagePath = path.join(process.cwd(), 'public/images', imageName);
    
    await writeFile(imagePath, buffer);

    return NextResponse.json({ 
      success: true,
      imageName,
      imagePath: `/images/${imageName}` // Frontend'de kullanılacak path
    });

  } catch (error) {
    console.error('Yükleme hatası:', error);
    return NextResponse.json(
      { error: 'Dosya yüklenemedi' },
      { status: 500 }
    );
  }
}