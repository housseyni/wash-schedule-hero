import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Check } from "lucide-react";

const formules = [
  {
    title: "Formule Express",
    price: "30€",
    duration: "30 min",
    features: ["Aspirateur", "Plastique", "Vitre"],
  },
  {
    title: "Formule Medium",
    price: "50€",
    duration: "45 min",
    features: [
      "Aspirateur",
      "Plastique",
      "Shampouineuse",
      "Pressing siège",
      "Pressing tapis",
    ],
  },
  {
    title: "Formule Prenium",
    price: "79.99€",
    duration: "4h",
    features: [
      "Aspirateur",
      "Plastique",
      "Vitre",
      "Shampouineuse",
      "Pressing moquette",
      "Pressing siège",
      "Pressing tapis",
      "Lustrage",
      "Nettoyage des sièges",
      "Protection céramique",
      "Démontage siège",
    ],
  },
];

const Formules = () => {
  return (
    <section id="formules" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center text-blue-700 mb-12">
          Nos Formules de Lavage
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formules.map((formule) => (
            <Card
              key={formule.title}
              className="relative hover:shadow-lg transition-shadow transform hover:scale-105 duration-300"
            >
              <CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg">
                <CardTitle className="text-2xl font-heading">
                  {formule.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-200 mt-2">
                  <Clock size={20} />
                  <span>{formule.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="text-3xl font-bold text-primary-600 mb-6">
                  {formule.price}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Première colonne avec jusqu'à 6 fonctionnalités */}
                  <div className="space-y-3">
                    {formule.features.slice(0, 6).map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Check size={20} className="text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Seconde colonne avec les fonctionnalités restantes */}
                  {formule.features.length > 6 && (
                    <div className="space-y-3">
                      {formule.features.slice(6).map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <Check size={20} className="text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                  asChild
                >
                  <a href="#reservation">Réserver</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formules;
