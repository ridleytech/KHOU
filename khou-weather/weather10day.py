import requests
from bs4 import BeautifulSoup
import json
import uuid

def getWeather():

    url = "https://www.khou.com/weather/"
    agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"

    response = requests.get(url, headers={"user-agent": agent})

    html = response.content
    soup = BeautifulSoup(html, "html.parser")

    day_tags = soup.select(".weather-10-day__day")
    date_tags = soup.select(".weather-10-day__date")
    condition_icon_tags = soup.select(
        ".weather-10-day__conditions-icon-inner")
    high_tags = soup.select(
        ".weather-10-day__temperature-high")
    low_tags = soup.select(
        ".weather-10-day__temperature-low")
    precip_tags = soup.select(".weather-10-day__precipitation-number")
    wind_number_tags = soup.select(".weather-10-day__wind-number")
    wind_direction_tags = soup.select(".weather-10-day__wind-direction")

    days = []
    dates = []

    for day in day_tags:
        days.append(day.text)

    for date in date_tags:
        dates.append(date.text)

    conditionIcons = []

    for icon in condition_icon_tags:
        conditionIcons.append(icon["src"])

    highs = []

    for high in high_tags:
        highs.append(high.text)

    lows = []

    for low in low_tags:
        lows.append(low.text)

    precipitations = []

    for low in precip_tags:
        precipitations.append(low.text)

    windNumbers = []

    for number in wind_number_tags:
        windNumbers.append(number.text)

    windDirections = []

    for direction in wind_direction_tags:
        windDirections.append(direction.text)

    weatherObs = []
    counter = 0

    for day in days:
        ob = {
            "id":str(uuid.uuid4()),
            "day": day, "date": dates[counter],
            "condition": "https://www.khou.com/" + conditionIcons[counter],
            "high": highs[counter],
            "low": lows[counter],
            "precipitations": precipitations[counter],
            "windNumber": windNumbers[counter],
            "windDirection": windDirections[counter]}

        weatherObs.append(ob)
        counter += 1

    return json.dumps(weatherObs)
