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
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Hello World</h1>
    </div>
  );
}

