import { useEffect, useRef } from 'react';

function MessageBox({ messages }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-4 w-full max-w-lg h-1/2 overflow-y-auto border-amber-400 border-2 rounded-lg p-4"
    >
      {messages.map((msg, i) => (
        <div key={i} className="flex items-start gap-2">
          <img
            src="https://img.icons8.com/stamp/96/user.png"
            alt=""
            className="h-8 w-8 object-fill rounded-full bg-amber-50"
          />
          <div className="bg-gray-900 w-auto rounded-xl px-2 pb-2 text-xs text-white">
            <small className="block text-gray-300 px-2">Mandiri Leaders</small>
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageBox;