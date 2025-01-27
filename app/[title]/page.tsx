import { supabase } from "@/app/api/page";

interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

interface PageProps {
  params: {
    title: string;
  };
}

async function getProduct(title: string): Promise<Product | null> {
  const decodedTitle = decodeURIComponent(title).replace(/-/g, ' ');
  
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .ilike("title", decodedTitle)
      .single();

    if (error) {
      console.error("Veri çekme hatası:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Beklenmeyen hata:", error);
    return null;
  }
}

export default async function ProductDetail({ params }: PageProps) {
  const product = await getProduct(params.title);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Ürün bulunamadı</h1>
        <p className="text-gray-600">İstediğiniz ürün mevcut değil veya bir hata oluştu.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image_url}
              alt={product.title}
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                <span className="font-semibold">Kategori:</span> {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}