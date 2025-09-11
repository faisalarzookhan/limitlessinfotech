import '@testing-library/jest-dom';
import 'whatwg-fetch'; // Polyfills fetch, Request, Response, Headers

// Mock TextEncoder, which is used by jose for JWT signing/verification
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock for Next.js Image component if needed in other tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => 'NextImageMock',
}));

// Mock for next/headers if needed
jest.mock('next/headers', () => ({
  headers: () => ({
    get: jest.fn(),
  }),
}));

// Mock for next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => {
      return {
        json: () => Promise.resolve(body),
        status: init?.status || 200,
        headers: new Headers(init?.headers),
      };
    }),
  },
}));
