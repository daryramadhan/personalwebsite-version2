import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

export default function App() {
  return (
    <div className="bg-white min-h-screen font-['Manrope',sans-serif]">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
