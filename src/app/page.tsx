import AppContainer from "@/components/AppContainer";
import { Header } from "@/components/Header";
import PlantsRow from "@/components/PlantsRow";
import StatusContainer from "@/components/StatusContainer";

export default function Home() {
  return (
    <AppContainer>
      <Header text="My Plant Care" />
      <PlantsRow />
      <StatusContainer />
    </AppContainer>
  );
}
