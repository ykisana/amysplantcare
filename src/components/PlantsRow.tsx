import { Plants } from "@/helpers/Plant";
import PlantTile from "./PlantTile";

export default function PlantsRow() {
  return (
    <div
      className="plant-list"
      style={{ marginTop: "2rem", display: "flex", gap: "2rem" }}
    >
      {Plants.map((plant, idx) => (
        <PlantTile key={idx} name={plant.name} image={plant.image} />
      ))}
    </div>
  );
}
