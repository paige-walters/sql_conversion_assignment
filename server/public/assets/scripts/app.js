$(document).ready(function(){
   $("#search").submit(function(event){
      event.preventDefault();
      var values = {};

      $.each($(this).serializeArray(), function(i, field){
         values[field.name] = field.value;
      });

      $('#search').find("input[type=text]").val("");


      findData(values);
      //getData(values);
   });

   $("#addSomeone").submit(addSomeone);
   $("#peopleContainer").on('click', '.delete', deletePerson);

   getData();
});

function getData(values){
   $.ajax({
      type: "GET",
      url: "/data",
      data: values,
      success: function(data){
         updateDOM(data);
      }
   })
}
function findData(values){
   $.ajax({
      type: "GET",
      url: "/find",
      data: values,
      success: function(data){
         updateDOM(data);
      }
   })
}

function addSomeone(){
   event.preventDefault();
   var values = {};

   $.each($(this).serializeArray(), function(i, field){
      values[field.name] = field.value;
   });
   $('#addSomeone').find("input[type=text]").val("");

   $.ajax({
      type: "POST",
      url: "/data",
      data: values,
      success: function(data){
         getData();
      }
   });


}

function deletePerson(){
   var deletedId = {"id" : $(this).data("id")};

   console.log("Meaningful Log: ", deletedId);

   $.ajax({
      type: "DELETE",
      url: "/data",
      data: deletedId,
      success: function(data){

         getData();
      }
   })
}

function updateDOM(data){
   $("#peopleContainer").empty();

   for(var i = 0; i < data.length; i++){
      var el = "<div class='individuals well col-md-3'>" +
                  "<p>" + data[i].name + "</p>" +
                  "<p>" + data[i].location + "</p>" +
                  "<p>" + data[i].age + "</p>" +
                  "<p>" + data[i].spirit_animal + "</p>" +
                  "<p>" + data[i].address + "</p>" +
                  "<button class='delete btn btn-danger' data-id='" +
                     data[i].id + "'>Delete</button>" +
               "</div>";

      $("#peopleContainer").append(el);
   }
}
