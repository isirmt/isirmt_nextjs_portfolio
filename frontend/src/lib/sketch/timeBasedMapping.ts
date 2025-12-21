import { ColorRGB, Vertex2D } from "@/types/sketch/common";

// 線形的に変化させるマッピング関数
export function linearTimeBasedMapping(
  start: number,
  end: number,
  rate: number,
): number {
  return start + (end - start) * rate;
}

// 二次関数的に変化させるマッピング関数
export function quadraticTimeBasedMapping(
  start: number,
  end: number,
  rate: number,
): number {
  const t = rate;
  return start + (end - start) * t * t;
}

// 3次ベジェ曲線的マッピング関数
const BEZIER_NEWTON_ITERATIONS = 8;
const BEZIER_NEWTON_MIN_SLOPE = 0.001;
const BEZIER_SUBDIVISION_PRECISION = 1e-7;
const BEZIER_SUBDIVISION_MAX_ITERATIONS = 10;

const calcBezier = (t: number, a1: number, a2: number) => {
  const c = 3 * a1;
  const b = 3 * (a2 - a1) - c;
  const a = 1 - c - b;
  return ((a * t + b) * t + c) * t;
};

const getBezierSlope = (t: number, a1: number, a2: number) => {
  const c = 3 * a1;
  const b = 3 * (a2 - a1) - c;
  const a = 1 - c - b;
  return 3 * a * t * t + 2 * b * t + c;
};

const getTForX = (x: number, x1: number, x2: number) => {
  let t = x;

  for (let i = 0; i < BEZIER_NEWTON_ITERATIONS; i += 1) {
    const slope = getBezierSlope(t, x1, x2);
    if (Math.abs(slope) < BEZIER_NEWTON_MIN_SLOPE) {
      break;
    }
    const currentX = calcBezier(t, x1, x2) - x;
    t -= currentX / slope;
  }

  if (t >= 0 && t <= 1) {
    return t;
  }

  let t0 = 0;
  let t1 = 1;
  t = x;

  for (let i = 0; i < BEZIER_SUBDIVISION_MAX_ITERATIONS; i += 1) {
    const currentX = calcBezier(t, x1, x2) - x;
    if (Math.abs(currentX) < BEZIER_SUBDIVISION_PRECISION) {
      return t;
    }
    if (currentX > 0) {
      t1 = t;
    } else {
      t0 = t;
    }
    t = (t0 + t1) / 2;
  }

  return t;
};

export function cubicBezierTimeBasedMapping(
  start: number,
  end: number,
  rate: number,
  param: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  },
): number {
  const clampedRate = Math.min(1, Math.max(0, rate));
  const xTime = getTForX(clampedRate, param.x1, param.x2);
  const bezierValue = calcBezier(xTime, param.y1, param.y2);
  return start + (end - start) * bezierValue;
}

// 色の変化の近似に使用可能な二次関数的マッピング関数
export function colorQuadraticTimeBasedMapping(
  start: ColorRGB,
  end: ColorRGB,
  rate: number,
): ColorRGB {
  return [
    quadraticTimeBasedMapping(start[0], end[0], rate),
    quadraticTimeBasedMapping(start[1], end[1], rate),
    quadraticTimeBasedMapping(start[2], end[2], rate),
  ];
}

// 2D頂点の線形的マッピング関数
export function vertex2DLinearTimeBasedMapping(
  start: Vertex2D,
  end: Vertex2D,
  rate: number,
): Vertex2D {
  return {
    x: linearTimeBasedMapping(start.x, end.x, rate),
    y: linearTimeBasedMapping(start.y, end.y, rate),
  };
}

export function vertex2DQuadraticTimeBasedMapping(
  start: Vertex2D,
  end: Vertex2D,
  rate: number,
): Vertex2D {
  return {
    x: quadraticTimeBasedMapping(start.x, end.x, rate),
    y: quadraticTimeBasedMapping(start.y, end.y, rate),
  };
}

export function vertex2DCubicBezierTimeBasedMapping(
  start: Vertex2D,
  end: Vertex2D,
  rate: number,
  param: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  },
): Vertex2D {
  return {
    x: cubicBezierTimeBasedMapping(start.x, end.x, rate, param),
    y: cubicBezierTimeBasedMapping(start.y, end.y, rate, param),
  };
}
