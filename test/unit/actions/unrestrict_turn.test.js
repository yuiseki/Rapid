import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import * as Rapid from '../../../modules/headless.js';

test('actionUnrestrictTurn', async t => {
    await t.test('removes a restriction from a restricted turn', () => {
        //
        // u === * --- w
        //
        var graph = new Rapid.Graph([
            Rapid.osmNode({ id: 'u' }),
            Rapid.osmNode({ id: '*' }),
            Rapid.osmNode({ id: 'w' }),
            Rapid.osmWay({ id: '=', nodes: ['u', '*'], tags: { highway: 'residential' } }),
            Rapid.osmWay({ id: '-', nodes: ['*', 'w'], tags: { highway: 'residential' } }),
            Rapid.osmRelation({ id: 'r', tags: { type: 'restriction' }, members: [
                { id: '=', role: 'from', type: 'way' },
                { id: '-', role: 'to', type: 'way' },
                { id: '*', role: 'via', type: 'node' }
            ]})
        ]);
        var action = Rapid.actionUnrestrictTurn({ restrictionID: 'r' });

        const result = action(graph);
        assert.strictEqual(result.hasEntity('r'), undefined);
    });
});