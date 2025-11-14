import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <div className="p-10 text-center text-xl">
        Dashboard — Kamu berhasil login!
      </div>
    </div>
  );
}
