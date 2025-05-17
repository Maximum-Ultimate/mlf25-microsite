import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxT9S74YtpGdGeA_jxqrvEctQ4yKopZdxPxOfs0gLDIe66BtAMFEni04D4f8TuHHRDS/exec";
const packages = [
  {
    id: 1,
    label: "Bandeng Presto merk 'PRESTO'",
    desc: "Deskripsi :<br/>-Kemasan Vacuum<br/>-Tahan suhu ruang 4hari<br/>-Tahan di Freezer 1bulan <br/>-Berat 0,5 Kilogram (@ 2 bandeng)",
    price: 77500,
  },
  {
    id: 2,
    label: "MOCI GEMINI ORIGINAL",
    desc: "Deskripsi :<br/>- 1 Box isi 16 pieces<br/>- Tahan 7 hari di suhu ruang",
    price: 56000,
  },
  {
    id: 3,
    label: "WINGKO BABAT, MIXES",
    desc: "Deskripsi :<br/>- Rasa Mix: Kelapa, Pisang, Nangka, Coklat, dan Durian<br/>- Kemasan Plastik<br/>- Tahan di suhu ruang 4 hari<br/>- Isi 20 pieces",
    price: 45000,
  },
  {
    id: 4,
    label: "TAHU BAXO BU PUJI",
    desc: "Deskripsi :<br/>- Tahu baxo alumunium foil Bu Pudji<br/>- Tahan di suhu ruang 6 bulan<br/>- TIDAK DISARANKAN masuk freezer<br/>- Isi 10 pieces",
    price: 70000,
  },
  {
    id: 5,
    label: "LUNPIA MBAK LIEN",
    desc: "Deskripsi :<br/>- Setengah matang<br/>- Isian: Ayam, Udang, Telur dan Rebung sudah jadi satu<br/>- Tahan di suhu ruang 2 hari<br/>- Tahan di kulkas 7 hari<br/>- Tahan di freezer 2 bulan<br/>- Isi 5 pieces",
    price: 125000,
  },
];
const kvImage = "/assets/img/kv.webp";

export default function Order() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    packages: {},
    name: "",
    phone: "",
    email: "",
  });
  
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3285/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packages: formData.packages,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          total: totalPrice,
        }),
      });

      const json = await res.json();
      if (json.status === "success") {
        handleNext(); // go to thank-you
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setError("There was an error submitting your order. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPackages = Object.entries(formData.packages)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const pkg = packages.find((p) => p.id === parseInt(id)); // ✅ Fix here
      return {
        ...pkg,
        quantity: qty,
        subtotal: qty * pkg.price,
      };
    });

  const totalPrice = selectedPackages.reduce((sum, p) => sum + p.subtotal, 0);

  return (
    <div className="p-4 bg-clear rounded shadow-md max-w-md mx-auto h-[100vh] overflow-y-auto">
      {step === 1 && (
        <div className="flex items-center justify-center min-h-full bg-black/70 text-white p-4">
          <div className="bg-black/80 p-8 rounded-full shadow-md max-w-2xl w-full ">
            <div className="text-left">
              <h2 className="text-xl font-bold uppercase mb-1 text-center">
                Form Pemesanan
              </h2>
              <h2 className="text-xl font-bold uppercase mb-6 text-center">
                Oleh-Oleh MLF 2025
              </h2>

              <ul className="list-decimal list-inside space-y-3 mb-6 font-medium font-sans uppercase text-sm">
                <li>
                  Periode pemesanan berlangsung pada tanggal{" "}
                  <strong>18–21 Mei 2025</strong>.
                </li>
                <li>
                  Invoice akan dikirimkan setiap akhir hari melalui{" "}
                  <strong>Bill Reminder</strong> di aplikasi Livin'
                  masing-masing peserta.
                </li>
                <li>
                  Barang pesanan dapat diambil di lobi masing-masing hotel (
                  <strong>Hotel Padma</strong> atau{" "}
                  <strong>Hotel Gumaya</strong>) pada hari Jumat,{" "}
                  <strong>23 Mei 2025</strong>, mulai pukul 17.00 hingga 23.30,
                  yang terbagi menjadi 2 sesi:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>
                      <strong>Sesi 1:</strong> Setelah Outbound di Griya Persada
                    </li>
                    <li>
                      <strong>Sesi 2:</strong> Setelah Gala Dinner di Lawang
                      Sewu
                    </li>
                  </ul>
                </li>
                <li>
                  Harap menyiapkan <strong>bukti pembayaran</strong> (tangkapan
                  layar dari aplikasi Livin') saat pengambilan barang.
                </li>
              </ul>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-500 text-white py-3 px-6 rounded-xl font-semibold transition hover:opacity-90 mt-10"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="p-4 bg-black/70 rounded shadow-md max-w-md mx-auto scroll-auto">
          <h2 className="text-center text-2xl font-bold mb-6 text-white">
            PILIHAN OLEH OLEH
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col items-center space-y-2"
              >
                {/* Main Card with PIC and Price */}
                <div className="bg-black/70 p-3 rounded shadow flex flex-col items-center w-full">
                  <button
                    onClick={() =>
                      setFormData((fd) => ({
                        ...fd,
                        packages: {
                          ...fd.packages,
                          [pkg.id]: (fd.packages[pkg.id] || 0) + 1,
                        },
                      }))
                    }
                    className="w-full h-32 bg-gray-600 text-white flex items-center justify-center mb-2"
                  >
                    PIC
                  </button>

                  <div className="text-start w-full text-white">
                    <p className="font-semibold font-sans uppercase text-[14px] mb-1">
                      {pkg.label}
                    </p>
                    <hr className="bg-amber-500" />
                    <div
                      className="text-start text-[12px] font-sans uppercase"
                      dangerouslySetInnerHTML={{ __html: pkg.desc }}
                    />
                  </div>

                  <p className="font-bold mt-2 text-black">
                    IDR {pkg.price.toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Qty + Minus Side by Side */}
                <div className="flex w-full space-x-2 items-center justify-between">
                  <button
                    onClick={() =>
                      setFormData((fd) => {
                        const currentQty = fd.packages[pkg.id] || 0;
                        const newQty = Math.max(currentQty - 1, 0);
                        return {
                          ...fd,
                          packages: {
                            ...fd.packages,
                            [pkg.id]: newQty,
                          },
                        };
                      })
                    }
                    className="bg-yellow-300 text-black px-3 py-2 rounded-full shadow text-sm"
                  >
                    −
                  </button>
                  <div className="bg-black/70 border-amber-500 border-2 p-2 rounded shadow text-center text-sm font-semibold text-white">
                    QTY: {formData.packages[pkg.id] || 0}
                  </div>
                  <button
                    onClick={() =>
                      setFormData((fd) => {
                        const currentQty = fd.packages[pkg.id] || 0;
                        const newQty = Math.max(currentQty + 1, 0);
                        return {
                          ...fd,
                          packages: {
                            ...fd.packages,
                            [pkg.id]: newQty,
                          },
                        };
                      })
                    }
                    className="bg-yellow-300 text-black px-3 py-2 rounded-full shadow text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleBack}
              className="flex-1 border px-4 py-2 rounded text-black"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                !Object.values(formData.packages || {}).some((qty) => qty > 0)
              }
              className=" px-6 bg-amber-500 uppercase text-white py-2 rounded disabled:opacity-50"
            >
              next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="bg-black/80 rounded-2xl shadow-md text-white">
          <h2 className="text-xl font-bold mb-4 text-center">DATA PEMESANAN</h2>
          <div className="w-full max-w-xl mx-auto mt-4">
            <table className="w-full rounded-2xl text-left">
              <tbody>
                <tr className="">
                  <td className="px-4 py-2">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full border px-3 py-2 rounded placeholder:text-[11px]"
                      placeholder="Nama Lengkap"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="text"
                      className="w-full border px-3 py-2 rounded placeholder:text-[11px]"
                      placeholder="No Telepon yang terdaftar Livin"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      className="w-full border px-3 py-2 rounded placeholder:text-[11px]"
                      placeholder="Email Pribadi (not perusahaan) untuk invoice. "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 justify-center items-center p-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              RINGKASAN PESANAN
            </h2>
            <div className="w-full h-[50vh] overflow-y-auto mt-4">
              <table className="w-full border border-gray-300 rounded-2xl  text-sm text-start">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2">Paket</th>
                    <th className="text-left px-4 py-2">Qty</th>
                    <th className="text-left px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPackages.map((pkg) => (
                    <tr key={pkg.id} className="border-t">
                      <td className="px-4 py-2">{pkg.label}</td>
                      <td className="px-4 py-2">{pkg.quantity}</td>
                      <td className="px-4 py-2">
                        {pkg.subtotal.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t font-bold">
                    <td className="text-left px-4 py-2">Total</td>
                    <td className="text-right">Rp</td>
                    <td className="px-4 py-2">
                      {totalPrice.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex space-x-4 mt-6 p-4">
            <button
              onClick={handleBack}
              className="flex-1 border px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              disabled={!isFormValid}
              onClick={handleSubmit}
              className="px-6 bg-amber-500 uppercase text-white py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="flex items-center justify-center min-h-full bg-black/70 text-white p-4">
          <div className="bg-black/80 p-8 rounded-full shadow-md max-w-2xl w-full ">
            <div className="text-left">
              <h2 className="text-xl font-bold uppercase mb-1 text-center">
                Form Pemesanan
              </h2>
              <h2 className="text-xl font-bold uppercase mb-6 text-center">
                Oleh-Oleh MLF 2025
              </h2>

              <ul className="list-decimal list-inside space-y-3 mb-6 font-medium font-sans uppercase text-sm">
                <li>Buka aplikasi Livin', lalu masuk ke menu "Bayar".</li>
                <li>
                  Setelah masuk menu "Bayar", layar akan menampilkan "tagihan
                  dari MLF 2025" pada daftar Bill.
                </li>
                <li>
                  Lakukan pembayaran dengan memilih tagihan tersebut, lalu
                  konfirmasi hingga pembayaran berhasil.
                </li>
              </ul>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-500 text-white py-3 px-6 rounded-xl font-semibold transition hover:opacity-90 mt-10"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 5 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={kvImage} alt="KV Logo" className="-mt-20" />
          <div className="text-center p-6 ">
            <h2 className="text-2xl font-bold">
              TERIMA KASIH ATAS PESANAN ANDA.
            </h2>
            <h2 className="text-2xl font-bold">
              MOHON SELESAIKAN PEMBAYARAN PADA AKUN LIVIN ANDA.
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
