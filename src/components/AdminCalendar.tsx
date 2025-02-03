import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import frLocale from '@fullcalendar/core/locales/fr';

interface Reservation {
  id: string;
  title: string;
  start: string;
  end: string;
  customerName: string;
  email?: string;
}

const AdminCalendar = () => {
  const [events, setEvents] = useState<Reservation[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      // TODO: Implement Supabase fetch
      const mockData = [
        {
          id: '1',
          title: 'Lavage complet',
          start: '2024-02-03T10:00:00',
          end: '2024-02-03T11:00:00',
          customerName: 'John Doe',
          email: 'john@example.com'
        }
      ];
      setEvents(mockData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les réservations',
        variant: 'destructive'
      });
    }
  };

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteReservation = async () => {
    if (!selectedEvent) return;
    try {
      // TODO: Implement Supabase delete
      toast({
        title: 'Succès',
        description: 'Réservation supprimée avec succès'
      });
      setIsDialogOpen(false);
      await fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la réservation',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale={frLocale}
        events={events}
        eventClick={handleEventClick}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de la réservation</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <p><strong>Client:</strong> {selectedEvent.customerName}</p>
              <p><strong>Email:</strong> {selectedEvent.email || 'Non renseigné'}</p>
              <p><strong>Date:</strong> {new Date(selectedEvent.start).toLocaleString('fr-FR')}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="destructive" onClick={handleDeleteReservation}>
                  Supprimer
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCalendar;