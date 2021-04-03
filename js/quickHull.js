/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Felipe Andrés Alvarez Avaria <alu0100969535@ull.edu.es>
 * @file quickHull implementation for browser
 */
'use strict';

import {quickHull, generatePoints} from '../src/quick-hull.js';

/**
 *
 *
 */
function clearCanvas() {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 *
 *
 * @param {*} points
 */
function printPoints(points) {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
      ctx.stroke();
    });
  } else {
    alert('Your browser doesn\'t have canvas support.\n' +
        'Please, update your browser and try again.');
  }
}

/**
 *
 *
 * @param {*} polygon
 */
function printConvexHull(polygon) {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const startingPoint = polygon[0];
    ctx.beginPath();
    ctx.moveTo(startingPoint.x, startingPoint.y);
    polygon.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
  } else {
    alert('Your browser doesn\'t have canvas support.\n' +
        'Please, update your browser and try again.');
  }
}

/**
 *
 *
 */
function compute() {
  clearCanvas();
  const canvasHeight = 500;
  const canvasWidth = 500;
  const padding = 25;

  const pointCount = prompt('Enter number of random points to generate:\n' +
      '(Recomended: 50+)', '0');
  const points = generatePoints(pointCount, canvasHeight, canvasWidth, padding);

  printPoints(points);
  const qh = quickHull(points);
  const interval = setInterval(() => {
    const result = qh.next();
    if (result.done == true) {
      console.log('done');
      clearInterval(interval);
    }
    clearCanvas();
    printPoints(points);
    printConvexHull(result.value);
  }, 1000);
}

document.getElementById('computeQuickHull').addEventListener('click', compute);
