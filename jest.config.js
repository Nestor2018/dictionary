const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y .env files
  dir: './',
});

// Configuración personalizada de Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Maneja las importaciones de módulos
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
  },
};

// createJestConfig se exporta de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js
module.exports = createJestConfig(customJestConfig);