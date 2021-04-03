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

const GREY = '#404040';
const WHITE = '#FFFFFF';
const BROWN = '#583813';

/**
 *
 *
 * @param {*} boardCoords
 */
function printOutline(ctx, boardCoords) {
  const xBoard = boardCoords.x;
  const yBoard = boardCoords.y;
  const widthBoard = boardCoords.width;
  const heightBoard = boardCoords.height;

  const outLineSize = 5;

  const outLineStart = {
    x: xBoard - outLineSize,
    y: yBoard - outLineSize,
  };
  ctx.beginPath();
  ctx.fillStyle = WHITE;
  ctx.rect(outLineStart.x, outLineStart.y,
      widthBoard + outLineSize * 2, heightBoard + outLineSize * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = BROWN;
  ctx.moveTo(outLineStart.x, outLineStart.y);
  ctx.lineWidth = 1;
  ctx.rect(outLineStart.x, outLineStart.y,
      widthBoard + outLineSize * 2, heightBoard + outLineSize * 2);
  ctx.rect(xBoard, yBoard,
      widthBoard, heightBoard);
  ctx.stroke();
}

/**
 * Prints a cube using using a canvas
 *
 */
function printBoard() {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const chessBoardSquares = 8;
    const padding = 2;

    // Make background
    ctx.fillStyle = BROWN;
    ctx.fillRect(0, 0, width, height);
    // Print outline
    const boardCoords = {
      x: width / (chessBoardSquares + padding),
      y: height / (chessBoardSquares + padding),
      width: width / (chessBoardSquares + padding) * 8,
      height: height / (chessBoardSquares + padding) * 8,
    };
    printOutline(ctx, boardCoords);

    for (let i = 0; i < chessBoardSquares; i++) {
      for (let j = 0; j < chessBoardSquares; j++) {
        const squareWidth = width / (chessBoardSquares + padding);
        const squareHeight = height / (chessBoardSquares + padding);
        const startX = squareWidth + squareWidth * j;
        const startY = squareHeight + squareHeight * i;

        ctx.beginPath();
        ctx.fillStyle = [WHITE, BROWN][(i + j) % 2];
        ctx.fillRect(startX, startY, squareWidth, squareHeight);
        ctx.closePath();
      }
    }
  }
}

printBoard();
