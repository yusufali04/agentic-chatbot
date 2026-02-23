import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <main className="bg-neutral-900 p-4 w-full h-screen">
            <Outlet />
        </main>
    );
};

export default RootLayout;