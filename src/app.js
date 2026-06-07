const rules = [
  {
    id: "absolute-income",
    category: "收益承诺",
    severity: "high",
    scenarios: ["finance", "commerce", "general"],
    patterns: ["稳赚", "保证赚钱", "稳定收益", "月入", "躺赚", "零风险", "包回本", "保本"],
    risk: "容易被理解为确定性收益承诺，可能触发广告、平台和金融合规风险。",
    fix: "改成经验分享或工具辅助表达，删除确定性收益承诺，并补充结果因人而异。"
  },
  {
    id: "medical-claim",
    category: "健康医疗",
    severity: "high",
    scenarios: ["health", "general", "commerce"],
    patterns: ["治愈", "根治", "无副作用", "药到病除", "降糖", "降压", "抗癌"],
    risk: "健康相关内容不能随意宣称疗效，尤其不能替代专业诊断或治疗。",
    fix: "改成生活方式记录或非医疗建议，并提示用户咨询专业人士。"
  },
  {
    id: "privacy",
    category: "隐私数据",
    severity: "high",
    scenarios: ["general", "opensource", "commerce"],
    patterns: ["身份证", "手机号", "微信号", "客户名单", "爬取用户", "通讯录", "精准获客"],
    risk: "涉及个人信息收集、处理或公开，可能需要用户授权、最小化采集和安全保护。",
    fix: "说明不收集敏感个人信息；如必须处理，写明授权、用途、保存周期和删除方式。"
  },
  {
    id: "ip-copy",
    category: "知识产权",
    severity: "mid",
    scenarios: ["opensource", "commerce", "general"],
    patterns: ["搬运", "全网同款", "破解", "盗版", "去水印", "仿站", "高仿"],
    risk: "可能涉及版权、商标或不正当竞争问题，影响平台发布和商业化。",
    fix: "强调原创、授权素材或开源许可证来源，避免使用误导性品牌词。"
  },
  {
    id: "platform-abuse",
    category: "平台风控",
    severity: "high",
    scenarios: ["commerce", "general"],
    patterns: ["刷单", "刷赞", "刷粉", "引流私聊", "规避审核", "秒过审", "批量注册"],
    risk: "明显触发平台风控，可能导致限流、下架、封号或交易纠纷。",
    fix: "删除规避平台规则的表达，改成正常内容优化、客服响应或合规运营服务。"
  },
  {
    id: "academic",
    category: "教育诚信",
    severity: "high",
    scenarios: ["education", "general", "commerce"],
    patterns: ["代写", "论文包过", "作业代做", "保录取", "伪造简历", "证书办理"],
    risk: "涉及学术诚信或资料造假，通常违反平台规则和学校/机构规范。",
    fix: "限定为排版、结构建议、语言润色和面试练习，不提供造假或代完成。"
  },
  {
    id: "legal-advice",
    category: "专业建议",
    severity: "mid",
    scenarios: ["general", "finance", "commerce"],
    patterns: ["法律保证", "避税", "灰产", "黑产", "套利漏洞", "百分百安全"],
    risk: "专业领域表达容易形成误导，尤其是法律、税务、金融和平台规则相关内容。",
    fix: "改成信息整理和风险提示，不替代律师、税务师或持牌机构建议。"
  },
  {
    id: "overclaim",
    category: "夸大宣传",
    severity: "mid",
    scenarios: ["general", "commerce", "opensource"],
    patterns: ["最强", "第一", "全网唯一", "永久有效", "官方合作", "100%准确"],
    risk: "绝对化或无法证明的宣传容易造成误导，也可能降低用户信任。",
    fix: "改成可验证范围，例如“适合初步自查”“基于规则库提示”“持续更新”。"
  }
];

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

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

function scanText(text, scenario) {
  const normalized = normalize(text);
  if (!normalized) return [];

  return rules
    .filter((rule) => rule.scenarios.includes(scenario) || rule.scenarios.includes("general"))
    .map((rule) => {
      const hits = rule.patterns.filter((pattern) => normalized.includes(pattern));
      return hits.length ? { ...rule, hits } : null;
    })
    .filter(Boolean);
}

function scoreFindings(findings) {
  const high = findings.filter((item) => item.severity === "high").length;
  const mid = findings.filter((item) => item.severity === "mid").length;
  if (high >= 2 || findings.length >= 5) return { label: "高风险", className: "score-high" };
  if (high === 1 || mid >= 2) return { label: "中风险", className: "score-mid" };
  if (findings.length > 0) return { label: "低风险", className: "score-low" };
  return { label: "较安全", className: "score-low" };
}

function buildRewrite(text, findings) {
  let rewritten = text;
  const replacements = [
    ["100%找到所有问题", "辅助识别常见风险点"],
    ["稳定月入过万", "帮助评估项目可行性"],
    ["零风险赚钱", "降低发布前的信息不对称"],
    ["保证发布不过审退款", "提供发布前自查清单"],
    ["批量爬取客户联系方式", "基于用户主动提供的信息进行分析"],
    ["引流私聊", "合规客服回复"]
  ];

  replacements.forEach(([from, to]) => {
    rewritten = rewritten.split(from).join(to);
  });

  if (findings.some((item) => item.category === "收益承诺")) {
    rewritten += "\n\n提示：本工具只提供风险识别与表达优化建议，不承诺收益结果。";
  }
  if (findings.some((item) => item.category === "隐私数据")) {
    rewritten += "\n提示：请仅处理用户授权提供的信息，不采集敏感个人数据。";
  }
  return rewritten;
}

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
        <span class="tag low">可发布方向</span>
        <span class="tag">人工复核后使用</span>
      </div>
      <p>把确定性承诺改成能力边界，把敏感采集改成授权输入，把“全网大数据”改成“公开信息与规则库辅助”。</p>
      <textarea readonly>${rewritten}</textarea>
    </article>
  `;
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
