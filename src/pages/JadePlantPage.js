import { useState as jadeuseState, useEffect as jadeuseEffect } from "react";
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

export default function jadePlantPage() {
  // States
  const [jademode, jadesetMode] = jadeuseState("manual");
  const [jadewaterFrequency, jadesetWaterFrequency] = jadeuseState("1");
  const [jadewaterAmount, jadesetWaterAmount] = jadeuseState("50");
  const [jadeisConnected, jadesetIsConnected] = jadeuseState(false);
  const [showSaved, setShowSaved] = jadeuseState(false);

  // MQTT details
  const brokerUrl = "ws://test.mosquitto.org:8080/mqtt";
  const jadewaterTopic = "plant/jade/water";

  // Connect to MQTT broker on mount
  jadeuseEffect(() => {
   /* const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Successfully connected to broker");
      jadesetIsConnected(true);

      // Subscribe to the jade water topic
      // If the message is retained, we get it immediately
      client.subscribe(jadewaterTopic);
    });

    // When messages arrive, parse them to update the schedule
    client.on("message", (topic, payload) => {
      if (topic === jadewaterTopic) {
        const msgString = payload.toString(); // e.g., "manual,50,7"
        console.log("Received schedule:", msgString);

        // Parse the CSV: "mode,amount,frequency"
        const [incomingMode, incomingAmount, incomingFrequency] = msgString.split(",");

        if (incomingMode) {
          jadesetMode(incomingMode);
        }
        if (incomingAmount) {
          jadesetWaterAmount(incomingAmount);
        }
        if (incomingFrequency) {
          jadesetWaterFrequency(incomingFrequency);
        }
      } */
    });

    // Cleanup on unmount
    return () => {
      client.end();
    };
  }, []);

  // Publish new schedule
  const jadewaterSettingsChange = () => {
    const jadeclient = mqtt.connect(brokerUrl);
    let jademessage;

    if (jademode === "manual") {
      // CSV format: "manual,amount,frequency"
      jademessage = `${jademode},${jadewaterAmount},${jadewaterFrequency}`;
    } else {
      // e.g. "preset,0,0"
      jademessage = `${jademode},0,0`;
    }

    // Publish with retain=true so the broker stores the last known schedule
    jadeclient.publish(jadewaterTopic, jademessage, { qos: 0, retain: true });
    console.log("Published schedule:", jademessage);

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
        Jade Plant Schedule
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
            value={jademode}
            onChange={(e) => jadesetMode(e.target.value)}
          >
            <option value="preset">preset</option>
            <option value="manual">manual</option>
          </select>
        </div>

        {/* If user selected 'manual', show frequency + amount */}
        {jademode === "manual" && (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Water Frequency:</label>
              <select
                value={jadewaterFrequency}
                onChange={(e) => jadesetWaterFrequency(e.target.value)}
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
                value={jadewaterAmount}
                onChange={(e) => jadesetWaterAmount(e.target.value)}
              />
            </div>
          </>
        )}

        {/* If user selected 'preset', show a note */}
        {jademode === "preset" && (
          <p style={{ fontStyle: "italic", margin: 0 }}></p>
        )}

        {/* Button row */}
        <div>
          <button onClick={jadewaterSettingsChange}>Save Schedule</button>
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
