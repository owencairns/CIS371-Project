import requests

request = requests.get('https://api.themoviedb.org/3/movie/top_rated?api_key=ddfae40651615dd24a4bea67326baaa1')

print(request.json)