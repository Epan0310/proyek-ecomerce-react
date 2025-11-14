import Link from "next/link";
import Navbar from "@/components/Navbar";

// Kita import ikon-ikon untuk KATEGORI
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  BoltIcon, // untuk Elektronik
  TrophyIcon, // untuk Sport
  SparklesIcon, // untuk Kecantikan
  HomeIcon, // untuk Rumah
  GlobeAltIcon, // untuk Lainnya
  BookOpenIcon, // untuk Buku
} from "@heroicons/react/24/outline";
import Image from "next/image"; // Kita pakai Image
// ---
// Anda tidak perlu 'useState' atau 'useEffect' di sini.
// Navbar akan mengurus data user-nya sendiri.
// ---

// 1. KITA BUAT DATA PRODUK DUMMY
// Nanti ini akan Anda ambil dari database (Prisma)
const dummyProducts = [
  {
    id: 1,
    name: "Kemeja Pria Lengan Panjang",
    price: "Rp 150.000",
    image: "https://via.placeholder.com/300x300.png?text=Kemeja",
    location: "Jakarta Barat",
  },
  {
    id: 2,
    name: "Sepatu Sneakers Pria",
    price: "Rp 275.000",
    image: "https://via.placeholder.com/300x300.png?text=Sepatu",
    location: "Bandung",
  },
  {
    id: 3,
    name: "Jam Tangan Digital Pria",
    price: "Rp 199.000",
    image: "https://via.placeholder.com/300x300.png?text=Jam+Tangan",
    location: "Surabaya",
  },
  {
    id: 4,
    name: "Headphone Bluetooth Kualitas Tinggi",
    price: "Rp 450.000",
    image: "https://via.placeholder.com/300x300.png?text=Headphone",
    location: "Medan",
  },
  {
    id: 5,
    name: "Tas Ransel Laptop Anti Air",
    price: "Rp 220.000",
    image: "https://via.placeholder.com/300x300.png?text=Tas+Ransel",
    location: "Jakarta Pusat",
  },
  {
    id: 6,
    name: "Mouse Gaming Wireless",
    price: "Rp 310.000",
    image: "https://via.placeholder.com/300x300.png?text=Mouse",
    location: "Yogyakarta",
  },
  {
    id: 7,
    name: "Lampu Meja Belajar LED",
    price: "Rp 120.000",
    image: "https://via.placeholder.com/300x300.png?text=Lampu+Meja",
    location: "Bandung",
  },
  {
    id: 8,
    name: "Blender Buah Portabel",
    price: "Rp 180.000",
    image: "https://via.placeholder.com/300x300.png?text=Blender",
    location: "Jakarta Barat",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto max-w-6xl p-4">
        
        {/* 2. Hero Banner (Pengganti Saldo) */}
        <div className="w-full h-64 rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-8 text-white flex flex-col justify-center shadow-lg mb-6">
          <h1 className="text-4xl font-bold mb-2">Diskon Akhir Tahun!</h1>
          <p className="text-xl">Dapatkan diskon hingga 50% untuk produk pilihan.</p>
          <Link href="/shop" className="mt-4 bg-white text-green-600 font-bold py-2 px-4 rounded-lg w-max hover:bg-gray-100 transition">
            Belanja Sekarang
          </Link>
        </div>

        {/* 3. Grid Kategori (ala Shopee) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Kategori Pilihan</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-y-4 text-center">
            
            <CategoryItem icon={BoltIcon} title="Elektronik" href="/shop/elektronik" />
            <CategoryItem icon={ComputerDesktopIcon} title="Komputer" href="/shop/komputer" />
            <CategoryItem icon={DevicePhoneMobileIcon} title="Gadget" href="/shop/gadget" />
            <CategoryItem icon={SparklesIcon} title="Kecantikan" href="/shop/kecantikan" />
            <CategoryItem icon={TrophyIcon} title="Olahraga" href="/shop/olahraga" />
            <CategoryItem icon={HomeIcon} title="Rumah" href="/shop/rumah" />
            <CategoryItem icon={BookOpenIcon} title="Buku" href="/shop/buku" />
            <CategoryItem icon={GlobeAltIcon} title="Lainnya" href="/shop/lainnya" />
            
          </div>
        </div>

        {/* 4. Grid Produk (Rekomendasi) */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Rekomendasi Untukmu</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Kita .map() data dummy di sini */}
            {dummyProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
                  <p className="text-lg font-bold text-green-600 mt-1">{product.price}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Komponen helper untuk item kategori (biar rapi)
function CategoryItem({ icon: Icon, title, href }: { icon: React.ElementType, title: string, href: string }) {
  return (
    <Link href={href} className="flex flex-col items-center hover:text-green-600 transition">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-gray-700" />
      </div>
      <span className="text-sm mt-2 font-medium">{title}</span>
    </Link>
  );
}