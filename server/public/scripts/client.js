$(document).ready(function() {
  console.log("jquery sourced");

showTasks();

//adds new tasks - ajax POST
$("form").on("submit", function(event) {
    event.preventDefault();
    // console.log("submit clicked");
    $.ajax({
        type: "POST",
        url: "/tasks/add",
        data: {description: $("#description").val()},
        success: function(response) {
          //Refresh task list on DOM
          //console.log(response);
          showTasks();
        }
    }); //ends POST request
    $("#description").val("");
}); //ends event handler

//creates event listener & deletes task ajax DELETE
$(".tasks").on("click", ".delete", function() {
    var id = $(this).data("task");
    var verify = confirm("Are you sure you want to delete this task?");
        if(verify) {
          $.ajax({
            type: "DELETE",
            url: "/tasks/delete/" + id,
            success: function(response) {
              console.log("Deletes " + id);
              showTasks();
            }
          }); //ends ajax DELETE request
        } //ends if statement
}); //ends event handler


//event listener for Complete button
$(".tasks").on("click", ".update", function() {
  var id = $(this).data("task");
  //change class to Complete
  var update =$(this).parent().parent();
  update.addClass("complete").data("done", "true");
  //console.log(update.data("done"));
  //send ajax PUT request to update "completed"
  if(update.data("done")) {
    //console.log("updating " + id);
    $.ajax({
      type: "PUT",
      url: "/tasks/update/" + id,
      //data: {},
      success: function(repsonse) {
        showTasks();
      }
    }); //ends ajax PUT request
  } //ends if statement
});//ends event listener


}); //end document ready


//Appends all tasks to the DOM
function showTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
    success: function(response) {
      console.log(response);
      $(".tasks").empty();
      for(var i = 0; i < response.length; i++) {
        var task = response[i];
        $(".tasks").append("<tr class = 'uncomplete'></tr>");
        var $el = $(".tasks").children().last();
        $el.append("<td>" + (i + 1) + "</td>");
        $el.append("<td>" + task.description + "</td>");
        $el.append("<td>" + task.completed + "</td>");
        //$el.append("<td><input type ='checkbox'></td>");
        $el.append("<td><button class = 'update' data-task =" +
                        task.id + ">Completed</button></td>");
        $el.append("<td><button class = 'delete' data-task ="  +
            task.id + ">Delete</button></td>");
      } //ends for loop
    } //ends success function
  }); //ends ajax request
} //ends showTasks function
