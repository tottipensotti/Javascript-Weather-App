const form = document.querySelector('#searchbox form')
const msg = document.querySelector('.msg');
const list = document.querySelector('.cities')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let value = form.querySelector('input').value;
  const key = '23d6d94bd60929c07fa9a2e53ab0394f';
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=metric`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const { main, name, sys, weather } = data;
          const icon = `icons/${weather[0]["icon"]}.svg`;
          const li = document.createElement('li');
          li.classList.add('city');
          const markup = `
              <h2 class="city-name" data-name="${name}, ${sys.country}">
                  <span>${name}</span>
                  <sup>${sys.country}</sup>
              </h2>
              <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
              <figure>
                  <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
                  <figcaption>${weather[0]["description"]}</figcaption>
              </figure>`;
          li.innerHTML = markup;
          list.appendChild(li);
      })
      .catch(() => {
          msg.textContent = 'Please search for a valid city';
      });

      form.querySelector('input').value = '';
});

