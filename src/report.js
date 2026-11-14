export function buildReport(text, scenario, findings, version, timestamp) {
  const lines = ['# RiskLens CN 自查报告', '', `扫描时间：${timestamp}`, `规则版本：${version}`, `场景：${scenario}`, '', '## 输入原文', ''];
  // Blockquote every line so user content cannot close a Markdown code fence.
  lines.push(...text.split(/\r?\n/).map(line => '> ' + line), '', '## 命中证据与建议', '');
  findings.forEach(item => lines.push(`### ${item.category}`, `命中：${item.hits.join('、')}`, `说明：${item.risk}`, `建议：${item.fix}`, ''));
  if (!findings.length) lines.push('未命中已收录规则。');
  lines.push('', '本报告仅为规则提示，不是法律、医疗、投资或平台审核结论。未命中不表示安全，须人工复核。');
  return lines.join('\n');
}
