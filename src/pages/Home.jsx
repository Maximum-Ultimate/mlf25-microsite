import { useState } from "react";
import teaserVideo from "/assets/teaser.mp4";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full overflow-x-hidden scroll-smooth">
      <section className="h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-800">
        <h1 className="text-3xl font-bold mb-4">You are invited to</h1>
        <img src="/kv-logo.png" alt="KV Logo" className="w-32 h-32 mb-6" />

        <h3 className="text-xl mb-2">MLF 2025</h3>
        <p className="text-lg mb-2">21–24 May 2025</p>
        <p className="text-lg">Semarang, Jawa Tengah</p>
      </section>
        {/* Teaser Video Section */}
      <section className="h-screen flex items-center justify-center bg-black text-white p-4">
        <div className="w-full max-w-3xl">
          <video
            controls
            autoPlay
            muted
            loop
            className="w-full rounded-xl shadow-xl"
          >
            <source src={teaserVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <p className="text-center mt-4 text-lg">Watch the teaser</p> */}
        </div>
      </section>
      {/* Chat Section */}
      <section className="h-screen flex flex-col items-center justify-center bg-gray-800 p-4 text-center gap-6">
        <h2 className="text-2xl font-bold ">Leave a Message</h2>
        <div className="flex items-center space-x-2 border border-gray-300w-full max-w-lg rounded-lg p-4 gap-2 h-1/2">
          <div className="flex self-start cursor-pointer gap-1">
          <img
                src="https://img.icons8.com/stamp/96/user.png"
                alt=""
                className="h-8 w-8 object-fill rounded-full bg-amber-50"
              />
             <div className="block">
                <div className="bg-gray-900 w-auto rounded-xl px-2 pb-2">
                  <div className="font-medium text-gray-700 px-2 flex items-center justify-start space-x-1">
                    <a href="#" className="hover:underline text-sm ">
                      <small>Mandiri Leaders</small>
                    </a>
                  </div>
                  <div className="text-xs">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Expedita, maiores!
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="flex flex-wrap  space-x-2 w-full max-w-lg justify-end gap-3">
          <textarea
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg -mr-[1px]"
            rows="2"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition ">
            Post
          </button>
        </div>
      </section>
      {/* Section 2  */}
      <section className="h-screen flex flex-col items-center justify-center bg-black p-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Explore More</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/day1"
            className="bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-500 transition"
          >
            Day 1
          </a>
          <a
            href="/day2"
            className="bg-yellow-500 text-white px-4 py-3 rounded-xl hover:bg-yellow-500 transition"
          >
            Day 2
          </a>
          <a
            href="/day3"
            className="bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-500 transition"
          >
            Day 3
          </a>
          <a
            href="/day4"
            className="bg-purple-500 text-white px-4 py-3 rounded-xl hover:bg-purple-500 transition"
          >
            Day 4
          </a>
        </div>
        <div className="flex flex-col gap-4 justify-center mt-2">
          {[
            { href: "/galery-link", label: "Gallery" },
            { href: "/event-guidebook", label: "Event Guide Book" },
            { href: "/hotelinfo", label: "Hotel & Flight Info" },
            { href: "/Order", label: "Pesan Oleh Oleh" },
            { href: "/faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="bg-gray-900 text-red px-6 py-3 rounded-xl text-center"
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
