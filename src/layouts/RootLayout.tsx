import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <main className="bg-neutral-900 flex items-center justify-center p-4 border border-white-2 w-full h-screen">
            <Outlet />
        </main>
    );
};

export default RootLayout;