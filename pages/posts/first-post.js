import React, { useRef, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { a } from '@react-spring/three'

const edge_w = 100;
const edge_h = 150;
const levels = 6;
const color = new THREE.Color("rgb(153,90,0)");


// TODO: Convert Cubes to brown. Add them in order of Pythogaras Three
// TODO: Add Tailwind with scss
// TODO: Remove main page and replace with three



const isServer = typeof window === "undefined";
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
//   const tree = useCallback(
//     (n, mat, c) => {
//       if (n > 0) {
//         var new_mat = new THREE.Matrix4();
//         var new_mat2 = new THREE.Matrix4();
//         var new_mat_t0 = new THREE.Matrix4();
//         var new_mat_t = new THREE.Matrix4();
//         var new_mat_r = new THREE.Matrix4();
//         var new_mat_r2 = new THREE.Matrix4();
//         var new_mat_s = new THREE.Matrix4();
//         var mat2 = mat.clone();
//         var col1 = c.clone();
//         var col2 = c.clone();
//         //col1.offsetHSL(0.12,0,0);
//         col1.g += 0.64 / levels;
//         const material = new THREE.MeshPhongMaterial({
//           color: col1,
//           wireframe: false,
//         });
//         ref.current.mesh = new THREE.Mesh(ref.current.geometry, material);
//         new_mat_t0.makeTranslation(edge_w / 2, 0, 0);
//         new_mat_t.makeTranslation(0, edge_h, 0);
//         new_mat_r.makeRotationZ(-Math.PI / 4);
//         new_mat_r2.makeRotationY(Math.PI / 2);
//         new_mat_s.makeScale(0.75, 0.75, 0.75);
//         new_mat.multiply(new_mat_r2); //
//         new_mat.multiply(new_mat_t0);
//         new_mat.multiply(new_mat_r);
//         new_mat.multiply(new_mat_s);
//         new_mat.multiply(new_mat_t);
//         new_mat.multiply(mat);
//         ref.current.matrix.copy(new_mat);
//         ref.current.matrixAutoUpdate = false;
//         ref.current.updateMatrix = false; //
//         scene.add(ref.current.mesh);
//         tree(n - 1, ref.current.matrix.clone(), col1);

//         //col2.offsetHSL(0.12,0,0);
//         col2.g += 0.64 / levels;
//         material = new THREE.MeshPhongMaterial({
//           color: col2,
//           wireframe: false,
//         });
//         ref.current.mesh = new THREE.Mesh(geometry, material);
//         new_mat_t0.makeTranslation(-edge_w / 2, 0, 0);
//         new_mat_t.makeTranslation(0, edge_h, 0);
//         new_mat_r.makeRotationZ(Math.PI / 4);
//         new_mat_r2.makeRotationY(Math.PI / 2);
//         new_mat_s.makeScale(0.75, 0.75, 0.75);
//         new_mat2.multiply(new_mat_r2); //
//         new_mat2.multiply(new_mat_t0);
//         new_mat2.multiply(new_mat_r);
//         new_mat2.multiply(new_mat_s);
//         new_mat2.multiply(new_mat_t);
//         new_mat2.multiply(mat);
//         ref.current.matrix.copy(new_mat2);
//         ref.current.matrixAutoUpdate = false;
//         ref.current.updateMatrix = false; //
//         scene.add(ref.current.mesh);
//         tree(n - 1, ref.current.matrix.clone(), col2);
//       }
//     },
//     [ref]
//   );
  useEffect(() => {
    const baseMatrix = new THREE.Matrix4()
    // baseMatrix.makeTranslation(0,-125,0);
    // baseMatrix.setPosition(-1.2, 0, 0);
    ref.current.setMatrixAt(0,baseMatrix)
    ref.current.instanceMatrix.needsUpdate = true;
    // ref.current.instanceColor.needsUpdate = true;
    // ref.current.material.needsUpdate = true;
    console.log(ref.current);
    // tree(levels,ref.current.matrix,color)
    // ref.current.matrixAutoUpdate = false;
    
  }, [ref]);

  return (
    <a.instancedMesh args={[null, null, 1000]} ref={ref}>
      <boxGeometry args={[edge_w, edge_h, edge_w]} />
      <meshPhongMaterial color={color} />
    </a.instancedMesh>
  );
}
const tempBoxes = new THREE.Object3D();

const Boxes = ({ i = 350, j= 350 }) => {
  const material = new THREE.MeshLambertMaterial({ color: "red" });
  const boxesGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
  const ref = useRef();

  useFrame(({ clock }) => {
    let counter = 0;
    const t = clock.oldTime * 0.001;
    for (let x = 0; x < i; x++) {
      for (let z = 0; z < j; z++) {
        const id = counter++;
        tempBoxes.position.set(i / 2 - x, 0, j / 2 - z);
        tempBoxes.rotation.y = t;
        tempBoxes.updateMatrix();
        ref.current.setMatrixAt(id, tempBoxes.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[boxesGeometry, material, i * j]} />;
};
function Thing() {
    return (
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>
    )
  }
export default function Example() {
  return ( 
    // FIXME: Add body margin and full width
    <div style={{height: '100vh', width: '100vw'}}>
    <Canvas>
        {/* <PerspectiveCamera makeDefault  /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Boxes />
      {/* <Thing/> */}
    </Canvas>

    </div>
  );
}
