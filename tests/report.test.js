import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReport } from '../src/report.js';
test('report includes provenance and preserves multiline user text as quoted content', () => {
  const result = buildReport('hello\n```\n# injected', 'general', [], 'free-test', '2026-11-14T00:00:00Z');
  assert.ok(result.includes('规则版本：free-test'));
  assert.ok(result.includes('> ```\n> # injected'));
  assert.ok(result.includes('未命中不表示安全'));
});
