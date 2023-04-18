import requests
import json

API_KEY = 'api_key=ddfae40651615dd24a4bea67326baaa1'

#request = requests.get('https://api.themoviedb.org/3/movie/top_rated?')
#trending_request = requests.get(f'https://api.themoviedb.org/3/trending/movie/day?{API_KEY}')
top_rated_request = f'https://api.themoviedb.org/3/movie/top_rated?{API_KEY}&language=en-US'

# Initialize an empty list to store all the top rated movies
top_rated_movies = []

# Send GET request to endpoint for the first page
response = requests.get(top_rated_request)

# Convert response to JSON object
data = response.json()

# Extract the total number of pages from the response data
total_pages = data['total_pages']

# Add the top rated movies from the first page to the list
top_rated_movies.extend(data['results'])

# Loop through the remaining pages and add their top rated movies to the list
for page in range(2, 501):
    # Modify endpoint URL with page parameter
    page_endpoint = f"{top_rated_request}&page={page}"
    
    # Send GET request to endpoint for the current page
    response = requests.get(page_endpoint)
    response.raise_for_status()
    
    # Convert response to JSON object
    data = response.json()
    
    try:
        # Add the top rated movies from the current page to the list
        top_rated_movies.extend(data['results'])
        
    except KeyError:
        print(f"Error: page {page} does not contain a 'results' key.")



# Write the list of all top rated movies to a JSON file
with open('all_top_rated_movies.json', 'w') as f:
    json.dump(top_rated_movies, f)