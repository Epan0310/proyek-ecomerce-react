"use client"; // <--- TAMBAHKAN INI LAGI, karena Swiper adalah Client Component

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css"; // Gaya dasar
import "swiper/css/pagination"; // Gaya untuk pagination (titik-titik di bawah)

// Import required modules (ini untuk fitur autoplay, pagination, navigation)
import { Autoplay, Pagination } from "swiper/modules";

// Ikon untuk KATEGORI
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  TrophyIcon,
  SparklesIcon,
  HomeIcon,
  GlobeAltIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

// Data untuk banner slider
const bannerSlides = [
  {
    id: 1,
    title: "Diskon Akhir Tahun!",
    description: "Dapatkan diskon hingga 50% untuk produk pilihan.",
    link: "/shop",
    bgColor: "from-green-400 to-blue-600",
  },
  {
    id: 2,
    title: "Gratis Ongkir Seluruh Indonesia",
    description: "Belanja sepuasnya tanpa biaya pengiriman tambahan.",
    link: "/shop/promo-gratis-ongkir",
    bgColor: "from-purple-400 to-pink-600", // Contoh warna lain
  },
  {
    id: 3,
    title: "Produk Terbaru Gadget 2024",
    description: "Jelajahi koleksi gadget terbaru dengan teknologi mutakhir.",
    link: "/shop/gadget",
    bgColor: "from-yellow-400 to-red-600", // Contoh warna lain
  },
];

// Data produk dummy (masih sama)
const dummyProducts = [
  {
    id: 1,
    name: "Kemeja Pria Lengan Panjang",
    price: "Rp 150.000",
    image: "/kemeja-keren-lp.jpeg",
    location: "Jakarta Barat",
  },
  {
    id: 2,
    name: "Sepatu Sneakers Pria",
    price: "Rp 275.000",
    image: "/sepatu-sneakers-pria.jpeg",
    location: "Bandung",
  },
  {
    id: 3,
    name: "Jam Tangan Digital Pria",
    price: "Rp 199.000",
    image: "/jam-tangan-digital.jpeg",
    location: "Surabaya",
  },
  {
    id: 4,
    name: "Headphone Bluetooth Kualitas Tinggi",
    price: "Rp 450.000",
    image: "/headphone-bluetooth.jpg",
    location: "Medan",
  },
  {
    id: 5,
    name: "Tas Ransel Laptop Anti Air",
    price: "Rp 220.000",
    image: "/tas-ransel-antiair.jpeg",
    location: "Jakarta Pusat",
  },
  {
    id: 6,
    name: "Mouse Gaming Wireless",
    price: "Rp 310.000",
    image: "/mouse-gaming-wireless.jpg",
    location: "Yogyakarta",
  },
  {
    id: 7,
    name: "Lampu Meja Belajar LED",
    price: "Rp 120.000",
    image: "/lampu-belajar-led.jpeg",
    location: "Bandung",
  },
  {
    id: 8,
    name: "Blender Buah Portabel",
    price: "Rp 180.000",
    image: "/blender-buah-portable.jpeg",
    location: "Jakarta Barat",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto max-w-6xl p-4">
        {/* 1. Hero Banner (Carousel) */}
        <div className="w-full h-64 rounded-lg shadow-lg mb-6 overflow-hidden">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true} // <-- Ini saya hapus (BUG FIX)
            modules={[Autoplay, Pagination]} // <-- 'Navigation' sudah dihapus
            className="mySwiper h-full"
          >
            {bannerSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className={`w-full h-full bg-gradient-to-br ${slide.bgColor} p-8 text-white flex flex-col justify-center`}
                >
                  <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                  <p className="text-xl">{slide.description}</p>
                  <Link
                    href={slide.link}
                    className="mt-4 bg-white text-green-600 font-bold py-2 px-4 rounded-lg w-max hover:bg-gray-100 transition"
                  >
                    Belanja Sekarang
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 2. Grid Kategori (ala Shopee) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Kategori Pilihan</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-y-4 text-center">
            <CategoryItem
              icon={BoltIcon}
              title="Elektronik"
              href="/shop/elektronik"
            />
            <CategoryItem
              icon={ComputerDesktopIcon}
              title="Komputer"
              href="/shop/komputer"
            />
            <CategoryItem
              icon={DevicePhoneMobileIcon}
              title="Gadget"
              href="/shop/gadget"
            />
            <CategoryItem
              icon={SparklesIcon}
              title="Kecantikan"
              href="/shop/kecantikan"
            />
            <CategoryItem
              icon={TrophyIcon}
              title="Olahraga"
              href="/shop/olahraga"
            />
            <CategoryItem icon={HomeIcon} title="Rumah" href="/shop/rumah" />
            <CategoryItem icon={BookOpenIcon} title="Buku" href="/shop/buku" />
            <CategoryItem
              icon={GlobeAltIcon}
              title="Lainnya"
              href="/shop/lainnya"
            />
          </div>
        </div>

        {/* 3. Grid Produk (Rekomendasi) */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Rekomendasi Untukmu</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dummyProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                // --- PERUBAHAN 1: Tambahkan 'group' ---
                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  // --- PERUBAHAN 2: Ganti 'hover:' menjadi 'group-hover:' ---
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {product.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.location}
                  </p>
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
function CategoryItem({
  icon: Icon,
  title,
  href,
}: {
  icon: React.ElementType;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center hover:text-green-600 transition"
    >
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-gray-700" />
      </div>
      <span className="text-sm mt-2 font-medium">{title}</span>
    </Link>
  );
}