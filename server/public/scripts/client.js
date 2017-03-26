$(document).ready(function() {
  console.log("jquery sourced");

showTasks();

}); //end document ready


//Appends all tasks to the DOM
function showTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
    success: function(response) {
      console.log(response);
      $("#tasks").empty();
      for(var i = 0; i < response.length; i++) {
        var task = response[i];
        $("#tasks").append("<tr></tr>");
        var $el = $("#tasks").children().last();
        $el.append("<td>" + (i + 1) + "</td>");
        $el.append("<td>" + task.description + "</td>");
        $el.append("<td>" + task.completed + "</td>");
        $el.append("<td><button>Complete</button></td>");
        $el.append("<td><button>Delete</button></td>");
      } //ends for loop
    } //ends success function
  }); //ends ajax request
} //ends showTasks function
