type AppContainerProps = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-[#3b522f] text-[calc(10px+2vmin)] bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/plant-background.png')" }}
    >
      {children}
    </div>
  );
}
