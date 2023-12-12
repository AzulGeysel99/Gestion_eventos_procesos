import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const EventCalendar = ({ allEvents, setAllEvents, handleDateClick, addEvent, handleDeleteModal }) => {
  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title');
          let id = eventEl.getAttribute('data');
          let start = eventEl.getAttribute('start');
          return { title, id, start };
        },
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
          }}
          events={allEvents}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          drop={(data) => addEvent(data)}
          eventClick={(data) => handleDeleteModal(data)}
        />
      </div>
      <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
        <h1 className="font-bold text-lg text-center">Drag Event</h1>
        {/* Resto de tu código relacionado con la lista de eventos */}
      </div>
    </div>
  );
};

export default EventCalendar;