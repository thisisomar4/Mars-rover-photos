import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

 //state variables 
function App() {
  const [sol, setSol] = useState('');
  const [earthDate, setEarthDate] = useState('');
  const [camera, setCamera] = useState('');
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  //API key from environment variables
  const API_KEY = process.env.REACT_APP_NASA_API_KEY; // use your own key from NASA here

  const handleSubmit = async (event) => {
    event.preventDefault();

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${API_KEY}`;

    if (sol) {
      url += `&sol=${sol}`;
    }
    if (earthDate) {
      url += `&earth_date=${earthDate}`;
    }
    if (camera) {
      url += `&camera=${camera}`;
    }

    try {
      const response = await axios.get(url);
      const data = response.data.photos;
      if (data.length === 0) {
        setMessage("No photos found for the given parameters.");
        setPhotos([]);
      } else {
        setPhotos(data);
        setMessage('');
      }
    } catch (error) {
      setMessage("Error fetching data from NASA API.");
      setPhotos([]);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="App">
      <h1>Mars Rover Photos</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Martian Sol:
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(e.target.value)}
            placeholder="e.g. 1000"
          />
        </label>

        <label>
          Earth Date (YYYY-MM-DD):
          <input
            type="date"
            value={earthDate}
            onChange={(e) => setEarthDate(e.target.value)}
          />
        </label>

        <label>
          Camera:
          <select value={camera} onChange={(e) => setCamera(e.target.value)}>
            <option value="">All Cameras</option>
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">Navigation Camera</option>
            <option value="PANCAM">Panoramic Camera</option>
            <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
          </select>
        </label>

        <button type="submit">Get Photos</button>
      </form>

      {message && <p>{message}</p>}

      <div className="photo-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item" onClick={() => openModal(photo)}>
            <img src={photo.img_src} alt="Mars" />
            <p>Camera: {photo.camera.full_name} | Sol: {photo.sol}</p>
          </div>
        ))}
      </div>

      {/*modal for displaying the ful image */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedPhoto.img_src} alt="Full Mars View" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
