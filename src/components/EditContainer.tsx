import { EditForm } from "./EditForm";

interface EditContainerProps {
  mode: string;
  setMode: (s: string) => void;
  waterFrequency: string;
  setWaterFrequency: (s: string) => void;
  waterAmount: string;
  setWaterAmount: (s: string) => void;
  waterSettingsChange: () => void;
  showSaved: boolean;
}

export function EditContainer({
  mode,
  setMode,
  waterFrequency,
  setWaterFrequency,
  waterAmount,
  setWaterAmount,
  waterSettingsChange,
  showSaved,
}: EditContainerProps) {
  return (
    <div className="mt-6 flex flex-col items-start gap-4 max-w-[300px]">
      <EditForm
        mode={mode}
        setMode={setMode}
        waterFrequency={waterFrequency}
        setWaterFrequency={setWaterFrequency}
        waterAmount={waterAmount}
        setWaterAmount={setWaterAmount}
        waterSettingsChange={waterSettingsChange}
        showSaved={showSaved}
      />
    </div>
  );
}
