"use client";

import CallList from "@/components/CallList";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import React from "react";

const Home = () => {
  const { upcomingCalls, isLoading } = useGetCalls();

  const getUpcomingMeetingText = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (upcomingCalls?.length && upcomingCalls[0].state?.startsAt) {
      const today = new Date();
      const meetingDate = new Date(upcomingCalls[0].state?.startsAt);
      if (meetingDate.toDateString() === today.toDateString()) {
        const time = meetingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        return "Upcoming Meeting Today at " + time;
      }

      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      if (meetingDate.toDateString() === tomorrow.toDateString()) {
        const time = meetingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        return "Upcoming Meeting Tomorrow at " + time;
      }

      const dayOfWeek = meetingDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      const meetingTime = meetingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      return "Upcoming Meeting on " + dayOfWeek + " at " + meetingTime;
    }
    return "No Upcoming Meetings";
  };

  const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[303px] w-full rounded-[14px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2
            className="glassmorphism max-w-[350px] rounded py-2
          text-center text-base font-normal "
          >
            {getUpcomingMeetingText()}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
      <div>
        <h2 className="text-3xl font-bold">Today’s Upcoming Meetings</h2>
        <div className="flex size-full flex-col gap-10 text-white mt-10">
          <CallList type="upcoming" />
        </div>
      </div>
    </section>
  );
};

export default Home;
