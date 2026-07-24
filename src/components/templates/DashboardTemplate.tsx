import React from "react";
import { Navbar } from "../organisms/Navbar";
import { UserProfile } from "@/schemas/user.schema";

interface DashboardTemplateProps {
  user?: UserProfile;
  children: React.ReactNode;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  user,
  children,
}) => {
  return (
    <div className="font-body-lg text-on-surface bg-[#090D16] min-h-screen">
      <Navbar avatarUrl={user?.avatarUrl} />
      <main className="max-w-[1280px] mx-auto px-6 md:px-8 py-10 space-y-8">
        {children}
      </main>
    </div>
  );
};
