<template>
  <div id="base">
    <Particles id="tsparticles" :options="{
            background: {
                color: {
                    value: '#000'
                }
            },
            fpsLimit: 60,
            particles: {
                color: {
                    value: 'random'
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outMode: 'out',
                    random: true,
                    speed: 3.223,
                    straight: true
                },
                number: {
                    density: {
                        enable: true,
                        value_area: 200
                    },
                    value: 50
                },
                opacity: {
                    value: 'random'
                },
                shape: {
                    image: {
                      height: 300,
                      width: 300,
                      replace_color: true,
                      src: 'bdk.png'
                    },
                    type: 'image'
                },
                size: {
                    random: true,
                    value: 5
                },
                trail: {
                    enable: true
                }
            },
            detectRetina: true
        }"/>
    <h1 class="mctext" style="font-size: 3em; font-weight: bold; margin-bottom: 0;">Bedrockk</h1>
    <p class="mctext">bedrock like rock</p>
    <div id="scene"></div>
    <p class="mctext" style="margin-bottom: 30px; font-size: 1.5em">Recent Projects</p>
    <div class="repo">
      <p class="mctext" style="font-size: 1em">
        <a v-bind:href='"https://github.com/bedrockk/" + name1' style="color: white;">{{ name1 }}</a>: {{ desc1 }}
      </p>
    </div>
    <div class="repo">
      <p class="mctext" style="font-size: 1em">
        <a v-bind:href='"https://github.com/bedrockk/" + name2' style="color: white;">{{ name2 }}</a>: {{ desc2 }}
      </p>
    </div>
  </div>
</template>

<script>
import * as Three from 'three'
import Github from 'github-api'

export default {
  name: 'Index',
  data() {
    return {
      name1: 'unknown',
      name2: 'unknown',
      desc1: 'unknown',
      desc2: 'unknown',
    }
  },
  methods: {
    init() {
      let base = document.getElementById('scene');

      this.camera = new Three.PerspectiveCamera(75, base.clientWidth / base.clientHeight, 0.01, 5);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
      let texture = new Three.TextureLoader().load("bdk.png");
      let material = new Three.MeshBasicMaterial({map: texture});

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true});
      this.renderer.setSize(base.clientWidth, base.clientHeight);
      this.renderer.setAnimationLoop(this.animate);
      base.appendChild(this.renderer.domElement);

      window.addEventListener('resize', () => {
        this.camera.aspect = base.clientWidth / base.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(base.clientWidth, base.clientHeight);
      }, false);
    },
    animate() {
      this.mesh.rotateX(0.002);
      this.mesh.rotateY(0.005);
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();

    const gh = new Github();
    const org = gh.getOrganization('bedrockk');

    org.getRepos((err, list) => {
      if (err === null) {
        if (list[0] !== null) {
          this.name1 = list[0].name;
          this.desc1 = list[0].description;
        }

        if (list[1] !== null) {
          this.name2 = list[1].name;
          this.desc2 = list[1].description;
        }
      }
    })
  }
}
</script>

<style scoped>
#base {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

#tsparticles {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -2;
}

#scene {
  position: relative;
  width: 50%;
  height: 50vh;
  left: 25%;
  z-index: 1;
}

.repo {
  height: auto;
  width: auto;
  border: 5px solid white;
  margin: 20px 20px 20px 20px;
  z-index: -1;
}

.mctext {
  font-family: 'MinecraftiaRegular', sans-serif;
  color: white;
  font-style: normal;
  text-align: center;
}

</style>
