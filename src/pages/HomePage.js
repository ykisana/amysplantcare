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
  const [temperature, setTemperature] = useState(null);
  const [waterLevel, setWaterLevel] = useState(null);

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      console.log('Connected to MQTT broker on HomePage');
      client.subscribe(TEMP_TOPIC);
      client.subscribe(WATERLEVEL_TOPIC);
    });

    client.on('message', (topic, messageBuffer) => {
      const message = messageBuffer.toString();
      if (topic === TEMP_TOPIC) {
        setTemperature(parseInt(message, 10));
      } else if (topic === WATERLEVEL_TOPIC) {
        setWaterLevel(parseInt(message, 10));
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div 
      style={{
        // Removed backgroundImage: replacing with a solid background color
        backgroundColor: '#ffffff', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3b522f',
        padding: '2rem'
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '3rem' }}>My Plant Care</h1>
      <p>Temperature: {temperature !== null ? `${temperature}°C` : 'Loading...'}</p>
      <p>Water Level: {waterLevel !== null ? `${waterLevel}%` : 'Loading...'}</p>
    </div>
  );
}