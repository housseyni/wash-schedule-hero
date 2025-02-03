import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

type FormuleType = {
  id: string;
  title: string;
  duration: number;
  price: number;
};

const formules: FormuleType[] = [
  { id: "1", title: "Lavage Simple", duration: 30, price: 30 },
  { id: "2", title: "Lavage Complet", duration: 60, price: 50 },
  { id: "3", title: "Lavage Premium", duration: 90, price: 80 },
];

const availableSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
];

const Reservation = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFormule, setSelectedFormule] = useState<FormuleType | null>(null);
  const [guestMode, setGuestMode] = useState(false);

  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: "",
      formule: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // TODO: Implement Supabase reservation creation
      console.log("Reservation submitted:", data);
      
      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été enregistrée avec succès",
      });
      
      form.reset();
    } catch (error) {
      console.error("Reservation error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la réservation",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="reservation" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">
          Réservation
        </h2>
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="formule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formule</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedFormule(formules.find(f => f.id === value) || null);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une formule" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formules.map((formule) => (
                          <SelectItem key={formule.id} value={formule.id}>
                            {formule.title} - {formule.price}€
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={fr}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horaire</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un horaire" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!guestMode && (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setGuestMode(true)}
                >
                  Réserver sans compte
                </Button>
              )}

              {guestMode && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button type="submit" className="w-full">
                Réserver
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;