import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import RecentAquisitions from "@/pages/RecentAquisitions";
import FineArt from "@/pages/FineArt";
import Antiques from "@/pages/Antiques";
import Collectables from "@/pages/Collectables";
import Jewelry from "@/pages/Jewelry";
import Literature from "@/pages/Literature";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col bg-stone-50 text-stone-800">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recent-aquisitions" element={<RecentAquisitions />} />
            <Route path="/fine-art" element={<FineArt />} />
            <Route path="/antiques" element={<Antiques />} />
            <Route path="/collectables" element={<Collectables />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/literature" element={<Literature />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
