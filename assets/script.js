const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

  const APIKey = '185dbcc57e27f9315a49d3f1c762ebd7';
  const city = document.querySelector('.search-box input').value;

  if (city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`) 
    .then(response => response.json())
    .then(json => {

        if (json.cod === '404'){

          container.style.height = '400px';

          weatherBox.style.display = 'none';
          weatherDetails.style.display = 'none';

          error404.style.display = 'block';
          error404.classList.add('fadeIn');

          return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const audio = document.querySelector('#audio')
        const image = document.querySelector('.weather-box img')
        const termperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main) {
          case 'Clear':
            image.src = 'assets/images/clear.png';
            audio.src = 'assets/audios/clear.wav'
            break;

            case 'Rain':
              image.src = 'assets/images/rain.png';
              audio.src = 'assets/audios/rain.wav'
              break;

              case 'Snow':
                image.src = 'assets/images/snow.png';
                audio.src = 'assets/audios/snow.wav'
                break;

                case 'Clouds':
                  image.src = 'assets/images/cloud.png';
                  audio.src = 'assets/audios/clouds.wav'
                  break;

                  case 'Haze':
                    image.src = 'assets/images/mist.png';
                    audio.src = 'assets/audios/mist.wav'
                    break;

          default:
            image.src = '';
        }

        termperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        weatherBox.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')

        container.style.height = '590px';

    })
})