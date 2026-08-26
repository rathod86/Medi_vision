import "./DashboardCalendar.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DashboardCalendar = () => {

  const events = [
    {
      title: "Appointment - Rahul Kumar",
      start: new Date(2026, 5, 30, 10, 0),
      end: new Date(2026, 5, 30, 11, 0),
    },
    {
      title: "Patient Admission",
      start: new Date(2026, 5, 30, 12, 0),
      end: new Date(2026, 5, 30, 1, 0),
    },
    {
      title: "Surgery",
      start: new Date(2026, 5, 30, 3, 0),
      end: new Date(2026, 5, 30, 4, 0),
    },
  ];

  return (
    <div className="dashboard-calendar">

      <h3>Hospital Calendar</h3>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 550 }}
      />

    </div>
  );
};

export default DashboardCalendar;