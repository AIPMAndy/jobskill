import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, Search, BarChart3 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">JobSkill</h1>
            <p className="text-sm text-gray-500 mt-1">AI Job Search</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <NavLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />}>
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/applications" icon={<Briefcase className="w-5 h-5" />}>
              Applications
            </NavLink>
            <NavLink href="/dashboard/resumes" icon={<FileText className="w-5 h-5" />}>
              Resumes
            </NavLink>
            <NavLink href="/dashboard/scanner" icon={<Search className="w-5 h-5" />}>
              Job Scanner
            </NavLink>
            <NavLink href="/dashboard/analytics" icon={<BarChart3 className="w-5 h-5" />}>
              Analytics
            </NavLink>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}
