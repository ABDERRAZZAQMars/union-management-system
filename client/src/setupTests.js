import '@testing-library/jest-dom';

const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    const msg = String(args[0] || '');
    if (msg.includes('not wrapped in act') || msg.includes('ReactDOMTestUtils.act')) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args) => {
    const msg = String(args[0] || '');
    if (msg.includes('React Router Future Flag Warning')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});