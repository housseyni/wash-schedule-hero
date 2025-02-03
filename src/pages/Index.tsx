import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Formules from "@/components/Formules";
import Reservation from "@/components/Reservation";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Formules />
      <Reservation />
      <Contact />
    </div>
  );
};

export default Index;
