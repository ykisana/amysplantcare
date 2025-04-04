import { useState as basiluseState, useEffect as basiluseEffect } from "react";
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

export default function basilPlantPage() {
  // States
  const [basilmode, basilsetMode] = basiluseState("manual");
  const [basilwaterFrequency, basilsetWaterFrequency] = basiluseState("1");
  const [basilwaterAmount, basilsetWaterAmount] = basiluseState("50");
  const [basilisConnected, basilsetIsConnected] = basiluseState(false);
  const [showSaved, setShowSaved] = basiluseState(false);

  // MQTT details
  const brokerUrl = "ws://test.mosquitto.org:8080/mqtt";
  const basilwaterTopic = "plant/basil/water";

  // Connect to MQTT broker on mount
  basiluseEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Successfully connected to broker");
      basilsetIsConnected(true);

      // Subscribe to the basil water topic
      // If the message is retained, we get it immediately
      client.subscribe(basilwaterTopic);
    });

    // When messages arrive, parse them to update the schedule
    client.on("message", (topic, payload) => {
      if (topic === basilwaterTopic) {
        const msgString = payload.toString(); // e.g., "manual,50,7"
        console.log("Received schedule:", msgString);

        // Parse the CSV: "mode,amount,frequency"
        const [incomingMode, incomingAmount, incomingFrequency] = msgString.split(",");

        if (incomingMode) {
          basilsetMode(incomingMode);
        }
        if (incomingAmount) {
          basilsetWaterAmount(incomingAmount);
        }
        if (incomingFrequency) {
          basilsetWaterFrequency(incomingFrequency);
        }
      }
    });

    // Cleanup on unmount
    return () => {
      client.end();
    };
  }, []);

  // Publish new schedule
  const basilwaterSettingsChange = () => {
    const basilclient = mqtt.connect(brokerUrl);
    let basilmessage;

    if (basilmode === "manual") {
      // CSV format: "manual,amount,frequency"
      basilmessage = `${basilmode},${basilwaterAmount},${basilwaterFrequency}`;
    } else {
      // e.g. "preset,0,0"
      basilmessage = `${basilmode},0,0`;
    }

    // Publish with retain=true so the broker stores the last known schedule
    basilclient.publish(basilwaterTopic, basilmessage, { qos: 0, retain: true });
    console.log("Published schedule:", basilmessage);

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
        Basil Plant Schedule
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
            value={basilmode}
            onChange={(e) => basilsetMode(e.target.value)}
          >
            <option value="preset">preset</option>
            <option value="manual">manual</option>
          </select>
        </div>

        {/* If user selected 'manual', show frequency + amount */}
        {basilmode === "manual" && (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Water Frequency:</label>
              <select
                value={basilwaterFrequency}
                onChange={(e) => basilsetWaterFrequency(e.target.value)}
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
                value={basilwaterAmount}
                onChange={(e) => basilsetWaterAmount(e.target.value)}
              />
            </div>
          </>
        )}

        {/* If user selected 'preset', show a note */}
        {basilmode === "preset" && (
          <p style={{ fontStyle: "italic", margin: 0 }}></p>
        )}

        {/* Button row */}
        <div>
          <button onClick={basilwaterSettingsChange}>Save Schedule</button>
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
