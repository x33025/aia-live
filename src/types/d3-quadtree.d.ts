declare module 'd3-quadtree' {
  export interface Quadtree<T> {
    x(): (d: T) => number;
    x(x: (d: T) => number): this;
    y(): (d: T) => number;
    y(y: (d: T) => number): this;
    add(d: T): this;
    addAll(data: T[]): this;
    remove(d: T): this;
    removeAll(data: T[]): this;
    root(): QuadtreeInternalNode<T> | QuadtreeLeafNode<T>;
    data(): T[];
    extent(): [[number, number], [number, number]];
    extent(extent: [[number, number], [number, number]]): this;
    find(x: number, y: number, radius?: number): T | undefined;
    visit(callback: (node: QuadtreeInternalNode<T> | QuadtreeLeafNode<T>, x0: number, y0: number, x1: number, y1: number) => void): this;
    visitAfter(callback: (node: QuadtreeInternalNode<T> | QuadtreeLeafNode<T>, x0: number, y0: number, x1: number, y1: number) => void): this;
  }

  export interface QuadtreeLeafNode<T> {
    data: T;
    next?: QuadtreeLeafNode<T>;
  }

  export interface QuadtreeInternalNode<T> {
    readonly _: number;
    readonly 0?: QuadtreeLeafNode<T> | QuadtreeInternalNode<T>;
    readonly 1?: QuadtreeLeafNode<T> | QuadtreeInternalNode<T>;
    readonly 2?: QuadtreeLeafNode<T> | QuadtreeInternalNode<T>;
    readonly 3?: QuadtreeLeafNode<T> | QuadtreeInternalNode<T>;
  }

  export function quadtree<T>(): Quadtree<T>;
  export function quadtree<T>(data: T[]): Quadtree<T>;
  export function quadtree<T>(data: T[], x: (d: T) => number, y: (d: T) => number): Quadtree<T>;

  
}