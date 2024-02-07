'use client'
import TwoD from "@/components/2d";
import Experience from "@/components/Experience";
import { useControls } from "leva";
import { useState } from "react";

export default function Home() {
  const { stepHeight, stepWidth, stepDepth, numSteps } = useControls({
    stepHeight: {
      value: 2,
      min: 1,
      max: 5,
      step: 0.5,
    },
    stepWidth: 4,
    stepDepth: 4,
    numSteps: {
      value: 4,
      min: 1,
      max: 10,
      step: 1,
    },
  });
  const [color, setColor] = useState('black');
  return (
    <div className="w-screen h-screen flex ">
      <TwoD
        stepWidth={stepWidth}
        stepHeight={stepHeight}
        numSteps={numSteps}
        stepDepth={stepDepth}
        color={color}
      />
      <Experience 
        colorSetCallback={setColor}
        stepWidth={stepWidth}
        stepHeight={stepHeight}
        numSteps={numSteps}
        stepDepth={stepDepth}
      />
    </div>
  );
}
