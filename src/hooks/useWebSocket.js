import { useEffect, useRef } from 'react';

export default function useWebSocket(onMessage) {
  const ws = useRef(null);
  const queue = useRef([]);

  useEffect(() => {
    ws.current = new WebSocket('wss://cloud-mlf25.abracodebra.com');
    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      queue.current.forEach(msg => ws.current.send(msg));
      queue.current = [];
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [onMessage]);

  const send = (data) => {
    const message = JSON.stringify(data);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.warn('WebSocket not open. Queuing message...');
      queue.current.push(message);
    }
  };

  return { send };
}