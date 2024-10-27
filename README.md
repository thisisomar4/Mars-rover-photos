# Mars Rover Photos

A React-based web application that allows users to fetch and view photos taken by the Mars Rover (Curiosity) using NASA's Mars Rover Photos API. Users can search for photos based on mars sol, and camera type.

## Features

- Fetch photos from NASA's Mars Rover API based on Martian Sol (day on Mars), Earth date, and camera type.
- Display results. 
- Error handling for no photos found or API errors.

## Installation

1. Clone the repository:

 git clone https://github.com/thisisomar4/mars-rover-photos.git

2. Navigate to the project directory:
cd mars-rover-photos


3. Install the dependencies:
npm install

4. Set up your environment variables:
Create a new file named `.env` in the root directory and add the following line: REACT_APP_NASA_API_KEY=your_api_key_here
Replace `your_api_key_here` with your actual NASA API key.


5. Run the app:
npm start

The app will be available at http://localhost:3000.

## Technologies Used
- React
- Axios
- NASA Mars Rover Photos API

## License
This project is licensed under the MIT License. 
