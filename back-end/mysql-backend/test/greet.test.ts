import * as assert from 'assert';
import greet from '../greet';

describe('testing', () => {

    it('returns a greeting with the name arguement', (done: any) => {
        assert.equal('Hello Cale', greet('Cale'));
        done()
    });

});
