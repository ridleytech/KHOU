import weather10day


def lambda_handler(event, context):

    try:
        weatherData = weather10day.getWeather()

        return {
            'statusCode': 200,
            'body': weatherData
        }

    except Exception as e:
        print("Error:", e)

        return {
            'statusCode': 500,
            'body': e
        }
