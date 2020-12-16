// wait for page to load before running JS code
$(document).ready(function () {
  // DOM VARIABLES
  var currentDayEl = $("#currentDay");
  var scheduleEl = $(".container");

  // JAVASCRIPT VARIABLES
  //use military time for comparison with moment.js
  var businessHours = [
    {
      displayTime: "9 AM",
      militaryTime: "09",
      task: "",
    },
    {
      displayTime: "10 AM",
      militaryTime: "10",
      task: "",
    },
    {
      displayTime: "11 AM",
      militaryTime: "11",
      task: "",
    },
    {
      displayTime: "12 PM",
      militaryTime: "12",
      task: "",
    },
    {
      displayTime: "1 PM",
      militaryTime: "13",
      task: "",
    },
    {
      displayTime: "2 PM",
      militaryTime: "14",
      task: "",
    },
    {
      displayTime: "3 PM",
      militaryTime: "15",
      task: "",
    },
    {
      displayTime: "4 PM",
      militaryTime: "16",
      task: "",
    },
    {
      displayTime: "5 PM",
      militaryTime: "17",
      task: "",
    },
  ];
  var schedule = [];
  var currentHour = moment().format("HH");

  // GIVEN I am using a daily planner to create a schedule
  // WHEN I open the planner
  // THEN the current day is displayed at the top of the calendar
  // use moment to set current day in header
  currentDayEl.text(moment().format("dddd, MMMM, Do YYYY"));
  renderSchedule(businessHours);

  // WHEN I scroll down
  // THEN I am presented with time blocks for standard business hours
  // for loop over business hours to append children to container div

  // function to display the schedule on the page
  function renderSchedule(scheduleArray) {
    for (let j = 0; j < scheduleArray.length; j++) {
      createTimeBlock(scheduleArray[j].displayTime, scheduleArray[j].task);
    }
  }

  // function to create a time block
  function createTimeBlock(time, taskDescription) {
    // create row for the hour time block
    let row = $("<div>").addClass("row time-block");

    // create hour label
    let hour = $("<div>").addClass("hour col-sm-1");
    hour.text(time);

    //create box for task description
    let task = $("<textarea>").addClass("description col-md-10");
    task.text(taskDescription);

    // create save button
    let save = $("<button>").addClass("saveBtn col-md-1 far fa-save");

    //append hour, task and save to row, then row to container
    row.append(hour, task, save);
    scheduleEl.append(row);
  }

  function indicatePresent(scheduledHour) {
    let scheduledHour = businessHours[8].militaryTime;
    if (scheduledHour < currentHour) {
      return "past";
    } else if (scheduledHour === currentHour) {
      return "present";
    } else if (scheduledHour > currentHour) {
      return "future";
    }
  }

  indicatePresent();

  // WHEN I view the time blocks for that day
  // THEN each time block is color-coded to indicate whether it is in the past, present, or future
  // use moment.js to get time
  // for loop over each time block
  // if business hour < current hour, set class to past
  // else if business hour === current hour, set class to current
  // else set class to future

  // WHEN I click into a time block
  // THEN I can enter an event
  // add event listener for container div listening to child elements
  // when clicked, edit class for block border
  //

  // WHEN I click the save button for that time block
  // THEN the text for that event is saved in local storage
  // save button is form submit
  // append to schedule array
  // save schedule array to local memory

  // WHEN I refresh the page
  // THEN the saved events persist
  // initialize page by pulling storedSchedule from local memory
});
