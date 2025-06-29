import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GUI } from "dat.gui";

const shader_paths = {
  rain: "/shaders/rain.frag",
  snow: "/shaders/snow.frag",
  clouds: "/shaders/clouds.frag",
};


interface ShaderSettings {
  uniforms: { [key: string]: THREE.IUniform & { type?: string } };
  scale: number;
  init?: (mat: THREE.ShaderMaterial) => Promise<void> | void;
}

const effectConfigs: Record<string, ShaderSettings> = {
  rain: {
    uniforms: {
      u_time: { value: 0, type: "f" },
      u_tex0: { value: undefined, type: "t" },
      u_blur: { value: true, type: "b" },
      u_intensity: { value: 0.4, type: "f" },
      u_speed: { value: 0.25, type: "f" },
      u_brightness: { value: 0.75, type: "f" },
      u_normal: { value: 0.5, type: "f" },
      u_zoom: { value: 2.61, type: "f" },
      u_panning: { value: false, type: "b" },
      u_post_processing: { value: true, type: "b" },
      u_lightning: { value: false, type: "b" },
      u_mouse: { value: new THREE.Vector4(), type: "v4" },
      u_resolution: { value: new THREE.Vector2(), type: "v2" },
      u_tex0_resolution: { value: new THREE.Vector2(), type: "v2" },
    },
    scale: 1,
    async init(mat) {
      const img = await new THREE.TextureLoader().loadAsync(
        "/media/rain_mountain.webp"
      );
      mat.uniforms.u_tex0.value = img;
      mat.uniforms.u_tex0_resolution.value = new THREE.Vector2(
        img.image.width,
        img.image.height
      );
    },
  },
  snow: {
    uniforms: {
      u_time: { value: 0, type: "f" },
      u_tex0: { value: undefined, type: "t" },
      u_depth: { value: 1.0, type: "f" },
      u_width: { value: 0.3, type: "f" },
      u_speed: { value: 0.6, type: "f" },
      u_layers: { value: 32, type: "i" },
      u_blur: { value: true, type: "b" },
      u_brightness: { value: 0.75, type: "f" },
      u_post_processing: { value: true, type: "b" },
      u_mouse: { value: new THREE.Vector4(), type: "v4" },
      u_resolution: { value: new THREE.Vector2(), type: "v2" },
      u_tex0_resolution: { value: new THREE.Vector2(), type: "v2" },
    },
    scale: 0.75,
    async init(mat) {
      const img = await new THREE.TextureLoader().loadAsync(
        "/media/snow_tree.webp"
      );
      mat.uniforms.u_tex0.value = img;
      mat.uniforms.u_tex0_resolution.value = new THREE.Vector2(
        img.image.width,
        img.image.height
      );
    },
  },
  clouds: {
    uniforms: {
      u_time: { value: 0, type: "f" },
      u_fog: { value: true, type: "b" },
      u_speed: { value: 0.25, type: "f" },
      u_scale: { value: 0.61, type: "f" },
      u_color1: { value: new THREE.Color("#87b0b7"), type: "c" },
      u_fog_color: { value: new THREE.Color("#0f1c1c"), type: "c" },
      u_brightness: { value: 0.75, type: "f" },
      u_mouse: { value: new THREE.Vector4(), type: "v4" },
      u_resolution: { value: new THREE.Vector2(), type: "v2" },
    },
    scale: 0.25,
  },
};

const simpleVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

type BackgroundProps = React.HTMLAttributes<HTMLElement> & {
  effect?: string;
  textureUrl?: string;
  useDefaultTexture?: boolean;
  debug?: boolean;
};

THREE.Cache.enabled = true;

const cache: Partial<Record<string, string>> = {};

async function loadShaderCode(name: string): Promise<string> {
  if (cache[name]) return cache[name]!;
  
  try {
    const response = await fetch(shader_paths[name]);
    const source = await response.text();
    cache[name] = source;
    return source;
  } catch (err) {
    console.error(`Failed to load shader: ${name}`, err);
    return "void main() { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }";
  }
}

const PRT = 2;

export default function ThreeDBackground({
  effect = "rain",
  textureUrl,
  useDefaultTexture = true,
  debug = false,
  ...props
}: BackgroundProps) {
  const viewerDiv = useRef<HTMLDivElement>(null);
  const guiInstance = useRef<GUI | null>(null);

  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.OrthographicCamera | null>(null);
  const shaderMaterial = useRef<THREE.ShaderMaterial | null>(null);
  const timer = useRef(new THREE.Clock());

  const updateCanvasSize = () => {
    const currentRenderer = renderer.current;
    const currentMaterial = shaderMaterial.current;
    if (!currentRenderer || !currentMaterial) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, PRT);
    currentRenderer.setSize(window.innerWidth, window.innerHeight);
    currentRenderer.setPixelRatio(pixelRatio * effectConfigs[effect].scale);

    currentMaterial.uniforms.u_resolution.value = new THREE.Vector2(
      window.innerWidth * pixelRatio,
      window.innerHeight * pixelRatio
    );
  };

  const animate = () => {
    const currentRenderer = renderer.current;
    const currentScene = scene.current;
    const currentCamera = camera.current;
    const currentMaterial = shaderMaterial.current;
    
    if (!currentRenderer || !currentScene || !currentCamera || !currentMaterial) return;

    currentMaterial.uniforms.u_time.value = timer.current.getElapsedTime();
    currentRenderer.render(currentScene, currentCamera);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (viewerDiv.current) {
      const nRenderr   = new THREE.WebGLRenderer({ antialias: false });
      renderer.current = nRenderr;
  
      viewerDiv.current.innerHTML = "";
      viewerDiv.current.appendChild(nRenderr.domElement);
  
      const newScene = new THREE.Scene();
      scene.current  = newScene;
  
      const newCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      camera.current = newCam;
  
      window.addEventListener("resize", updateCanvasSize);
      
      return () => {
        window.removeEventListener("resize", updateCanvasSize);
        nRenderr.dispose();
        guiInstance.current?.destroy();
        
        if (
          viewerDiv.current &&
          nRenderr.domElement.parentElement === viewerDiv.current
        ) {
          viewerDiv.current.removeChild(nRenderr.domElement);
        }
      };
    }
  }, []);

  useEffect(() => {
    const setupEffect = async () => {
      const currentScene = scene.current;
      if (!currentScene) return;

      currentScene.clear();
      shaderMaterial.current?.dispose();

      const config = effectConfigs[effect];
      const fragShader = await loadShaderCode(effect);
      
      const material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(config.uniforms),
        vertexShader: simpleVertexShader,
        fragmentShader: fragShader,
      });
      shaderMaterial.current = material;

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      currentScene.add(plane);

      if (useDefaultTexture) {
        await config.init?.(material);
      }

      if (!useDefaultTexture && !textureUrl && material.uniforms.u_tex0) {
        const blankTexture = new THREE.DataTexture(
          new Uint8Array([0, 0, 0, 0]),
          1,
          1
        );
        blankTexture.needsUpdate = true;
        material.uniforms.u_tex0.value = blankTexture;
        
        if (material.uniforms.u_tex0_resolution) {
          material.uniforms.u_tex0_resolution.value = new THREE.Vector2(1, 1);
        }
      }

      if (textureUrl && material.uniforms.u_tex0) {
        new THREE.TextureLoader().load(textureUrl, (loadedTexture) => {
          material.uniforms.u_tex0.value = loadedTexture;
          
          if (material.uniforms.u_tex0_resolution) {
            material.uniforms.u_tex0_resolution.value = new THREE.Vector2(
              loadedTexture.image.width,
              loadedTexture.image.height
            );
          }
        });
      }

      timer.current = new THREE.Clock();
      updateCanvasSize();

      guiInstance.current?.destroy();
      const debugGui = new GUI();
      guiInstance.current = debugGui;
      
      Object.entries(material.uniforms).forEach(([key, uniform]) => {
        if (typeof uniform.value === "number") {
          debugGui.add(uniform, "value", -10, 10, 0.01).name(key);
        } else if (typeof uniform.value === "boolean") {
          debugGui.add(uniform, "value").name(key);
        }
      });
      
      debugGui[debug ? 'show' : 'hide']();

      if (
        renderer.current &&
        !renderer.current.domElement.dataset.running
      ) {
        renderer.current.domElement.dataset.running = "true";
        animate();
      }
    };

    setupEffect();
  }, [effect, textureUrl, useDefaultTexture]);

  useEffect(() => {
    if (guiInstance.current) {
      guiInstance.current[debug ? 'show' : 'hide']();
    }
  }, [debug]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }} {...props}>
      <div ref={viewerDiv} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}