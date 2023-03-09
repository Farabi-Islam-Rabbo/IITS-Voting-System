// import config from "../config/config";
import moment from "moment";
import * as qs from "query-string";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// export const createFileUrl = (file) => {
//   return file
//     ? `${config.awsS3}${file}`
//     : "https://future-talk-s3.s3.amazonaws.com/b2288d20-bca9-4e8c-9c41-da45118a7230.jpg";
// };

export const getParamsUrlData = () => {
  const parsed = qs.parse(window.location.search);
  return parsed;
};

export const decreaseMinuteFromCurrentTime = (time) => {
  let date = new Date();
  date.setMinutes(date.getMinutes() + time);
  return date;
};

export const differentBetweenTwoDate = (startTime1, endTime1) => {
  var startTime = new Date(startTime1);
  var endTime = new Date(endTime1);
  var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
  return Math.round(difference / 60000);
};

export const showOnlyTwoDigit = (numberData) => {
  return numberData.toFixed(2);
};

export const DisplayDateTime = (dateTime) => {
  if (!dateTime) {
    return "";
  }
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let time = convertTZ(dateTime, timezone);
  return moment(new Date(time)).format("LLL");
};

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export const formateDateYYYYMMDD = (dateTime) => {
  let day = new Date(dateTime)?.getDate();
  let year = new Date(dateTime)?.getFullYear();
  let month = new Date(dateTime)?.getMonth() + 1;

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

export const formateDateYYYYMMDDTHHMM = (dateTime) => {
  let date = new Date(dateTime);
  let returnDate = date.toLocaleString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let day = new Date(dateTime)?.getDate();
  let year = new Date(dateTime)?.getFullYear();
  let month = new Date(dateTime)?.getMonth() + 1;
  let hour = new Date(dateTime)?.getHours() + 1;
  let minute = new Date(dateTime)?.getMinutes() + 1;

  let time = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }T${returnDate}`;
  return time;
};

export const differentBetweenDateInDays = (courseEnd, courseStart) => {
  const diffInMs = new Date(courseEnd) - new Date(courseStart);
  return diffInMs / (1000 * 60 * 60 * 24);
};

export const getDayFromDate = (dateAndTime) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date(dateAndTime);
  return weekday[d.getDay()];
};

export const addDaysWithDate = (startDate, day) => {
  return moment(startDate, "YYYY-MM-DD").add(day, "days");
};

export const addHourAndMinute = (date, time) => {
  const [hour, minute] = time.split(":");
  let currentDate = moment(new Date(date));
  currentDate.set("hour", hour);
  currentDate.set("minute", minute);
  return currentDate.format();
};

export const addMinuteWithDate = (date, minute) => {
  let currentDate = moment(new Date(date));
  currentDate.add(minute, "minute");
  return currentDate.format();
};

export const compareDate = (firstDate, secondDate) => {
  return new Date(firstDate) >= new Date(secondDate) ? true : false;
};

export const convertGMTToUTC = (date) => {
  let toBeUpdated = new Date(date);
  return toBeUpdated.toISOString();
};
