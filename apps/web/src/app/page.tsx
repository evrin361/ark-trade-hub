import { AppPage } from "@/components/ui/AppPage";
import { Panel } from "@/components/ui/Panel";

export default function Home() {
  return (
    <AppPage
      title="ARK Trade Hub"
      description="Dashboard"
    >
      <Panel>
        <p>Welcome to ARK Trade Hub</p>
      </Panel>
    </AppPage>
  );
}