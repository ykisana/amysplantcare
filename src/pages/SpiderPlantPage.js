import { useState as spideruseState, useEffect as spideruseEffect } from "react";
import mqtt from "mqtt";
import { Link } from "react-router-dom";
import plantBackground from "../plant-background.png";

function BackButton() {
  return (
    <Link to="/" className="back-button">
      <button>Back</button>
    </Link>
  );
}

export default function SpiderPlantPage() {
  // States
  const [spidermode, spidersetMode] = spideruseState("manual");
  const [spiderwaterFrequency, spidersetWaterFrequency] = spideruseState("1");
  const [spiderwaterAmount, spidersetWaterAmount] = spideruseState("50");
  const [spiderisConnected, spidersetIsConnected] = spideruseState(false);
  const [showSaved, setShowSaved] = spideruseState(false);

  // MQTT details
  const brokerUrl = 'wss://test.mosquitto.org:8081/mqtt';
  const spiderwaterTopic = "plant/spider/water";

  // Connect to MQTT broker on mount
  spideruseEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Successfully connected to broker");
      spidersetIsConnected(true);

      // Subscribe to the spider water topic
      // If the message is retained, we get it immediately
      client.subscribe(spiderwaterTopic);
    });

    // When messages arrive, parse them to update the schedule
    client.on("message", (topic, payload) => {
      if (topic === spiderwaterTopic) {
        const msgString = payload.toString(); // e.g., "manual,50,7"
        console.log("Received schedule:", msgString);

        // Parse the CSV: "mode,amount,frequency"
        const [incomingMode, incomingAmount, incomingFrequency] = msgString.split(",");

        if (incomingMode) {
          spidersetMode(incomingMode);
        }
        if (incomingAmount) {
          spidersetWaterAmount(incomingAmount);
        }
        if (incomingFrequency) {
          spidersetWaterFrequency(incomingFrequency);
        }
      }
    });

    // Cleanup on unmount
    return () => {
      client.end();
    };
  }, []);

  // Publish new schedule
  const spiderwaterSettingsChange = () => {
    const spiderclient = mqtt.connect(brokerUrl);
    let spidermessage;

    if (spidermode === "manual") {
      // CSV format: "manual,amount,frequency"
      spidermessage = `${spidermode},${spiderwaterAmount},${spiderwaterFrequency}`;
    } else {
      // e.g. "preset,0,0"
      spidermessage = `${spidermode},0,0`;
    }

    // Publish with retain=true so the broker stores the last known schedule
    spiderclient.publish(spiderwaterTopic, spidermessage, { qos: 0, retain: true });
    console.log("Published schedule:", spidermessage);

    // Show "Saved" for 10s
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 10000);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${plantBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#3b522f",
        padding: "2rem",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
        Spider Plant Schedule
      </h2>
      <BackButton />

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
          maxWidth: "300px",
        }}
      >
        {/* Schedule Type */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Schedule type:</label>
          <select
            value={spidermode}
            onChange={(e) => spidersetMode(e.target.value)}
          >
            <option value="preset">preset</option>
            <option value="manual">manual</option>
          </select>
        </div>

        {/* If user selected 'manual', show frequency + amount */}
        {spidermode === "manual" && (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Water Frequency:</label>
              <select
                value={spiderwaterFrequency}
                onChange={(e) => spidersetWaterFrequency(e.target.value)}
              >
                <option value="1">Daily</option>
                <option value="7">Weekly</option>
                <option value="14">Bi-Weekly</option>
                <option value="28">Monthly</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Water Amount (ml):</label>
              <input
                type="text"
                value={spiderwaterAmount}
                onChange={(e) => spidersetWaterAmount(e.target.value)}
              />
            </div>
          </>
        )}

        {/* If user selected 'preset', show a note */}
        {spidermode === "preset" && (
          <p style={{ fontStyle: "italic", margin: 0 }}></p>
        )}

        {/* Button row */}
        <div>
          <button onClick={spiderwaterSettingsChange}>Save Schedule</button>
          {showSaved && (
            <small style={{ color: "green", marginLeft: "0.5rem" }}>
              ✓ Saved
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
