"use client";

import { useEffect, useState } from "react";
import { format, subDays, startOfWeek, addDays, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const tasksData = [
  {
    date: new Date(2023, 9, 24), // October 24, 2023
    client: "Arille",
    task: "Development",
    notes: "Developed Online Store",
    hoursSpent: "0:00",
  },
  {
    date: new Date(2023, 9, 25), // October 25, 2023
    client: "Arille",
    task: "Bug Fixing",
    notes: "Fixed checkout issue",
    hoursSpent: "9:59",
  },
  {
    date: new Date(2023, 9, 25), // October 25, 2023
    client: "Arille",
    task: "Bug Fixing",
    notes: "Fixed checkout issue",
    hoursSpent: "12:59",
  },
  {
    date: new Date(2023, 10, 25), // December 25, 2023
    client: "Arille",
    task: "Bug Fixing",
    notes: "Fixed checkout issue",
    hoursSpent: "12:59",
  },
  // ... add more tasks as needed
];

const TimerDay = ({ showDetailsHandle = () => {} }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [activeTimerTask, setActiveTimerTask] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (activeTimerTask !== null) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1 / 60); // Update every minute
      }, 60000); // Interval of 1 minute
      console.log(timer);
    }

    return () => clearInterval(timer);
  }, [activeTimerTask]);

  const changeDayHandle = (btnType) => {
    let newDate;
    if (btnType === "prev") {
      newDate = subDays(currentMonth, 1);
    }
    if (btnType === "next") {
      newDate = addDays(currentMonth, 1);
    }
    setCurrentMonth(newDate);
    setSelectedDate(newDate);
  };

  const onDateClickHandle = (day, dayStr) => {
    console.log("Clicked day:", day);
    console.log("Formatted day string:", dayStr);
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "EEE, d MMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-center">
          <span>{format(selectedDate, dateFormat)}</span>
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      days.push(
        <div
          className="col col-center"
          key={i}
          onClick={() => {
            const dayStr = format(day, "ccc dd MMM yy");
            onDateClickHandle(day, dayStr);
          }}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderFooter = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div
            className="icon border-t-neutral-400 bg-slate-300 p-2"
            onClick={() => changeDayHandle("prev")}
          >
            prev day
          </div>
        </div>
        <div>{format(currentMonth, "EEE, d MMM yyyy")}</div>
        <div
          className="icon border-t-neutral-400 bg-slate-300 p-2"
          onClick={() => changeDayHandle("next")}
        >
          prev next
        </div>
      </div>
    );
  };

  const formatTime = (timeInHours) => {
    const totalMinutes = timeInHours * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours + minutes / 60;
  };

  const toggleTimer = (index) => {
    if (activeTimerTask === index) {
      // Stop the timer and update the task's hoursSpent
      tasksData[index].hoursSpent += elapsedTime;
      setElapsedTime(0);
      setActiveTimerTask(null);
      console.log("stop", elapsedTime);
    } else {
      setActiveTimerTask(index);
    }
  };

  const renderTasksForSelectedDate = () => {
    const tasksForTheDay = tasksData.filter((task) =>
      isSameDay(task.date, selectedDate)
    );

    return tasksForTheDay.map((task, index) => (
      <div key={index}>
        <h3>Client: {task.client}</h3>
        <p>Task: {task.task}</p>
        <p>Notes: {task.notes}</p>

        <p>
          Hours Spent:{" "}
          {formatTime(
            parseTime(task.hoursSpent) +
              (activeTimerTask === index ? elapsedTime : 0)
          )}
        </p>
        <Button onClick={() => toggleTimer(index)}>
          {activeTimerTask === index ? "Stop Timer" : "Start Timer"}
        </Button>
        <Button
          onClick={() => {
            // Logic to edit timer
          }}
        >
          Edit Timer
        </Button>
      </div>
    ));
  };

  return (
    <div className="calendar">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            // disabled={(date) =>
            //   date < new Date() || date < new Date("1900-01-01")
            // }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {renderHeader()}
      {renderDays()}
      {renderFooter()}
      <div className="tasks bg-black text-white">
        {renderTasksForSelectedDate()}
      </div>
    </div>
  );
};

export default TimerDay;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
