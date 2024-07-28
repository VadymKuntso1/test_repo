<template>
  <canvas ref="canvas" id="my-canvas" width="1000" height="1000"></canvas>
</template>

<script>
import { Delaunay } from 'd3-delaunay';
import { generatePoints } from '../utils/generatePoints.ts';
import { generateRandomRGBColor } from '../utils/generateRandomColor.ts';

  export default {
    name: "MainPage",
    data(){
      return{
        paths: [],
        ctx: null,
        widthCoefficient: 250,
        heightCoefficient: 250,
        animateStatus: 'up',
        points: []
      }
    },
    mounted() {
      // Defines the initial values for points and render canvas with it
      this.ctx = this.$refs.canvas.getContext('2d');
      this.points = generatePoints();

      const delaunay = Delaunay.from(this.points);
      const voronoi = delaunay.voronoi([0, 0, 500, 500]);

      for (let i = 0; i < 50; i++) {
        const polygons = voronoi.cellPolygon(i);
        this.paths.push({polygons, color: generateRandomRGBColor()});
        this.generatePolygon(this.ctx);
      }

      this.runAnimate(this.ctx);
    },
    methods: {
      generatePolygon(width = 0) {
        // Function to rewrite canvas with new points settings
        this.ctx.clearRect(0, 0, 1000, 1000);
        this.paths.map((value) => {
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'white';
          this.ctx.lineWidth = width * 0.3;
          value.polygons.forEach((point, i) => {
            if (i === 0) {
              this.ctx.moveTo(point[0]+this.widthCoefficient, point[1]+this.heightCoefficient);
            } else {
              this.ctx.lineTo(point[0]+this.widthCoefficient, point[1]+this.heightCoefficient);
            }
          });
          this.ctx.closePath();
          this.ctx.fillStyle = value.color;
          this.ctx.fill();
          this.ctx.stroke();
        })
      },
      runAnimate() {
        // Check animate status end call method to write
        setTimeout(()=>{
          if (this.animateStatus === 'down') {
            this.runAnimateDown(50);
          } else {
            this.runAnimateUp(0);
          }
          this.runAnimate();
          return () =>{ console.log('end');  }
        }, 1600)

      },
      runAnimateUp(i) {
        // Growing animation
        if (i > 50 ) {
          return
        }
        const timeout = setTimeout(() => {
          this.paths.map((value, index) => {
            let coords = [];
            value.polygons.forEach((point) => {
              const newX = this.widthCoefficient + (point[0] - this.widthCoefficient) * 1.01;
              const newY = this.heightCoefficient + (point[1] - this.widthCoefficient) * 1.01;
              coords.push([newX, newY]);
            })
            this.paths[index] = {...value, polygons: coords};
          })
          this.generatePolygon(i);
          this.runAnimateUp(i+1);
          this.animateStatus = 'down';
          return () => clearTimeout(timeout);
        }, 30)
      },
      runAnimateDown(i) {
        // Reduction animation
        if (i < 0 ) {
          return
        }
        const timeout = setTimeout(() => {
          this.paths.map((value, index) => {
            let coords = [];
            value.polygons.forEach((point) => {
              const newX = this.widthCoefficient + (point[0] - this.widthCoefficient) / 1.01;
              const newY = this.heightCoefficient + (point[1] - this.widthCoefficient) / 1.01;
              coords.push([newX, newY]);
            })
            this.paths[index] = {...value, polygons: coords};
          })
          this.generatePolygon(i);
          this.runAnimateDown(i-1);
          this.animateStatus = 'up';
          return () => clearTimeout(timeout);
        }, 30)
      }
    }
  }
</script>

<style>

</style>