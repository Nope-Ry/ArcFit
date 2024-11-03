import React, { Suspense, useRef } from "react";
import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import { Asset } from "expo-asset";
import { StyleSheet, View } from "react-native";
import * as THREE from "three";
import * as FileSystem from "expo-file-system";

// import model from '@/assets/models/male.obj';

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

function Model() {
  const [modelPath, setModelPath] = useState<string | null>(null);

  useEffect(() => {
    async function loadModel() {
      const asset = Asset.fromModule(require("../../assets/models/male.obj"));
      await asset.downloadAsync();
      setModelPath(asset.uri);
    }
    loadModel();
  }, []);

  const obj = modelPath ? useLoader(OBJLoader, modelPath) : null;

  return obj ? <primitive object={obj} /> : null;
}

function Scene() {
  return (
    <group>
      <Model />
    </group>
  );
}

export default function BodyScreen() {
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
});
