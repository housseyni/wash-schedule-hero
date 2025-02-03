import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Check } from "lucide-react";

const formules = [
  {
    title: "Formule Basique",
    price: "29.99€",
    duration: "30 min",
    features: [
      "Lavage extérieur",
      "Séchage",
      "Nettoyage des jantes",
      "Aspiration simple",
    ],
  },
  {
    title: "Formule Medium",
    price: "49.99€",
    duration: "45 min",
    features: [
      "Tout de la formule basique",
      "Nettoyage des vitres",
      "Traitement des plastiques",
      "Aspiration complète",
    ],
  },
  {
    title: "Formule Complète",
    price: "79.99€",
    duration: "1h",
    features: [
      "Tout de la formule medium",
      "Lustrage",
      "Nettoyage des sièges",
      "Protection céramique",
    ],
  },
];

const Formules = () => {
  return (
    <section id="formules" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">
          Nos Formules
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {formules.map((formule) => (
            <Card key={formule.title} className="relative hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{formule.title}</CardTitle>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <Clock size={20} />
                  <span>{formule.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary-600 mb-6">
                  {formule.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {formule.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check size={20} className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
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