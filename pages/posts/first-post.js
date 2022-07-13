import React, { useRef, useCallback, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { a } from "@react-spring/three";

const edge_w = 1.0;
const edge_h = 1.5;
const levels = 15;
const color = new THREE.Color("rgb(153,90,0)");

// TODO: Debug Why Mesh is not Apprearing in the proper place
// TODO: Remove main page and replace with three

const createNewMesh = (index, ref, color) => {
  const right_mat = new THREE.Matrix4();
  const left_mat = new THREE.Matrix4();
  const new_mat_t0 = new THREE.Matrix4();
  const new_mat_t = new THREE.Matrix4();
  const new_mat_r = new THREE.Matrix4();
  const new_mat_r2 = new THREE.Matrix4();
  const new_mat_s = new THREE.Matrix4();
  const mat2 = new THREE.Matrix4();
  ref.current.getMatrixAt(index, mat2);
  const right_col = color.clone();
  right_col.g += 0.64 / levels;
  new_mat_t0.makeTranslation(edge_w / 2, 0, 0);
  new_mat_t.makeTranslation(0, edge_h, 0);
  new_mat_r.makeRotationZ(-Math.PI / 4);
  new_mat_r2.makeRotationY(Math.PI / 2);
  new_mat_s.makeScale(0.75, 0.75, 0.75);
  right_mat.multiply(new_mat_r2); //
  right_mat.multiply(new_mat_t0);
  right_mat.multiply(new_mat_r);
  right_mat.multiply(new_mat_s);
  right_mat.multiply(new_mat_t);
  right_mat.multiply(mat2);
  const left_col = color.clone();
  left_col.g += 0.64 / levels;
  new_mat_t0.makeTranslation(-edge_w / 2, 0, 0);
  new_mat_t.makeTranslation(0, edge_h, 0);
  new_mat_r.makeRotationZ(Math.PI / 4);
  new_mat_r2.makeRotationY(Math.PI / 2);
  new_mat_s.makeScale(0.75, 0.75, 0.75);
  left_mat.multiply(new_mat_r2); //
  left_mat.multiply(new_mat_t0);
  left_mat.multiply(new_mat_r);
  left_mat.multiply(new_mat_s);
  left_mat.multiply(new_mat_t);
  left_mat.multiply(mat2);
  return { right_mat, right_col, left_mat, left_col };
};
const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  useEffect(() => {
    const baseMatrix = new THREE.Matrix4();
    baseMatrix.makeTranslation(0, -125, 0);
    baseMatrix.setPosition(0, 0, 0);
    ref.current.setMatrixAt(0, baseMatrix);
    for (let i = 1; i < levels; i += 2) {
      const { right_mat, right_col, left_mat, left_col } = createNewMesh(
        i - 1,
        ref,
        color
      );
      ref.current.setMatrixAt(i, right_mat);
      ref.current.setColorAt(i, right_col);
      ref.current.setMatrixAt(i + 1, left_mat);
      ref.current.setColorAt(i + 1, left_col);
    }

    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.instanceColor.needsUpdate = true;
    console.log(ref.current);
  }, [ref]);

  return (
    <a.instancedMesh args={[null, null, 1000]} ref={ref}>
      <boxGeometry args={[edge_w, edge_h, edge_w]} />
      <meshPhongMaterial color={color} />
    </a.instancedMesh>
  );
}

export default function Example() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <CameraController />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
}
