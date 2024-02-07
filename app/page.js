"use client";
import Topveiw from "@/components/Topveiw";
import { Experience } from "@/components/Experience";
import { useControls } from "leva";
import Sideveiw from "@/components/Sideview";

export default function Home() {
  const {
    stepHeight,
    stepWidth,
    stepDepth,
    numSteps,
    riserThickness,
    treadThickness,
    nosing,
    material,
  } = useControls({
    stepHeight: { value: 40, min: 10, max: 100, step: 1 },
    stepDepth: { value: 60, min: 50, max: 150, step: 1 },
    stepWidth: { value: 700, min: 655, max: 1000, step: 10 },
    numSteps: { value: 4, min: 1, max: 10, step: 1 },
    riserThickness: { value: 10, min: 6, max: 60, step: 1 },
    treadThickness: { value: 10, min: 6, max: 60, step: 1 },
    nosing: { value: 20, min: 16, max: 50, step: 1 },
    material: { value: "rubber", options: ["rubber", "marbel", "wood"] },
  });
  return (
    <div className="w-screen h-screen flex gap-2 p-2 overflow-hidden">
      <div className="flex flex-col w-1/2 gap-2">
        <Sideveiw
          className="w-full h-1/2 bg-gray-100 p-4 rounded-xl"
          stepWidth={stepWidth}
          stepHeight={stepHeight}
          numSteps={numSteps}
          stepDepth={stepDepth}
          riserThickness={riserThickness}
          treadThickness={treadThickness}
          nosing={nosing}
          material={material}
        />
        <Topveiw
          className="w-full h-1/2 bg-gray-200 p-4 rounded-xl"
          stepWidth={stepWidth}
          stepHeight={stepHeight}
          numSteps={numSteps}
          stepDepth={stepDepth}
          riserThickness={riserThickness}
          treadThickness={treadThickness}
          nosing={nosing}
          material={material}
        />
      </div>
      <Experience
        className="w-1/2 h-full rounded-xl bg-gray-400"
        stepWidth={stepWidth}
        stepHeight={stepHeight}
        numSteps={numSteps}
        stepDepth={stepDepth}
        riserThickness={riserThickness}
        treadThickness={treadThickness}
        nosing={nosing}
        material={material}
      />
    </div>
  );
}
