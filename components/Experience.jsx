"use client";
import {
  OrbitControls,
  PresentationControls,
  Stage,
  Box,
} from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import palettes from "nice-color-palettes";
import { useControls } from "leva";

const Experience = ({stepHeight, stepWidth, stepDepth, numSteps, colorSetCallback}) => {
  const [color, setColor] = useState("#FED86B");
  const [showMenu, setShowMenu] = useState({ state: "hidden", x: 0, y: 0 });
  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full bg-black flex items-center justify-center text-white text-9xl">
            Loading...
          </div>
        }
      >
        <Canvas className="w-full h-full">
          <PresentationControls>
            <Stage preset={"portrait"} environment={"city"}>
              {Array(Math.floor(numSteps))
                .fill(null)
                .map((_, i) => (
                  <Box
                    position={[0, i * stepHeight, i * -stepDepth - (stepDepth * (numSteps - i) * 0.5)]}
                    args={[stepWidth, stepHeight, stepDepth * (numSteps - i)]}
                    onClick={(e) =>
                      setShowMenu({
                        state: "visible",
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }
                  >
                    {" "}
                    <meshPhysicalMaterial color={color} />
                  </Box>
                ))}
            </Stage>
          </PresentationControls>
          {/* <OrbitControls /> */}
          {/* <CameraRig /> */}
          <BackGround color={color} />
        </Canvas>
        {showMenu.state === "visible" ? (
          <ColorMenu
            x={showMenu.x}
            y={showMenu.y}
            callback={setColor}
            hideCallback={setShowMenu}
            colorSetCallback={colorSetCallback}
          />
        ) : (
          <></>
        )}
      </Suspense>
    </div>
  );
};

const ColorMenu = ({ x, y, callback, hideCallback, colorSetCallback }) => {
  const colors = palettes[Math.floor(Math.random() * palettes.length)];
  return (
    <div
      className="w-auto h-auto bg-[#18181818] p-4 rounded-xl absolute z-30 text-white"
      style={{ top: y, left: x }}
    >
      {colors.map((value, index) => {
        return (
          <button
            key={index}
            className={
              "bg-purple-100 w-16 h-16 m-4 rounded-[4rem] cursor-pointer"
            }
            style={{
              background: `linear-gradient(to bottom, ${value}, grey)`,
            }}
            onClick={() => {callback(value); colorSetCallback(value)}}
            title={value}
          ></button>
        );
      })}
      <button
        className="text-white font-bold text-sm"
        onClick={() => hideCallback((prev) => ({ ...prev, state: "hidden" }))}
      >
        ✕
      </button>
    </div>
  );
};

const BackGround = ({ color }) => {
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial side={THREE.BackSide}>
        <Color color="#444" alpha={1} mode="normal" />
        <Depth
          colorA={color}
          colorB="black"
          alpha={0.5}
          mode="normal"
          near={0}
          far={300}
          origin={[100, 100, 100]}
        />
      </LayerMaterial>
    </mesh>
  );
};

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.lerp(
      v.set(Math.sin(t / 5), 0, 6 + Math.cos(t / 5) / 2),
      0.05,
    );
    state.camera.lookAt(0, 0, 0);
  });
}

export default Experience;
