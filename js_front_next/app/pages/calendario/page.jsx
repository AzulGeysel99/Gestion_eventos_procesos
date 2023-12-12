import EventCalendar from '../../../components/calendario';


const calendario = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    allDay: false,
    id: 0,
  });

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() });
    setShowModal(true);
  };

  const addEvent = (data) => {
    const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() };
    setAllEvents([...allEvents, event]);
  };

  const handleDeleteModal = (data) => {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  };

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0,
    });
  };

  return (
    <Layout>
      <EventCalendar
        allEvents={allEvents}
        setAllEvents={setAllEvents}
        handleDateClick={handleDateClick}
        addEvent={addEvent}
        handleDeleteModal={handleDeleteModal}
      />
      <EventForm
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        setShowModal={setShowModal}
        allEvents={allEvents}
        setAllEvents={setAllEvents}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
      />
    </Layout>
  );
};

export default calendario;