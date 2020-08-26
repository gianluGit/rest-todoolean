function getList() {



  $.ajax({
    url: 'http://157.230.17.132:3025/todos',
    method: 'GET',
    success: function(data) {
      var thingsToDo = data;
      console.log(data);

      printList(thingsToDo);
    },
    error: function(err) {
      console.log('err', err);
    }



  });
}

function printList(thingsToDo) {
  var target = $('#list');
  target.text('');


  for (var i = 0; i < thingsToDo.length; i++) {
    var thing = thingsToDo[i];
    var thingText = thing['text'];
    var id = thing['id'];


    target.append(`<li>${thingText} - <i data-id= "${id}" class="fas fa-times"></i></li>`);
  }
}

function addElement() {
  var targetInput = $('#textInput');

  var addButton = $('#btn');
  addButton.click(function() {

    var targetValue = targetInput.val();
    targetInput.val('');


    $.ajax({
      url: 'http://157.230.17.132:3025/todos',
      method: 'POST',
      data: {
        text: targetValue
      },
      success: function(data) {
        console.log('data', data);

        getList();


      },
      error: function(err) {
        console.log('err', err);
      }
    });
  });
}

function delElement() {


  $(document).on('click', 'i.fas', function() {
    var xDel = $(this);
    var id = xDel.data('id');
    console.log(id);

    $.ajax({
      url: `http://157.230.17.132:3025/todos/${id}`,
      method: 'DELETE',
      success: function(data) {
        getList();

      },
      error: function(err) {
        console.log('err', err);
      }
    });
  });
}





$(document).ready(function() {
  getList();
  addElement();
  delElement();
});
