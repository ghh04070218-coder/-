import { rules } from "./rules.js";

export function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

export function scanText(text, scenario) {
  const normalized = normalize(text);
  if (!normalized) return [];

  return rules
    .filter((rule) => rule.scenarios.includes(scenario))
    .map((rule) => {
      const hits = rule.patterns.filter((pattern) => normalized.includes(pattern));
      return hits.length ? { ...rule, hits } : null;
    })
    .filter(Boolean);
}

export function scoreFindings(findings) {
  const high = findings.filter((item) => item.severity === "high").length;
  const mid = findings.filter((item) => item.severity === "mid").length;
  if (high >= 2 || findings.length >= 5) return { label: "高风险", className: "score-high" };
  if (high === 1 || mid >= 2) return { label: "中风险", className: "score-mid" };
  if (findings.length > 0) return { label: "低风险", className: "score-low" };
  return { label: "未命中已收录规则", className: "score-low" };
}

export function buildRewrite(text, findings) {
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

