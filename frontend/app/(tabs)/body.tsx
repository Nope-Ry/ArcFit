import React, { Suspense, useRef } from 'react';
import { useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DDSLoader } from "three-stdlib";
import { Asset } from 'expo-asset';
import { StyleSheet, View } from 'react-native';
import * as THREE from "three";


THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


function Scene() {
  const obj = useLoader(OBJLoader, '../../assets/models/male.obj');

  return obj ? <primitive object={obj} /> : null;
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
});