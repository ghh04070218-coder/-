import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scanText, scoreFindings, buildRewrite } from '../src/engine.js';
test('empty and unmatched input never imply approval', () => {
  assert.deepEqual(scanText('  ', 'general'), []);
  assert.equal(scoreFindings([]).label, '未命中已收录规则');
});
test('scenario filtering respects explicit membership', () => {
  assert.equal(scanText('稳赚', 'finance')[0].id, 'absolute-income');
  assert.equal(scanText('稳赚', 'health').length, 0);
  assert.equal(scanText('治愈', 'health')[0].id, 'medical-claim');
});
test('rewrite remains plain text including markup', () => {
  const input = '</textarea><img src=x onerror=alert(1)>';
  assert.equal(buildRewrite(input, []), input);
});
