/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Felipe Andrés Alvarez Avaria <alu0100969535@ull.edu.es>
 * @file canvas cube excercise
 */
'use_strict';

/**
 * Prints a cube using using a canvas
 *
 */
function printCube() {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const coords = {
      x: 50,
      y: 250,
      width: 400,
      height: 400,
    };
    const coordsPersp = {
      x: coords.x + 200,
      y: coords.y - 200,
      width: coords.width,
      height: coords.height,
    };
    const ctx = canvas.getContext('2d');
    // First squares
    ctx.beginPath();
    ctx.rect(coords.x, coords.y, coords.width, coords.height);
    // Lines
    ctx.moveTo(coordsPersp.x, coordsPersp.y);
    ctx.lineTo(coordsPersp.x + coordsPersp.width, coordsPersp.y);
    ctx.moveTo(coordsPersp.x + coordsPersp.width, coordsPersp.y);
    ctx.lineTo(coordsPersp.x + coordsPersp.width, coordsPersp.y +
        coordsPersp.height);
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(coordsPersp.x, coordsPersp.y);
    ctx.moveTo(coords.x + coords.width, coords.y);
    ctx.lineTo(coordsPersp.x + coordsPersp.width, coordsPersp.y);
    ctx.moveTo(coords.x + coords.width, coords.y + coords.height);
    ctx.lineTo(coordsPersp.x + coordsPersp.width, coordsPersp.y +
        coordsPersp.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(coordsPersp.x, coordsPersp.y);
    ctx.lineTo(coordsPersp.x, coordsPersp.y + coordsPersp.height);
    ctx.moveTo(coordsPersp.x, coordsPersp.y + coordsPersp.height);
    ctx.lineTo(coords.x, coords.y + coords.height);
    ctx.moveTo(coordsPersp.x, coordsPersp.y + coordsPersp.height);
    ctx.lineTo(coordsPersp.x + coordsPersp.width, coordsPersp.y +
        coordsPersp.height);
    ctx.stroke();
  }
}

printCube();
