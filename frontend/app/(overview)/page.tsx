import Navbar from "../ui/navbar";
import Home from "../ui/home";

export default function Page() {
  return (
    <main className="bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <Home />
      </div>
    </main>
  );
}
