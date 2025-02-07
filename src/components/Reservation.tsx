import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importer le style du calendrier
import { FaCalendarAlt } from "react-icons/fa"; // Icône du calendrier
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
  const [calendarOpen, setCalendarOpen] = useState(false);

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
      const { date, time, formule } = data;
  
      if (!selectedFormule) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une formule.",
          variant: "destructive",
        });
        return;
      }
  
      // Vérifier si l'utilisateur est connecté
      let name = data.name;
      let email = data.email;
      let phone = data.phone;
  
      if (!guestMode) {
        // Vérification de l'utilisateur connecté
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          throw new Error("Erreur d'authentification.");
        }
  
        const user = userData.user;
  
        // Récupérer le profil de l'utilisateur
        const { data: userProfile, error: profileError } = await supabase
          .from("user_profiles")
          .select("name, phone")
          .eq("user_id", user.id)
          .single();
  
        if (profileError) {
          console.error("Erreur lors de la récupération du profil:", profileError.message);
          throw new Error("Erreur lors de la récupération du profil utilisateur.");
        }
  
        // Utiliser les informations de profil si elles existent
        name = userProfile?.name || name;
        phone = userProfile?.phone || phone;
        email = user.email || email; // Email récupéré de Supabase
      }
  
      // Construction de l'heure de début et de fin
      const startTime = new Date(
        `${format(new Date(date), "yyyy-MM-dd")}T${time}:00`
      );
      const endTime = new Date(
        startTime.getTime() + selectedFormule.duration * 60000
      );
  
      console.log("Start Time (ISO): ", startTime.toISOString());
      console.log("End Time (ISO): ", endTime.toISOString());
  
      // Insérer la réservation dans la base de données
      const { error } = await supabase.from("reservations").insert([
        {
          guest_name: name,
          guest_email: email,
          guest_phone: phone,
          start_time: startTime.toISOString(),
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
  
      form.reset();
    } catch (error: any) {
      console.error("Reservation error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer la réservation.",
        variant: "destructive",
      });
    }
  };
  
  
  

  return (
    <section id="reservation" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center text-blue-700 mb-12">
          Réservation
        </h2>
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Formule Select */}
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

              {/* Date Picker avec icône à l'intérieur de l'input */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sélectionner une date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DatePicker
                          selected={date}
                          onChange={(date: Date) => setDate(date)}
                          locale={fr}
                          dateFormat="dd/MM/yyyy"
                          className="w-full pl-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                          minDate={new Date()}
                          open={calendarOpen}
                          onClickOutside={() => setCalendarOpen(false)}
                        />
                        {/* Icône de calendrier intégrée à l'intérieur de l'input */}
                        <button
                          type="button"
                          onClick={() => setCalendarOpen(!calendarOpen)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <FaCalendarAlt className="text-blue-600" />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Select */}
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

              {/* Guest Mode Button */}
              {!guestMode && (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setGuestMode(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Réserver sans compte
                </Button>
              )}

              {/* User Details Form */}
              {guestMode && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                          />
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
                          <Input
                            type="email"
                            {...field}
                            required
                            className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                          />
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
                          <Input
                            type="tel"
                            {...field}
                            required
                            className="border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
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
