// wait for page to load before running JS code
$(document).ready(function () {
  
  // DOM VARIABLES
  var currentDayEl = $("#currentDay");
  var scheduleEl = $(".container");

  // JAVASCRIPT VARIABLES
  //use military time for comparison with moment.js in indicatePresent function
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


  // The current day is displayed at the top of the calendar
  currentDayEl.text(moment().format("dddd, MMMM, Do YYYY"));
  
  initSchedule();
  renderSchedule(businessHours);
  



  // function to display the schedule on the page
  function renderSchedule(scheduleArray) {
    for (let j = 0; j < scheduleArray.length; j++) {
      createTimeBlock(scheduleArray[j],j); 
    }
  }
  // function to create a time block
  function createTimeBlock(timeBlock,index) {
    // create row for the hour time block
    let row = $("<div>").addClass("row time-block");

    // create hour label
    let hour = $("<div>").addClass("hour col-sm-1");
    hour.text(timeBlock.displayTime);

    //create box for task description
    let task = $("<textarea>").addClass("description col-md-10");
    task.addClass(indicatePresent(timeBlock.militaryTime)); //class for color
    task.attr("data-hour",timeBlock.militaryTime)  //class to target to call and store task
    task.text(timeBlock.task);

    // create save button
    let save = $("<button>").addClass("saveBtn col-md-1 far fa-save");
    save.attr("data-index",index);
    save.attr("type","submit"); 

    //append hour, task and save to row, then row to container
    row.append(hour, task, save);
    scheduleEl.append(row);
  }
  // function to indicate if the scheduled hour is past, present, or future
  function indicatePresent(scheduledHour) {
    // let scheduledHour = businessHours[8].militaryTime;
    if (scheduledHour < currentHour) {
      return "past";
    } else if (scheduledHour === currentHour) {
      return "present";
    } else if (scheduledHour > currentHour) {
      return "future";
    }
  }
  // function to initiate the stored schedule
  function initSchedule(){
    var storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));
    if (storedSchedule){
      businessHours = storedSchedule;
    }
  }

/////////////////////////////////////// TODO: verify variable to save 
  // function to save schedule
  function saveSchedule(){
    localStorage.setItem("storedSchedule", JSON.stringify(businessHours));
  }

  // EVENT LISTENERS
  // listen for save buttons
  scheduleEl.on("click",".saveBtn",function(event){
    event.preventDefault
    
    let index = $(this).data("index");
    let newTask = $(this).prev().val(); //get value from textbox previous sibling
    businessHours[index].task = newTask //set schedule 
    console.log(businessHours[index].task);
    saveSchedule();
  });




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
