import { buildReport } from "./report.js";
import { ruleVersion } from "./rules.js";
import { scanText, scoreFindings, buildRewrite, normalize } from "./engine.js";

const scenarioNotes = {
  general: "通用发布建议保留证据来源、删除绝对化表述，并避免承诺结果。",
  commerce: "销售场景要重点检查价格、交付、退款、授权和售后边界。",
  finance: "收益/投资场景必须避免保本、固定收益和诱导性承诺。",
  health: "健康场景不要替代专业医疗建议，不使用疗效保证。",
  education: "教育场景只能做辅导、润色和排版，不能代写或造假。",
  opensource: "开源场景要检查许可证、依赖来源、隐私数据和安全承诺。"
};

const checklistBase = [
  "是否删除“保证、稳赚、零风险、百分百”等绝对化表达？",
  "是否写清楚交付物、适用范围、限制条件和不适用场景？",
  "是否避免收集或公开身份证、手机号、客户名单等敏感信息？",
  "是否确认素材、代码、模板和图片具有原创或授权来源？",
  "是否保留退款、售后、更新频率和人工服务边界？",
  "是否避免暗示平台规避、刷量、造假、代写或违规套利？"
];

const sampleText = `副业风险把控系统，输入任何项目都能联网搜索全网大数据，100%找到所有问题，帮助你稳定月入过万，零风险赚钱。支持批量爬取客户联系方式，自动生成引流私聊话术，保证发布不过审退款。`;

const $ = (id) => document.getElementById(id);

function renderFindings(findings) {
  const target = $("findings");
  if (!findings.length) {
    target.className = "empty-state";
    target.textContent = "未命中高频风险词。仍建议人工检查事实依据、平台规则和授权来源。";
    return;
  }

  target.className = "";
  target.innerHTML = findings
    .map(
      (item) => `
        <article class="finding">
          <div class="tag-row">
            <span class="tag ${item.severity === "high" ? "high" : "mid"}">${item.severity === "high" ? "高风险" : "中风险"}</span>
            <span class="tag">${item.category}</span>
          </div>
          <strong>${item.risk}</strong>
          <p class="quote">命中：${item.hits.join("、")}</p>
          <p>${item.fix}</p>
        </article>
      `
    )
    .join("");
}

function renderRewrites(text, findings) {
  const target = $("rewrites");
  if (!normalize(text)) {
    target.className = "empty-state";
    target.textContent = "暂无建议。";
    return;
  }

  const rewritten = buildRewrite(text, findings);
  target.className = "";
  target.innerHTML = `
    <article class="rewrite">
      <div class="tag-row">
        <span class="tag low">改写草稿</span>
        <span class="tag">人工复核后使用</span>
      </div>
      <p>把确定性承诺改成能力边界，把敏感采集改成授权输入，把“全网大数据”改成“公开信息与规则库辅助”。</p>
      <textarea readonly></textarea>
    </article>
  `;
  target.querySelector("textarea").value = rewritten;
}

function renderChecklist(scenario) {
  $("checklist").innerHTML = [
    scenarioNotes[scenario],
    ...checklistBase
  ]
    .map(
      (item) => `
        <div class="check-item">
          <span class="check-dot" aria-hidden="true"></span>
          <span>${item}</span>
        </div>
      `
    )
    .join("");
}

function scan() {
  const text = $("content").value;
  const scenario = $("scenario").value;
  const findings = scanText(text, scenario);
  const score = scoreFindings(findings);

  const scoreCard = document.querySelector(".score-card");
  scoreCard.classList.remove("score-low", "score-mid", "score-high");
  scoreCard.classList.add(score.className);

  $("riskLevel").textContent = normalize(text) ? score.label : "待扫描";
  $("riskSummary").textContent = normalize(text)
    ? `${scenarioNotes[scenario]} 共命中 ${findings.length} 个风险点。`
    : "输入文案后生成风险报告。";
  $("issueCount").textContent = findings.length;
  $("rewriteCount").textContent = normalize(text) ? 1 : 0;

  renderFindings(findings);
  renderRewrites(text, findings);
  renderChecklist(scenario);
}

$("scanButton").addEventListener("click", scan);
$("clearButton").addEventListener("click", () => {
  $("content").value = "";
  scan();
});
$("sampleButton").addEventListener("click", () => {
  $("scenario").value = "finance";
  $("content").value = sampleText;
  scan();
});
$("scenario").addEventListener("change", scan);

renderChecklist("general");

$("exportButton").addEventListener("click", () => {
  const text = $("content").value;
  if (!normalize(text)) { $("riskSummary").textContent = "请先输入待扫描文本。"; return; }
  scan();
  const scenario = $("scenario").value;
  const report = buildReport(text, scenario, scanText(text, scenario), ruleVersion, new Date().toISOString());
  const url = URL.createObjectURL(new Blob([report], { type: "text/markdown;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "risklens-report.md";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
