"use client";
import React, { useEffect, useRef } from "react";
import { useControls } from "leva";

const TwoD = ({
  stepHeight,
  stepWidth,
  stepDepth,
  numSteps,
  riserThickness,
  treadThickness,
  nosing,
  material,
}) => {
  const canvas = useRef();
  const offset = 500;
  const drawStep = (ctx, i) => {
    ctx.strokeRect(
      i * stepDepth,
      -i * stepHeight + offset - treadThickness,
      riserThickness,
      stepHeight,
    ); // riser
    ctx.strokeRect(
      i * stepDepth - nosing,
      -i * stepHeight + offset - treadThickness * 2,
      stepDepth + nosing,
      treadThickness,
    ); // tread
  };
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = canvas.current.clientWidth;
    canvas.current.height = canvas.current.clientHeight;
    
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    for (let i = 0; i < numSteps; i++) {
      drawStep(ctx, i);
    }
  }, [
    stepHeight,
    stepWidth,
    stepDepth,
    numSteps,
    riserThickness,
    treadThickness,
    nosing,
    material,
  ]);

  return (
    <div className="w-full h-full p-20">
      <canvas ref={canvas} className="w-full h-full"></canvas>
    </div>
  );
};

export default TwoD;
