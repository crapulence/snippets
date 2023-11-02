/**
 * Overriding interface property
 * https://stackoverflow.com/a/51507473/19092045
 */
interface A {
  x: string;
}

export type B = Omit<A, 'x'> & { x: number };
