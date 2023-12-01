const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.tomorrow.io/v4/weather/forecast?location=new%20york&apikey=Dwjbgs39bUV0xPUN9waZ285IuXkLY6Re', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));