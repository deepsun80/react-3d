import { TextureLoader, RepeatWrapping } from "three";
import { useThree } from "react-three-fiber";

function SkyBox() {
 const { scene } = useThree();
 const loader = new TextureLoader();
 const texture = loader.load("/spaceBg3.png");
 // texture.wrapS = RepeatWrapping;
 // texture.wrapT = RepeatWrapping;
 // texture.repeat.set(2, 2);

 scene.background = texture;
 return null;
}

export default SkyBox;