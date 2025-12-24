type Bounds = { width: number; height: number };

const BASE_GEOMETRY = new Float32Array([
  0, -1, 0, 1, -0.866, 0.5, 0.866, -0.5, 0.866, 0.5, -0.866, -0.5,
]);

const DEG_TO_RAD = Math.PI / 180;

const randomInRange = ([min, max]: [number, number]) =>
  min + Math.random() * (max - min);

export class Snowflake {
  private bounds: Bounds;
  private readonly sizeRange: [number, number];
  private readonly speedRange: [number, number];
  private readonly rotationSpeedRange: [number, number];
  private rotationSpeed: number;
  private x: number;
  private y: number;
  private size: number;
  private speed: number;
  private rotation: number;
  private readonly transformedVertices = new Float32Array(BASE_GEOMETRY.length);

  constructor(
    private readonly gl: WebGL2RenderingContext,
    private readonly buffer: WebGLBuffer,
    opts: {
      bounds: Bounds;
      sizeRange: [number, number];
      speedRange: [number, number];
      rotationSpeedRange: [number, number];
    },
  ) {
    const { bounds, sizeRange, speedRange, rotationSpeedRange } = opts;
    this.bounds = bounds;
    this.sizeRange = sizeRange;
    this.speedRange = speedRange;
    this.rotationSpeedRange = rotationSpeedRange;

    this.x = 0;
    this.y = 0;
    this.size = sizeRange[0];
    this.speed = speedRange[0];
    this.rotation = 0;
    this.rotationSpeed = 0;

    this.respawn(true);
  }

  private respawn(isInitial: boolean) {
    this.size = randomInRange(this.sizeRange);
    this.speed = randomInRange(this.speedRange);
    this.rotationSpeed = randomInRange(this.rotationSpeedRange);
    this.rotation = Math.random() * 360;
    this.x = Math.random() * Math.max(1, this.bounds.width);
    this.y = isInitial
      ? Math.random() * Math.max(1, this.bounds.height)
      : -this.size;
  }

  update(deltaMs: number, bounds: Bounds) {
    this.bounds = bounds;
    this.y += (this.speed * deltaMs) / 1000;
    this.rotation += (this.rotationSpeed * deltaMs) / 1000;

    if (this.y - this.size > this.bounds.height) {
      this.respawn(false);
    }
  }

  render(params: {
    positionLocation: number;
    colorLocation: WebGLUniformLocation | null;
    color: [number, number, number, number];
  }) {
    const { positionLocation, colorLocation, color } = params;
    const cosR = Math.cos(this.rotation * DEG_TO_RAD);
    const sinR = Math.sin(this.rotation * DEG_TO_RAD);

    for (let i = 0; i < BASE_GEOMETRY.length; i += 2) {
      const scaledX = BASE_GEOMETRY[i] * this.size;
      const scaledY = BASE_GEOMETRY[i + 1] * this.size;
      const rotatedX = scaledX * cosR - scaledY * sinR;
      const rotatedY = scaledX * sinR + scaledY * cosR;
      const worldX = this.x + rotatedX;
      const worldY = this.y + rotatedY;

      const clipX =
        this.bounds.width === 0 ? 0 : (worldX / this.bounds.width) * 2 - 1;
      const clipY =
        this.bounds.height === 0 ? 0 : 1 - (worldY / this.bounds.height) * 2;

      this.transformedVertices[i] = clipX;
      this.transformedVertices[i + 1] = clipY;
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      this.transformedVertices,
      this.gl.DYNAMIC_DRAW,
    );
    this.gl.vertexAttribPointer(
      positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0,
    );

    if (colorLocation) {
      this.gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
    }

    const vertexCount = this.transformedVertices.length / 2;
    for (let start = 0; start < vertexCount; start += 2) {
      this.gl.drawArrays(this.gl.LINES, start, 2);
    }
  }
}
