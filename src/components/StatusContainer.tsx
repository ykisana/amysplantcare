"use client";

import mqtt from "mqtt";
import { useEffect, useState } from "react";
import StatusTile from "./StatusTile";

export default function StatusContainer() {
  console.log("test");
  const brokerUrl = "wss://test.mosquitto.org:8883/mqtt";

  console.log("test2");
  const TEMP_TOPIC = "plant/temp";
  const WATERLEVEL_TOPIC = "plant/waterlevel";

  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [waterLevel, setWaterLevel] = useState<number | undefined>(undefined);

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT broker on HomePage");
      client.subscribe(TEMP_TOPIC);
      client.subscribe(WATERLEVEL_TOPIC);
    });

    client.on("message", (topic, messageBuffer) => {
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
    <div className="flex justify-center gap-8 mt-8">
      <StatusTile
        name="Temperature"
        value={temperature ? `${temperature}°C` : "Loading..."}
      />
      <StatusTile
        name="Water Level"
        value={waterLevel ? `${waterLevel}%`: "Loading..."}
      />
    </div>
  );
}