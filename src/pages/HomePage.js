import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { Link } from 'react-router-dom';

import jadePlant from '../jade-plant.jpg'; 
import spiderPlant from '../spider-plant.jpg';
import basilPlant from '../basil-plant.jpg';
import plantBackground from '../plant-background.png'; 

const brokerUrl = 'ws://test.mosquitto.org:8080/mqtt';

const TEMP_TOPIC       = 'plant/temp';
const WATERLEVEL_TOPIC = 'plant/waterlevel';

function PlantTile({ image, alt, link }) {
  return (
    <Link to={link} className="plant-tile">
      <img src={image} alt={alt} className="plant-image large-plant-image" />
    </Link>
  );
}

export default function HomePage() {
 // const [temperature, setTemperature] = useState(null);
 // const [waterLevel, setWaterLevel] = useState(null);

  //useEffect(() => {
   // const client = mqtt.connect(brokerUrl);

  //  client.on('connect', () => {
  //    console.log('Connected to MQTT broker on HomePage');
  //    client.subscribe(TEMP_TOPIC);
   //   client.subscribe(WATERLEVEL_TOPIC);
  //  });

    //client.on('message', (topic, messageBuffer) => {
     // const message = messageBuffer.toString();
     // if (topic === TEMP_TOPIC) {
     //   setTemperature(parseInt(message, 10));
     // } else if (topic === WATERLEVEL_TOPIC) {
      //  setWaterLevel(parseInt(message, 10));
    //  }
  //  });

 //   return () => {
  //    client.end();
 //   };
 // }, []);

  return (
    <div
      className="App-header"
      style={{
        backgroundImage: `url(${plantBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3b522f',
        minHeight: '100vh',
        padding: '2rem'
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>My Plant Care</h1>

      {/* Row of plant tiles */} 
      <div
        className="plant-list"
        style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}
      >
        <PlantTile image={basilPlant} alt="Basil Plant" link="/basil" />
        <PlantTile image={spiderPlant} alt="Spider Plant" link="/spider" />
        <PlantTile image={jadePlant} alt="Jade Plant" link="/jade" />
      </div>

      {/* Status tiles row */}
      <div
        className="status-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >/*
        {/* Temperature tile */}
        <div
          className="status-tile"
          style={{
            border: '4px solid #3b522f',
            borderRadius: '8px',
            // Reduced top padding to move header higher
            padding: '0.5rem 2rem 1rem', 
            backgroundColor: '#ffffffcc',
            textAlign: 'center',
            minWidth: '220px'
          }}
        >
          <h2 
            style={{ 
              // Remove any default top margin
              marginTop: 0,
              marginBottom: '0.5rem', 
              color: '#3b522f',
              fontSize: '2rem'
            }}
          >
            Temperature Status
          </h2>
          <p
            style={{
              color: '#3b522f',
              fontSize: '3rem',   // Larger than the header
              fontWeight: 'bold',
              margin: 0
            }}
          >
            {/*temperature !== null ? `${temperature}°C` : 'Loading...'*/}
          </p>
        </div>

        {/* Water level tile */}
        <div
          className="status-tile"
          style={{
            border: '4px solid #3b522f',
            borderRadius: '8px',
            // Same reduced top padding and margin approach
            padding: '0.5rem 2rem 1rem',
            backgroundColor: '#ffffffcc',
            textAlign: 'center',
            minWidth: '220px'
          }}
        >
          <h2 
            style={{ 
              marginTop: 0,
              marginBottom: '0.5rem', 
              color: '#3b522f',
              fontSize: '2rem'
            }}
          >
            Water Level Status
          </h2>
          <p
            style={{
              color: '#3b522f',
              fontSize: '3rem',
              fontWeight: 'bold',
              margin: 0
            }}
          >
            {/*waterLevel !== null ? `${waterLevel}%` : 'Loading...'*/}
          </p>
        </div>
      </div>
    </div>
  );
}

