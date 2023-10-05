"use client";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { socket } from "@/lib/socket";
import { MousePointer2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Clien connected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("mouse-moved-server", (position) => {
      console.log("Mouse moved on server", position);
      setMousePosition(position);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const position = useMousePosition();

  useEffect(() => {
    // console.log("Mouse moved", position);
    socket.emit("mouse-moved", position);
  }, [position]);
  return (
    <>
      <MousePointer2
        style={{
          position: "absolute",
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      {children}
    </>
  );
};

export default SocketProvider;

const Pointer = () => {
  return <MousePointer2 />;
};
