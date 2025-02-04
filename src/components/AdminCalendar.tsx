import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import frLocale from "@fullcalendar/core/locales/fr";
import { supabase } from "@/lib/supabase";
import { Reservation } from "@/lib/supabase";

const AdminCalendar = () => {
  const [events, setEvents] = useState<Reservation[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) throw error;

      setEvents(data || []);
    } catch (error: any) {
      console.error("Error fetching reservations:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      });
    }
  };

  const handleEventClick = (info: any) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteReservation = async () => {
    if (!selectedEvent) return;
    try {
      const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", selectedEvent.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Réservation supprimée avec succès",
      });
      setIsDialogOpen(false);
      await fetchReservations();
    } catch (error: any) {
      console.error("Error deleting reservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réservation",
        variant: "destructive",
      });
    }
  };

  const formatEvents = (reservations: Reservation[]) => {
    return reservations.map((reservation) => ({
      id: reservation.id,
      title: reservation.guest_name || "Réservation",
      start: reservation.start_time,
      end: reservation.end_time,
      extendedProps: {
        ...reservation,
      },
    }));
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={frLocale}
        events={formatEvents(events)}
        eventClick={handleEventClick}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <p>
                <strong>Client:</strong>{" "}
                {selectedEvent.guest_name || "Non renseigné"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedEvent.guest_email || "Non renseigné"}
              </p>
              <p>
                <strong>Téléphone:</strong>{" "}
                {selectedEvent.guest_phone || "Non renseigné"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedEvent.start_time).toLocaleString("fr-FR")}
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="destructive" onClick={handleDeleteReservation}>
                  Supprimer
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Fermer</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCalendar;
