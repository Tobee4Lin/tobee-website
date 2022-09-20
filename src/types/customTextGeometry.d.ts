import { extend, Object3DNode } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

class CustomTextGeometry extends TextGeometry {}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      customTextGeometry: Object3DNode<
        CustomTextGeometry,
        typeof CustomTextGeometry
      >;
    }
  }
}
extend({ CustomTextGeometry });
