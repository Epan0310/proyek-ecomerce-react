import Link from "next/link";
// Kita akan pakai ikon sosial media, jadi kita butuh react-icons
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    // Kita pakai bg-gray-900 (gelap) agar kontras dan profesional
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto max-w-6xl p-8">
        {/* Konten Utama (4 kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Brand & Sosial Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">MyShop</h3>
            <p className="text-sm mb-4">
              Platform e-commerce terpercaya untuk semua kebutuhan Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-white" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-white" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-white" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Belanja */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Belanja</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/elektronik" className="hover:text-white">
                  Elektronik
                </Link>
              </li>
              <li>
                <Link href="/shop/pakaian" className="hover:text-white">
                  Pakaian
                </Link>
              </li>
              <li>
                <Link href="/shop/rumah" className="hover:text-white">
                  Perlengkapan Rumah
                </Link>
              </li>
              <li>
                <Link href="/shop/kecantikan" className="hover:text-white">
                  Kecantikan
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Lihat Semua
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Bantuan */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Info Pengiriman
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Tentang MyShop */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Tentang MyShop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis pemisah */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
