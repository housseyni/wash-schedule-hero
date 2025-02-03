import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-400 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg')",
        }}
      />
      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
          CarWash Pro
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Le meilleur service de lavage auto professionnel pour votre véhicule
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="default"
            className="bg-white text-primary-600 hover:bg-gray-100"
            asChild
          >
            <a href="#reservation">Réserver maintenant</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white" asChild>
            <a href="#formules">Voir nos formules</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;