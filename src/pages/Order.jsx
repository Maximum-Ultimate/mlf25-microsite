import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxT9S74YtpGdGeA_jxqrvEctQ4yKopZdxPxOfs0gLDIe66BtAMFEni04D4f8TuHHRDS/exec";
const packages = [
  {
    id: 1,
    label: "Paket 1",
    desc: "Bandeng Presto<br/>Tahu Bakso",
    price: 50000,
  },
  {
    id: 2,
    label: "Paket 2",
    desc: "Bandeng Presto",
    price: 45000,
  },
];

export default function Order() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    packages: {},
    name: "",
    accountNumber: "",
  });
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
          accountNumber: formData.accountNumber,
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
    <div className="w-screen h-screen flex items-center justify-center text-center">
      {step === 1 && (
        <div className="p-4 bg-gray-100 rounded shadow-md max-w-md mx-auto">
          <h2 className="text-center text-2xl font-bold mb-6 text-black">
            PILIHAN
            <br />
            OLEH OLEH
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col items-center space-y-2"
              >
                {/* Main Card with PIC and Price */}
                <div className="bg-white p-3 rounded shadow flex flex-col items-center w-full">
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

                  <div className="text-center text-sm text-black">
                    <p className="font-semibold">{pkg.label}</p>
                    <div dangerouslySetInnerHTML={{ __html: pkg.desc }} />
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
                    className="bg-red-500 text-white px-3 py-2 rounded shadow text-sm"
                  >
                    −
                  </button>
                  <div className="bg-white p-2 rounded shadow w-full text-center text-sm font-semibold text-black">
                    qty: {formData.packages[pkg.id] || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={
              !Object.values(formData.packages || {}).some((qty) => qty > 0)
            }
            className="w-full bg-gray-700 text-white py-2 rounded disabled:opacity-50"
          >
            next
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">DATA PEMESANAN</h2>
          <div className="w-full max-w-xl mx-auto mt-4">
            <table className="w-full rounded-2xl text-left">
              <tbody>
                <tr className="">
                  <th className="px-4 py-2 w-1/4">Nama</th>
                  <td className="px-4 py-2">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="px-4 py-2">Livin</th>
                  <td className="px-4 py-2">
                    <input
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      type="text"
                      className="w-full border px-3 py-2 rounded"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-4">
            <h2 className="text-xl font-bold mb-4">DATA PEMESANAN</h2>
            <div className="w-full h-[50vh] overflow-y-auto mt-4">
              <table className="w-full border border-gray-300 rounded-2xl text-center">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2">Paket</th>
                    <th className="text-left px-4 py-2">Harga</th>
                    <th className="text-left px-4 py-2">Qty</th>
                    <th className="text-left px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPackages.map((pkg) => (
                    <tr key={pkg.id} className="border-t">
                      <td className="px-4 py-2">{pkg.label}</td>
                      <td className="px-4 py-2">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-2">{pkg.quantity}</td>
                      <td className="px-4 py-2">
                        Rp {pkg.subtotal.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t font-bold">
                    <td colSpan="3" className="text-right px-4 py-2">
                      Total
                    </td>
                    <td className="px-4 py-2">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleBack}
              className="flex-1 border px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.accountNumber || submitting}
              className="flex-1 bg-green-600 text-black px-4 py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit Order"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center p-6 space-y-10">
          <h2 className="text-2xl font-bold ">TERIMA KASIH ATAS PESANAN ANDA.</h2>
          <h2 className="text-2xl font-bold ">MOHON SELESAIKAN PEMBAYARAN PADA AKUN LIVIN ANDA.</h2>

        </div>
      )}
    </div>
  );
}
