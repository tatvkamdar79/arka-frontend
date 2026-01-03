"use client";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();
  return (
    <AuthGuard>
      <div className="w-screen h-screen flex">
        <div
          className={`h-screen ${
            isExpanded ? "w-65" : "w-20"
          } transition-all ease-in-out`}
        >
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
        <div className="w-[calc(100%-260px)] flex-1 flex flex-col">
          <div className="w-full h-20 bg-white border-b border-gray-200 flex justify-end place-items-center px-8">
            <BiLogOut
              size={30}
              className="text-gray-700 cursor-pointer"
              onClick={() => {
                document.cookie = "";
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("user");
                router.push("/login");
              }}
            />
          </div>
          <div className="w-full flex-1 bg-gray-50 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
