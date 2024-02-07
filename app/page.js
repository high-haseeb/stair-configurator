"use client";
import TwoD from "@/components/2d";
import { Experience } from "@/components/Experience";
import { useControls } from "leva";
import { useState } from "react";

export default function Home() {
  const { stepHeight, stepWidth, stepDepth, numSteps, riserThickness, treadThickness, nosing, material } = useControls({
    stepHeight: {value: 40,min: 10,max: 100,step: 1,},
    stepDepth: {value: 60,min: 50,max: 150,step: 1,},
    stepWidth:  {value: 700,min: 655,max: 1000,step: 10,},
    numSteps: {value: 4,min: 1,max: 10,step: 1,},
    riserThickness: { value: 10, min: 6,  max: 60, step: 1},
    treadThickness: { value: 10, min: 6,  max: 60, step: 1},
    nosing:         { value: 20, min: 16, max: 50, step: 1},
    material: { value: 'rubber', options: [ 'rubber', 'marbel', 'wood' ]}
  });
  const [color, setColor] = useState("black");
  return (
    <div className="w-screen h-screen flex ">
      <TwoD
        stepWidth={stepWidth}
        stepHeight={stepHeight}
        numSteps={numSteps}
        stepDepth={stepDepth}
        riserThickness={riserThickness}
        treadThickness={treadThickness}
        nosing={nosing}
        material={material}
      />
      <Experience
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
