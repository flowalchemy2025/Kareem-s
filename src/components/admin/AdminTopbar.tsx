const AdminTopbar = () => {
    return (
        <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 border-b">
            <h1 className="text-xl font-semibold">Kareem's Admin</h1>

            <div className="flex items-center gap-3 text-gray-600">
                <span>Welcome, Admin</span>
            </div>
        </header>
    );
};

export default AdminTopbar;
