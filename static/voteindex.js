document.addEventListener('DOMContentLoaded', () => {
  // connect to web socket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  // when connected, configure buttons
  socket.on('connect', () => {
    // each button should emit a "submit vote" event
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        // from html <button data-vote = button.dataset.vote>
        const selection = button.dataset.vote;
        // emit "submit vote" event to web server, data =json object selection
        socket.emit('submit vote', {'selection': selection});
      };
    });
  });
  // listen on socket for "announce vote" event, add to the unorder list
  socket.on('vote totals', data => {
    document.querySelector('#yes').innerHTML = data.yes;
    document.querySelector('#no').innerHTML = data.no;
    document.querySelector('#maybe').innerHTML = data.maybe;
    //const li = document.createElement('li');
    //li.innerHTML = `Vote recorded: ${data.selection}`;
    //document.querySelector('#votes').append(li);
  });
});