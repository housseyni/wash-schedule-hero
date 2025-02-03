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

type FormuleType = {
  title: string;
  duration: string;
  price: string;
};

const Reservation = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFormule, setSelectedFormule] = useState<FormuleType | null>(null);

  const form = useForm({
    defaultValues: {
      date: new Date(),
      time: "",
      formule: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    // TODO: Implement reservation submission to Supabase
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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