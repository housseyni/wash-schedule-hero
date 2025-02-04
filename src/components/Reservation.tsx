import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

type FormuleType = {
  id: string;
  title: string;
  duration: number;
  price: number;
};

const formules: FormuleType[] = [
  { id: "1", title: "Formule express", duration: 50, price: 30 },
  { id: "2", title: "Formule Médium", duration: 90, price: 50 },
  { id: "3", title: "Formule Intégrale", duration: 240, price: 80 },
];

const availableSlots = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const Reservation = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFormule, setSelectedFormule] = useState<FormuleType | null>(
    null
  );
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
      const { name, email, phone, time, formule } = data;

      // Vérifier si une formule est sélectionnée
      if (!selectedFormule) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une formule.",
          variant: "destructive",
        });
        return;
      }

      // Vérifier si une date est bien sélectionnée
      if (!date) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une date.",
          variant: "destructive",
        });
        return;
      }

      // Calcul des horaires
      const startTime = new Date(`${format(date, "yyyy-MM-dd")}T${time}:00`);
      const endTime = new Date(
        startTime.getTime() + selectedFormule.duration * 60000
      );

      console.log("Start Time (ISO): ", startTime.toISOString());
      console.log("End Time (ISO): ", endTime.toISOString());

      // Créer une nouvelle réservation dans Supabase
      const { error } = await supabase.from("reservations").insert([
        {
          guest_name: name,
          guest_email: email,
          guest_phone: phone,
          start_time: startTime.toISOString(), // Assure-toi que le format est bien ISO
          end_time: endTime.toISOString(),
          formule_title: selectedFormule.title,
          formule_price: selectedFormule.price,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été enregistrée avec succès",
      });

      form.reset(); // Réinitialiser le formulaire après la soumission
    } catch (error) {
      console.error("Reservation error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la réservation.",
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
                        setSelectedFormule(
                          formules.find((f) => f.id === value) || null
                        );
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
                        onSelect={(selectedDate) => {
                          setDate(selectedDate); // Mettre à jour la date ici
                        }}
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
