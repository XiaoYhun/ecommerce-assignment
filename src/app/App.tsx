import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <div className="">
      <Header />
      <div className="max-w-[1200px] mx-auto py-10 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
