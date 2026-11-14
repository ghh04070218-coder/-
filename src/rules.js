export const rules = [
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

export const ruleVersion = "free-1.0.0";
