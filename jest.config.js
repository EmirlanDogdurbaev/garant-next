const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./", // Путь к корню вашего приложения
});

const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
        "^swiper/(.*)$": "<rootDir>/__mocks__/swiperMock.js",


    },
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(swiper|ssr-window|dom7)/)",
    ],

};

module.exports = createJestConfig(customJestConfig);
