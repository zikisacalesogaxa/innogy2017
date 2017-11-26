"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const greet_1 = require("../greet");
describe('testing', () => {
    it('returns a greeting with the name arguement', (done) => {
        assert.equal('Hello Cale', greet_1.default('Cale'));
        done();
    });
});
