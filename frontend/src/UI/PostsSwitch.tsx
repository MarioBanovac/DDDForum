import { useState } from "react";

type SwitchType = "Popular" | "New";

export function PostsSwitch() {
  const [activeSwitch, setActiveSwitch] = useState<SwitchType>("Popular");

  const activatePopularSwitch = () => setActiveSwitch("Popular");

  const activateNewSwitch = () => setActiveSwitch("New");

  return (
    <div
      className="flex justify-center pointer fw-semiBold"
      style={{
        fontSize: 24,
      }}
    >
      <div
        style={{ color: activeSwitch === "Popular" ? "#000" : "#aeaeae" }}
        onClick={activatePopularSwitch}
      >
        Popular |&nbsp;
      </div>
      <div
        style={{ color: activeSwitch === "New" ? "#000" : "#aeaeae" }}
        onClick={activateNewSwitch}
      >
        New
      </div>
    </div>
  );
}
