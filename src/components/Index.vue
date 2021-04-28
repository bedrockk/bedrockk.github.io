<template>
  <div id="base">
    <Particles id="space" :options="{
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
                      src: require('@/assets/bdk.png')
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
    <p class="mctext" style="margin-bottom: 30px; font-size: 1.5em">Projects</p>
  </div>
</template>

<script>
import * as Three from 'three'
import Github from 'github-api'

export default {
  name: 'Index',
  methods: {
    init() {
      let base = document.getElementById('scene');

      this.camera = new Three.PerspectiveCamera(75, base.clientWidth / base.clientHeight, 0.01, 5);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.5, 0.5, 0.5);
      let texture = new Three.TextureLoader().load(require("@/assets/bdk.png"));
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
    const base = document.getElementById('base');

    org.getRepos((err, list) => {
      if (err === null) {
        for(const repo of list) {
          if (repo.name !== 'bedrockk.github.io'){
            let div = document.createElement('div');
            let p = document.createElement('p');
            let a = document.createElement('a');
            div.classList.add('repo');
            p.classList.add('mctext');
            a.href = 'https://github.com/bedrockk/' + repo.name;
            a.innerText = repo.name;
            a.style.color = 'white';
            p.append(a);
            p.append(' : ' + repo.description);

            div.append(p);
            base.append(div);
          }
        }
      }
    })
  }
}
</script>

<style>
#base {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

#space {
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
  max-width: 50%;
  border: 5px solid white;
  margin: 20px auto 20px auto;
  z-index: -1;
}

.mctext {
  font-family: 'MinecraftiaRegular', sans-serif;
  color: white;
  font-style: normal;
  text-align: center;
}

</style>
