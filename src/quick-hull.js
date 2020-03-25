/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Felipe Andrés Alvarez Avaria <alu0100969535@ull.edu.es>
 * @file Combines data from different modules and writes to a json file
 */

'use strict';

/**
 *
 *
 * @param {*} points
 */
function getMinMaxPoints(points) {
  let minPointX = points[0];
  let maxPointX = points[0];
  let minPointY = points[0];
  let maxPointY = points[0];

  points.forEach((point) => {
    if (point.x < minPointX.x) {
      minPointX = point;
    } else if (point.x > maxPointX.x) {
      maxPointX = point;
    }
    if (point.y < minPointY.y) {
      minPointY = point;
    } else if (point.y > maxPointY.y) {
      maxPointY = point;
    }
  });

  return [minPointX, maxPointX, minPointY, maxPointY];
}

/**
 *
 *
 * @param {*} point1
 * @param {*} point2
 */
function distanceFromTo(point1, point2) {
  const termA = Math.pow(point2.x - point1.x, 2);
  const termB = Math.pow(point2.y - point1.y, 2);

  return Math.sqrt(termA + termB);
}

/**
 *
 *
 * @param {*} points
 */
function getFarthestAwayPoints(points) {
  let maxDistance = 0;
  const indexes = [];
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = distanceFromTo(points[i], points[j]);
      if (distance > maxDistance) {
        maxDistance = distance;
        indexes[0] = i;
        indexes[1] = j;
      }
    }
  }
  return [
    points[indexes[0]],
    points[indexes[1]],
  ];
}

/**
 * Calculates the distance of a point from a line
 * @param {Array} line - Array of two points [ [x,y], [x,y] ]
 * @param {Array} point - Array [x,y]
 * @tutorial https://stackoverflow.com/a/6853926
 */
function distanceFromLineTo(line, point) {
  /* const diffX = line[1].x - line[0].x;
  const diffY = line[1].y - line[0].y;
  const termA = line[1].x * line[0].y;
  const termB = line[0].x * line[1].y;
  const numerator =
      Math.abs((diffY * point.x) - (diffX * point.y) + termA - termB);


  const termC = Math.pow(diffY, 2);
  const termD = Math.pow(diffX, 2);
  const denominator = Math.sqrt(termC + termD);

  return numerator / denominator;*/

  const A = point.x - line[0].x;
  const B = point.y - line[0].y;
  const C = line[1].x - line[0].x;
  const D = line[1].y - line[0].y;

  const dot = A * C + B * D;
  const lengthSquared = C * C + D * D;
  let param = -1;
  if (lengthSquared != 0) { // in case of 0 length line
    param = dot / lengthSquared;
  }

  let xx; let yy;

  if (param < 0) {
    xx = line[0].x;
    yy = line[0].y;
  } else if (param > 1) {
    xx = line[1].x;
    yy = line[1].y;
  } else {
    xx = line[0].x + param * C;
    yy = line[0].y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Removes points from array
 *
 * @param {*} array
 * @param {*} points
 */
function removePoints(array, points) {
  const result = array.filter((point) => {
    for (let i = 0; i < points.length; i++) {
      if (point.x === points[i].x && point.y === points[i].y) {
        return false;
      }
    }
    return true;
  });
  return result;
}

/**
 *
 *
 * @param {*} polygon
 * @param {*} points
 * @returns Object with props 0-n where n is number of faces
 */
function assignEachPointToFace(polygon, points) {
  const result = {};
  for (let i = 0; i < polygon.length; i++) {
    result[i] = [];
  }

  for (let i = 0; i < points.length; i++) {
    let minDistance = 1000000000000000;
    let closestLine = 0;
    for (let j = 0; j < polygon.length; j++) {
      const indexB = (j === polygon.length - 1) ? 0 : j + 1;
      const line = [polygon[j], polygon[indexB]];
      const distance = distanceFromLineTo(line, points[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestLine = j;
      }
    }
    result[closestLine].push(points[i]);
  }
  return result;
}

/**
 *
 *
 * @param {*} polygon
 * @param {*} point
 * @tutorial http://alienryderflex.com/polygon/
 */
function isPointInPolygon(polygon, point) {
  let result = false;
  for (let i = 0; i < polygon.length; i++) {
    const indexB = (i === polygon.length - 1) ? 0 : i + 1;
    const boolPart1 = polygon[i].y < point.y && polygon[indexB].y >= point.y;
    const boolPart2 = polygon[indexB].y < point.y && polygon[i].y >= point.y;
    if (boolPart1 || boolPart2) {
      const term1 = polygon[i].x;
      const term2 = (point.y - polygon[i].y) /
          (polygon[indexB].y - polygon[i].y);
      const term3 = (polygon[indexB].x - polygon[i].x);
      if ((term1 + term2 * term3) < point.x) {
        result = !result;
      }
    }
  }
  return result;
}

/**
 *
 *
 * @param {*} points
 */
function* quickHull(points) {
  let result = [];
  let remainingPoints = points.slice();
  // If we only have 3 points, then it's a trivial convex hull
  if (points.length === 3) {
    result = remainingPoints;
    result.push(points[0]); // Closing the polygon
    return result;
  }
  // Search for extreme points (farthest away)
  const extremePoints = getMinMaxPoints(points);
  const farthestAwayPoints = getFarthestAwayPoints(extremePoints);
  remainingPoints = removePoints(remainingPoints, farthestAwayPoints);
  result = farthestAwayPoints.slice();
  yield result;

  // Getting first point
  let maxDistance = 0;
  let firstPoint = undefined;
  remainingPoints.forEach((point) => {
    const line = [result[0], result[1]];
    const distance = distanceFromLineTo(line, point);
    if (distance > maxDistance) {
      maxDistance = distance;
      firstPoint = point;
    }
  });

  result.splice(1, 0, firstPoint); // Insert in middle position
  yield result;
  remainingPoints = removePoints(remainingPoints, [firstPoint]);


  let changes = true;
  while (changes) {
    changes = false;
    // Delete points that are inside our convexHull
    remainingPoints = remainingPoints.filter((point) => {
      return !isPointInPolygon(result, point);
    });
    // Assign each remainingPoint a side of the polygon
    const assignment = assignEachPointToFace(result, remainingPoints);
    let insertedThisIteration = 0;
    let skippedThisIteration = 0;
    const previousResult = result.slice();
    // eslint-disable-next-line guard-for-in
    for (const face in assignment) {
      const points = assignment[face];
      const indexB = (parseInt(face) === previousResult.length - 1) ?
           0 : parseInt(face) + 1;
      const line = [previousResult[face], previousResult[indexB]];

      // Get farther away point from line
      let maxDistance = 0;
      let farthestAwayPoint = {};
      points.forEach((point)=> {
        const distance = distanceFromLineTo(line, point);
        if (distance > maxDistance) {
          maxDistance = distance;
          farthestAwayPoint = point;
        }
      });

      if (maxDistance !== 0) {
        changes = true;
        // Include point in result, but in position
        const index = parseInt(face) + 1 + insertedThisIteration +
            skippedThisIteration;
        result.splice(index, 0, farthestAwayPoint);
        yield result;

        insertedThisIteration++;
        // Delete that point from remainingPoints
        remainingPoints = removePoints(remainingPoints, [farthestAwayPoint]);
      } else {
        skippedThisIteration = 0;
      }
    }
  }
  return result;
}
/**
 *s
 *
 * @param {*} number
 * @param {*} maxHeight
 * @param {*} maxWidth
 */
function generatePoints(number, maxHeight, maxWidth, padding) {
  const result = [];

  for (let i = 0; i < number; i++) {
    const xValue =
        Math.floor(padding + Math.random() * (maxHeight - padding * 2));
    const yValue =
        Math.floor(padding + Math.random() * (maxWidth - padding * 2));
    result.push({x: xValue, y: yValue});
  }

  return result;
}

export {
  quickHull as quickHull,
  generatePoints as generatePoints,
};
