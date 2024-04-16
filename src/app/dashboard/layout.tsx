import SideNavbar from "@/lib/components/SideNavbar";
import AuthContext from "./AuthContext";

export interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="w-full h-full">
      <AuthContext>
        <main className="w-full h-full">{children}</main>
      </AuthContext>
    </div>
  );
}
