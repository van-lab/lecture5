document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#form').onsubmit = () => {
    // Initialize new request
    const request = new XMLHttpRequest();
    const currency = document.querySelector('#currency').value;
    console.log(currency);
    request.open('POST', '/convert');
    // callback function after response is received
    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if(data.success) {
        const contents = `1 USD is equal to ${data.rate} ${currency}`;
        document.querySelector('#result').innerHTML = contents;
      }
      else {
        document.querySelector('#result').innerHTML = 'There was an error.';
      } 
    }
    // add data to send with request to convert
    const data = new FormData();
    // append data key:value
    data.append('currency', currency);

    // send request
    request.send(data);
    return false;
  };
});
