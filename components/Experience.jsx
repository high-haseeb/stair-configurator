"use client";
import {
  PresentationControls,
  Stage,
  Box,
  RoundedBox,
  useTexture,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

export const Experience = ({
  stepHeight,
  stepWidth,
  stepDepth,
  numSteps,
  riserThickness,
  treadThickness,
  nosing,
  material,
  ...props
}) => {
  return (
    <div {...props}>
      <Suspense
        fallback={
          <div className="w-full h-full bg-black flex items-center justify-center text-white text-9xl">
            Loading...
          </div>
        }
      >
        <div className="m-4">3d veiw</div>
        <Canvas className="w-full h-full">
          <PresentationControls>
            <Stage preset={"portrait"} environment={"city"}>
              <Stair
                stepHeight={stepHeight}
                stepWidth={stepWidth}
                stepDepth={stepDepth}
                numSteps={numSteps}
                riserThickness={riserThickness}
                treadThickness={treadThickness}
                nosing={nosing}
                material={material}
              />
            </Stage>
          </PresentationControls>
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
};

const Stair = ({
  stepHeight,
  stepWidth,
  stepDepth,
  numSteps,
  riserThickness,
  treadThickness,
  nosing,
  material,
}) => {
  const treadMaterial = useTexture({
    map: "/laminate_floor/textures/laminate_floor_02_disp_1k.jpg",
    normalMap: "/laminate_floor/textures/laminate_floor_02_nor_gl_1k.jpg",
    aoMap: "/laminate_floor/textures/laminate_floor_02_arm_1k.jpg",
    roughnessMap: "/laminate_floor/textures/laminate_floor_02_arm_1k.jpg",
    displacementMap: "/laminate_floor/textures/laminate_floor_02_disp_1k.jpg",
  });
  const wood = useTexture({
    map: "wood_floor/textures/wood_floor_disp_1k.jpg",
    normalMap: "wood_floor/textures/wood_floor_nor_gl_1k.jpg",
    aoMap: "wood_floor/textures/wood_floor_arm_1k.jpg",
    roughnessMap: "wood_floor/textures/wood_floor_rough_1k.jpg",
    displacementMap: "wood_floor/textures/wood_floor_disp_1k.jpg",
  });
  return (
    <>
      {Array(Math.floor(numSteps))
        .fill(null)
        .map((_, i) => (
          <>
            <Box
              position={[
                0,
                (i * stepHeight) + (i * treadThickness), 
                i * -stepDepth,
              ]}
              args={[stepWidth, stepHeight, riserThickness]}
            >
              {material === "wood" ? (
                <meshStandardMaterial {...wood} />
              ) : (
                <meshStandardMaterial {...treadMaterial} />
              )}
            </Box>
            <RoundedBox
              radius={5}
              position={[
                0,
                (i * stepHeight) + (stepHeight/2) + (i * treadThickness) + (treadThickness / 2), 
                (i * stepDepth * -1) - (stepDepth / 2) + (nosing / 2), //x 
              ]}
              args={[stepWidth, treadThickness, stepDepth + nosing]}
            >
              {material === "wood" ? (
                <meshStandardMaterial {...wood} attach={"material"} />
              ) : (
                <meshStandardMaterial {...treadMaterial} attach={"material"} />
              )}
            </RoundedBox>
          </>
        ))}
    </>
  );
};
