import { useEffect, useRef, useState } from "react";
import teaserVideo from "/assets/teaser.mp4";
import kvImage from "/assets/img/kv.webp";
import useWebSocket from "../hooks/useWebSocket";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(); // 👈 ref to scroll target

  const { send } = useWebSocket((data) => {
    if (data.action === "allMessages" && data.status === 200) {
      setMessages(data.data);
    }
    if (data.action === "newMessage" && data.status === 200) {
      setMessages((prev) => [...prev, data.data]);
    }
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    console.log("Current messages:", messages);
  }, [messages]);
  useEffect(() => {
    console.log("Sending getMessages...");
    send({ action: "getMessages" });
  }, []);
  const handlePost = () => {
    if (message.trim()) {
      send({ action: "setMessage", message: message.trim() });
      setMessage("");
    }
  };
  return (
    <div className="w-full overflow-x-hidden scroll-smooth">
      {/* Header Section */}
      <section className="bg-clear h-screen flex flex-col justify-between items-center text-center p-4">
        <h1 className="text-2xl font-conthrax mt-46">
          YOU ARE INVITED <br></br> TO
        </h1>
        <img src={kvImage} alt="KV Logo" className="-mt-20" />
        <div className="mb-20">
          <p className="text-lg ">21–24 MAY 2025</p>
          <p className="text-lg">Semarang, Jawa Tengah</p>
        </div>
      </section>
      {/* Teaser Video Section */}
      <section className="h-screen flex items-center justify-center bg-clear text-white p-4">
        <div className="w-full max-w-3xl">
          <video
            controls
            autoPlay
            muted
            loop
            className="w-full rounded-xl shadow-xl border-amber-500 border-2 "
          >
            <source src={teaserVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <p className="text-center mt-4 text-lg">Watch the teaser</p> */}
        </div>
      </section>
      {/* Chat Section */}
      <section className="h-screen flex flex-col items-center justify-center bg-clear p-4 text-center gap-6">
        <h2 className="text-2xl font-bold">Chat</h2>
        {/* Messages List */}
        <div className="flex flex-col space-y-4 w-full max-w-lg h-1/2 overflow-y-auto border-amber-500 border-2 rounded-lg p-4">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-2">
              <img
                src="https://img.icons8.com/stamp/96/user.png"
                alt=""
                className="h-8 w-8 object-fill rounded-full bg-amber-50"
              />
              <div className="bg-black/5 w-full text-start p-4 rounded-xl text-xs text-white">
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* 👈 scroll target */}
        </div>
        {/* Message Input */}
        <div className="flex flex-wrap space-x-2 w-full max-w-lg justify-center gap-3">
          <textarea
            className="w-full max-w-lg p-3 border border-amber-400 rounded-lg"
            rows="2"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handlePost}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg transition"
          >
            Post
          </button>
        </div>
      </section>
      {/* Section 4  */}
      <section className="h-screen flex flex-col items-center justify-center bg-clear p-4 text-center gap-4">
        {/* <h2 className="text-2xl font-bold mb-6">Explore More</h2> */}
        <div className="flex flex-wrap gap-3 justify-center">
        <a
            href="/day1"
            className="flex justify-center items-center text-white w-20 h-20 bg-black border border-amber-600 rounded-xl transition"
            >
            <span className="text-center text-xl">DAY 1</span>
            </a>
          <a
            href="/day2"
            className="flex justify-center items-center text-white w-20 h-20 bg-black border border-amber-600 rounded-xl transition"
            >
            <span className="text-center text-xl">DAY 2</span>
          </a>
          <a
            href="/day3"
            className="flex justify-center items-center text-white w-20 h-20 bg-black border border-amber-600 rounded-xl transition"
            >
            <span className="text-center text-xl">DAY 3</span>
          </a>
          <a
            href="/day4"
            className="flex justify-center items-center text-white w-20 h-20 bg-black border border-amber-600 rounded-xl transition"
            >
            <span className="text-center text-xl">DAY 4</span>
          </a>
        </div>
        <div className="flex flex-col gap-2 justify-center mt-2 w-full text-xl uppercase">
          {[
            {
              href: "https://drive.google.com/drive/folders/10muDVP6ztVBv8XeG62llDcB4bf-ZxQTU?usp=share_link",
              label: "Gallery",
              external: true,
            },
            {
              href: "/docs/BOOKLET MLF25.pdf",
              label: "Event Guide Book",
              external: true,
            },
            {
              href: "/docs/hotelinfo.pdf",
              label: "Hotel & Flight Info",
              external: true,
            },
            { href: "/Order", label: "Pesan Oleh Oleh" },
            { href: "/docs/faq-2-2025.pdf", label: "FAQ", external: true },
          ].map(({ href, label, external }) => (
            <a
              key={href}
              href={href}
              target={external ? "_blank" : "_self"}
              rel={external ? "noopener noreferrer" : undefined}
              className="bg-black border border-amber-600 text-red px-6 py-3 rounded-xl text-center w-full"
            >
              {label}
            </a>
          ))}
        </div>
        
      </section>
    </div>
  );
}
