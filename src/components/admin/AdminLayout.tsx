import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-full bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg border-r">
                <AdminSidebar />
            </aside>

            {/* Topbar + Page Content */}
            <main className="flex-1 flex flex-col">
                <AdminTopbar />

                {/* Page content */}
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </main>

        </div>
    );
};

export default AdminLayout;