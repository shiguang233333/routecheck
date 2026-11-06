'use strict';

const GROUPS = [
  {
    id: 'global',
    name: '国际服务',
    short: '国际',
    cn: false,
    targets: [
      { id: 'google', name: 'Google', host: 'www.google.com', url: 'https://www.google.com/favicon.ico' },
      { id: 'youtube', name: 'YouTube', host: 'www.youtube.com', url: 'https://www.youtube.com/favicon.ico' },
      { id: 'github', name: 'GitHub', host: 'github.com', url: 'https://github.com/favicon.ico' },
      { id: 'github-api', name: 'GitHub API', host: 'api.github.com', url: 'https://api.github.com/zen' },
      { id: 'cloudflare', name: 'Cloudflare', host: 'www.cloudflare.com', url: 'https://www.cloudflare.com/favicon.ico' },
      { id: 'telegram', name: 'Telegram', host: 'telegram.org', url: 'https://telegram.org/favicon.ico' },
      { id: 'x', name: 'X', host: 'x.com', url: 'https://x.com/favicon.ico' },
      { id: 'wikipedia', name: 'Wikipedia', host: 'www.wikipedia.org', url: 'https://www.wikipedia.org/favicon.ico' },
      { id: 'bbc', name: 'BBC', host: 'www.bbc.com', url: 'https://www.bbc.com/favicon.ico' }
    ]
  },
  {
    id: 'ai',
    name: 'AI 服务',
    short: 'AI',
    cn: false,
    targets: [
      { id: 'chatgpt', name: 'ChatGPT', host: 'chatgpt.com', url: 'https://chatgpt.com/favicon.ico' },
      { id: 'claude', name: 'Claude', host: 'claude.ai', url: 'https://claude.ai/favicon.ico' },
      { id: 'gemini', name: 'Gemini', host: 'gemini.google.com', url: 'https://gemini.google.com/favicon.ico' },
      { id: 'perplexity', name: 'Perplexity', host: 'www.perplexity.ai', url: 'https://www.perplexity.ai/favicon.ico' },
      { id: 'huggingface', name: 'Hugging Face', host: 'huggingface.co', url: 'https://huggingface.co/favicon.ico' }
    ]
  },
  {
    id: 'stream',
    name: '流媒体',
    short: '影视',
    cn: false,
    targets: [
      { id: 'netflix', name: 'Netflix', host: 'www.netflix.com', url: 'https://www.netflix.com/favicon.ico' },
      { id: 'spotify', name: 'Spotify', host: 'open.spotify.com', url: 'https://open.spotify.com/favicon.ico' },
      { id: 'disney', name: 'Disney+', host: 'www.disneyplus.com', url: 'https://www.disneyplus.com/favicon.ico' },
      { id: 'twitch', name: 'Twitch', host: 'www.twitch.tv', url: 'https://www.twitch.tv/favicon.ico' }
    ]
  },
  {
    id: 'social',
    name: '社交平台',
    short: '社交',
    cn: false,
    targets: [
      { id: 'facebook', name: 'Facebook', host: 'www.facebook.com', url: 'https://www.facebook.com/favicon.ico' },
      { id: 'instagram', name: 'Instagram', host: 'www.instagram.com', url: 'https://www.instagram.com/favicon.ico' },
      { id: 'whatsapp', name: 'WhatsApp', host: 'www.whatsapp.com', url: 'https://www.whatsapp.com/favicon.ico' },
      { id: 'reddit', name: 'Reddit', host: 'www.reddit.com', url: 'https://www.reddit.com/favicon.ico' },
      { id: 'discord', name: 'Discord', host: 'discord.com', url: 'https://discord.com/favicon.ico' },
      { id: 'signal', name: 'Signal', host: 'signal.org', url: 'https://signal.org/favicon.ico' }
    ]
  },
  {
    id: 'cn',
    name: '国内服务',
    short: '国内',
    cn: true,
    targets: [
      { id: 'baidu', name: '百度', host: 'www.baidu.com', url: 'https://www.baidu.com/favicon.ico' },
      { id: 'bilibili', name: '哔哩哔哩', host: 'www.bilibili.com', url: 'https://www.bilibili.com/favicon.ico' },
      { id: 'taobao', name: '淘宝', host: 'www.taobao.com', url: 'https://www.taobao.com/favicon.ico' },
      { id: 'zhihu', name: '知乎', host: 'www.zhihu.com', url: 'https://www.zhihu.com/favicon.ico' },
      { id: 'jd', name: '京东', host: 'www.jd.com', url: 'https://www.jd.com/favicon.ico' },
      { id: 'wechat', name: '微信', host: 'weixin.qq.com', url: 'https://weixin.qq.com/favicon.ico' },
      { id: 'qq', name: 'QQ', host: 'www.qq.com', url: 'https://www.qq.com/favicon.ico' },
      { id: 'douyin', name: '抖音', host: 'www.douyin.com', url: 'https://www.douyin.com/favicon.ico' },
      { id: 'xiaohongshu', name: '小红书', host: 'www.xiaohongshu.com', url: 'https://www.xiaohongshu.com/favicon.ico' },
      { id: 'weibo', name: '微博', host: 'weibo.com', url: 'https://weibo.com/favicon.ico' },
      { id: 'alipay', name: '支付宝', host: 'www.alipay.com', url: 'https://www.alipay.com/favicon.ico' },
      { id: 'rail12306', name: '12306', host: 'www.12306.cn', url: 'https://www.12306.cn/index/images/favicon.ico' }
    ]
  }
];

const EXIT_PROVIDERS = [
  {
    id: 'ipify',
    name: 'ipify',
    host: 'api64.ipify.org',
    url: 'https://api64.ipify.org?format=json',
    parse: data => ({ ip: data.ip })
  },
  {
    id: 'ipwho',
    name: 'ipwho.is',
    host: 'ipwho.is',
    url: 'https://ipwho.is/',
    parse: data => {
      if (data.success === false) throw new Error('rejected');
      return {
        ip: data.ip,
        cc: data.country_code,
        country: data.country,
        city: data.city,
        asn: data.connection && data.connection.asn ? `AS${data.connection.asn}` : '',
        org: (data.connection && (data.connection.org || data.connection.isp)) || ''
      };
    }
  },
  {
    id: 'ipinfo',
    name: 'ipinfo.io',
    host: 'ipinfo.io',
    url: 'https://ipinfo.io/json',
    parse: data => {
      const org = splitOrg(data.org);
      return { ip: data.ip, cc: data.country, city: data.city, asn: org.asn, org: org.org };
    }
  },
  {
    id: 'ipsb',
    name: 'ip.sb',
    host: 'api.ip.sb',
    url: 'https://api.ip.sb/geoip',
    parse: data => ({
      ip: data.ip,
      cc: data.country_code,
      country: data.country,
      city: data.city,
      asn: data.asn ? `AS${data.asn}` : '',
      org: data.asn_organization || data.organization || ''
    })
  },
  {
    id: 'ipapiis',
    name: 'ipapi.is',
    host: 'api.ipapi.is',
    url: 'https://api.ipapi.is',
    parse: data => {
      const org = splitOrg(data.asn);
      return {
        ip: data.ip,
        cc: guessCountryCode(data.country),
        country: data.country,
        city: data.city,
        asn: org.asn,
        org: org.org || data.company || ''
      };
    }
  },
  {
    id: 'ipquery',
    name: 'ipquery.io',
    host: 'api.ipquery.io',
    url: 'https://api.ipquery.io/?format=json',
    parse: data => ({
      ip: data.ip,
      cc: data.location && data.location.country_code,
      country: data.location && data.location.country,
      city: data.location && data.location.city,
      asn: (data.isp && data.isp.asn) || '',
      org: (data.isp && (data.isp.org || data.isp.isp)) || ''
    })
  },
  {
    id: 'ipip',
    name: 'ipip.net',
    host: 'myip.ipip.net',
    url: 'https://myip.ipip.net/json',
    region: 'cn',
    parse: data => {
      if (data.ret !== 'ok' || !data.data || !data.data.ip) throw new Error('bad');
      const location = data.data.location || [];
      const country = location[0] || '';
      return {
        ip: data.data.ip,
        cc: guessCountryCode(country),
        country,
        city: location[2] || location[1] || '',
        asn: '',
        org: location[4] || ''
      };
    }
  },
  {
    id: 'pconline',
    name: 'pconline',
    host: 'whois.pconline.com.cn',
    url: 'https://whois.pconline.com.cn/ipJson.jsp',
    jsonp: true,
    region: 'cn',
    parse: data => {
      if (!data || !data.ip) throw new Error('bad');
      const rawRegion = String(data.pro || data.province || '').trim();
      const city = String(data.city || '').trim();
      let cc = guessCountryCode(rawRegion);
      let country = rawRegion;

      if (/^台湾/.test(rawRegion)) {
        cc = 'TW';
        country = '台湾';
      } else if (/^香港/.test(rawRegion)) {
        cc = 'HK';
        country = '香港';
      } else if (/^澳门/.test(rawRegion)) {
        cc = 'MO';
        country = '澳门';
      } else if (isChineseRegion(rawRegion)) {
        cc = 'CN';
        country = '中国';
      }

      return {
        ip: data.ip,
        cc,
        country: country || String(data.addr || '').trim(),
        city: city || (isChineseRegion(rawRegion) ? rawRegion : ''),
        asn: '',
        org: String(data.addr || data.region || '').trim()
      };
    }
  }
];

const TONE_CLASSES = ['tone-ok', 'tone-near', 'tone-far', 'tone-bad', 'tone-idle'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const state = {
  scanning: false,
  runId: 0,
  active: new Set(),
  targets: [],
  exits: [],
  scanSet: null,
  startedAt: null,
  finishedAt: null,
  stopped: false
};

const monitorState = {
  running: false,
  timer: null,
  pending: false,
  samples: [],
  url: '',
  bag: new Set(),
  everStarted: false,
  session: 0
};

const scope = {
  canvas: null,
  ctx: null,
  w: 0,
  h: 0,
  shown: [],
  animating: false,
  raf: 0,
  hover: -1,
  geom: null
};

const els = {};

function cached(id) {
  return document.getElementById(id);
}

function cacheElements() {
  els.headerLed = cached('header-led');
  els.headerState = cached('header-state');
  els.scanButtons = Array.from(document.querySelectorAll('.js-scan'));
  els.screenLed = cached('screen-led');
  els.screenState = cached('screen-state');
  els.screenProgress = cached('screen-progress');
  els.screenNote = cached('screen-note');
  els.scope = cached('scope');
  els.scopeWrap = document.querySelector('.scope-wrap');
  els.scopeEmpty = cached('scope-empty');
  els.scopeDetail = cached('scope-detail');
  els.heroTargetCount = cached('hero-target-count');
  els.heroExitCount = cached('hero-exit-count');
  els.selectionCount = cached('selection-count');
  els.selectionHint = cached('selection-hint');
  els.selectAll = cached('select-all');
  els.selectNone = cached('select-none');
  els.roExits = cached('ro-exits');
  els.roReach = cached('ro-reach');
  els.roCn = cached('ro-cn');
  els.roIntl = cached('ro-intl');
  els.verdictLed = cached('verdict-led');
  els.verdictTitle = cached('verdict-title');
  els.verdictNote = cached('verdict-note');
  els.exitSummary = cached('exit-summary');
  els.targetSummary = cached('target-summary');
  els.monitorInput = cached('monitor-url');
  els.monitorToggle = cached('monitor-toggle');
  els.monitorEffective = cached('monitor-effective');
  els.monitorLast = cached('monitor-last');
  els.monitorUnit = document.querySelector('.monitor-unit');
  els.monitorTag = cached('monitor-tag');
  els.monitorChart = cached('monitor-chart');
  els.monitorMin = cached('monitor-min');
  els.monitorAvg = cached('monitor-avg');
  els.monitorMax = cached('monitor-max');
  els.monitorLoss = cached('monitor-loss');
  els.toast = cached('toast');
}

/* ---------- generic helpers ---------- */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function setTone(el, tone) {
  el.classList.remove(...TONE_CLASSES);
  el.classList.add(`tone-${tone}`);
}

function infer(best) {
  if (best == null) return { tone: 'bad', label: '超时' };
  if (best <= 90) return { tone: 'ok', label: '可能直连' };
  if (best <= 250) return { tone: 'near', label: '就近' };
  return { tone: 'far', label: '远端' };
}

function splitOrg(value) {
  if (!value) return { asn: '', org: '' };
  const match = String(value).match(/^(AS\d+)\s+(.*)$/i);
  if (match) return { asn: match[1].toUpperCase(), org: match[2] };
  return { asn: '', org: String(value) };
}

function ipFamily(ip) {
  return String(ip).includes(':') ? 6 : 4;
}

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(['zh-CN'], { type: 'region' });
  } catch {
    return null;
  }
})();

function countryName(code, fallback) {
  if (code && regionNames) {
    try {
      const name = regionNames.of(String(code).toUpperCase());
      if (name) return name;
    } catch {
      /* ignore */
    }
  }
  return fallback || code || '';
}

function flagEmoji(code) {
  if (!code || !/^[a-z]{2}$/i.test(String(code))) return '';
  return String.fromCodePoint(
    ...String(code).toUpperCase().split('').map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65)
  );
}

function guessCountryCode(name) {
  const known = {
    中国: 'CN',
    美国: 'US',
    日本: 'JP',
    韩国: 'KR',
    新加坡: 'SG',
    英国: 'GB',
    德国: 'DE',
    法国: 'FR',
    加拿大: 'CA',
    澳大利亚: 'AU',
    荷兰: 'NL',
    俄罗斯: 'RU',
    印度: 'IN',
    巴西: 'BR',
    土耳其: 'TR',
    泰国: 'TH',
    马来西亚: 'MY',
    印度尼西亚: 'ID',
    越南: 'VN',
    菲律宾: 'PH',
    中国香港: 'HK',
    中国台湾: 'TW',
    China: 'CN',
    'United States': 'US',
    Japan: 'JP',
    'South Korea': 'KR',
    Singapore: 'SG',
    'United Kingdom': 'GB',
    Germany: 'DE',
    France: 'FR',
    Canada: 'CA',
    Australia: 'AU',
    Netherlands: 'NL',
    Russia: 'RU',
    India: 'IN',
    Brazil: 'BR',
    Turkey: 'TR',
    Thailand: 'TH',
    Malaysia: 'MY',
    Indonesia: 'ID',
    Vietnam: 'VN',
    Philippines: 'PH',
    'Hong Kong': 'HK',
    Taiwan: 'TW',
    香港: 'HK',
    澳门: 'MO'
  };
  return known[name] || '';
}

function isChineseRegion(name) {
  return /^(北京|天津|上海|重庆|河北|山西|辽宁|吉林|黑龙江|江苏|浙江|安徽|福建|江西|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|内蒙古|广西|西藏|宁夏|新疆)/.test(name);
}

function normalizeUrl(raw) {
  let value = String(raw || '').trim();
  if (!value) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) value = `https://${value}`;
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(url.protocol) || !url.hostname) return null;
  if ((url.pathname === '/' || url.pathname === '') && !url.search && !url.hash) {
    url.pathname = '/favicon.ico';
  }
  return url.toString();
}

function cacheBust(url) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('_rc', `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`);
    return parsed.toString();
  } catch {
    return url;
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}

async function pool(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;
      await worker(item);
    }
  });
  await Promise.all(runners);
}

/* ---------- probing ---------- */

async function probe(url, timeout = 4200, bag = state.active) {
  const controller = new AbortController();
  bag.add(controller);
  const timer = setTimeout(() => controller.abort(), timeout);
  const started = performance.now();
  try {
    await fetch(cacheBust(url), {
      mode: 'no-cors',
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal
    });
    return { ok: true, ms: performance.now() - started };
  } catch {
    return { ok: false, ms: performance.now() - started };
  } finally {
    clearTimeout(timer);
    bag.delete(controller);
  }
}

async function fetchJSON(url, timeout = 7000) {
  const controller = new AbortController();
  state.active.add(controller);
  const timer = setTimeout(() => controller.abort(), timeout);
  const started = performance.now();
  try {
    const response = await fetch(cacheBust(url), {
      cache: 'no-store',
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    const ms = performance.now() - started;
    if (!response.ok) return { ok: false, ms, error: `HTTP ${response.status}` };
    const data = await response.json();
    return { ok: true, ms, data };
  } catch (error) {
    const ms = performance.now() - started;
    return {
      ok: false,
      ms,
      error: error && error.name === 'AbortError' ? '请求超时' : '请求失败'
    };
  } finally {
    clearTimeout(timer);
    state.active.delete(controller);
  }
}

let jsonpSeq = 0;

function loadJsonp(url, timeout = 7000) {
  return new Promise(resolve => {
    const started = performance.now();
    const callbackName = `__routecheckIp${++jsonpSeq}`;
    const script = document.createElement('script');
    let settled = false;

    const finish = (ok, data, error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      script.remove();
      try {
        delete window[callbackName];
      } catch {
        window[callbackName] = undefined;
      }
      resolve({ ok, ms: performance.now() - started, data, error });
    };

    const timer = setTimeout(() => finish(false, null, '请求超时'), timeout);
    window[callbackName] = data => finish(true, data);
    script.async = true;
    script.onerror = () => finish(false, null, '请求失败');

    try {
      const parsed = new URL(url);
      parsed.searchParams.set('callback', callbackName);
      parsed.searchParams.set('_rc', `${Date.now().toString(36)}${jsonpSeq}`);
      script.src = parsed.toString();
    } catch {
      finish(false, null, '请求失败');
      return;
    }

    document.head.appendChild(script);
  });
}

/* ---------- rendering: targets ---------- */

function buildTargets() {
  const wrap = cached('target-groups');
  GROUPS.forEach(group => {
    group.targets.forEach(target => {
      target.group = group;
      target.samples = [];
      target.best = null;
      target.selected = true;
    });

    const section = document.createElement('section');
    section.className = 'tgroup';
    section.setAttribute('role', 'rowgroup');
    section.setAttribute('aria-label', group.name);

    const head = document.createElement('div');
    head.className = 'tgroup-head';
    const name = document.createElement('span');
    name.className = 'tgroup-name';
    name.textContent = group.name;
    const groupMedian = document.createElement('span');
    groupMedian.className = 'tgroup-median';
    groupMedian.textContent = '中位 —';
    head.append(name, groupMedian);
    group.medianEl = groupMedian;
    section.appendChild(head);

    group.targets.forEach(target => {
      const row = document.createElement('div');
      row.className = 'target-row tone-idle';
      row.setAttribute('role', 'row');
      row.dataset.id = target.id;
      row.innerHTML = `
        <label class="pick t-pick">
          <input type="checkbox" checked>
          <span class="pick-box" aria-hidden="true"></span>
        </label>
        <span class="led t-led" aria-hidden="true"></span>
        <div class="t-name"><span class="t-title"></span><span class="t-host"></span></div>
        <span class="tag t-tag">未测</span>
        <span class="t-spark" aria-hidden="true"><i></i><i></i><i></i></span>
        <div class="t-lat"><span class="t-ms is-idle">—</span><span class="t-bar" aria-hidden="true"><i></i></span></div>
      `;
      row.querySelector('.t-title').textContent = target.name;
      row.querySelector('.t-host').textContent = target.host;
      row.setAttribute('aria-label', `${target.name}，尚未探测`);

      target.el = row;
      target.tag = row.querySelector('.t-tag');
      target.ms = row.querySelector('.t-ms');
      target.bar = row.querySelector('.t-bar i');
      target.spark = Array.from(row.querySelectorAll('.t-spark i'));
      target.pickInput = row.querySelector('.pick input');
      target.pickInput.setAttribute('aria-label', `测试 ${target.name}`);
      target.pickInput.addEventListener('change', () => {
        if (state.scanning) {
          target.pickInput.checked = target.selected;
          return;
        }
        target.selected = target.pickInput.checked;
        updateSelectionUi();
        if (!state.scanSet) {
          setTargetIdleState(target);
          syncEmptyScanUi();
        }
      });

      state.targets.push(target);
      section.appendChild(row);
    });

    wrap.appendChild(section);
  });
}

function selectedTargets() {
  return state.targets.filter(target => target.selected);
}

function currentSet() {
  return state.scanSet || selectedTargets();
}

function selectionSetDiffers() {
  if (!state.scanSet) return false;
  const scanned = state.scanSet.map(target => target.id).sort().join('|');
  const selected = selectedTargets().map(target => target.id).sort().join('|');
  return scanned !== selected;
}

function setTargetIdleState(target) {
  target.samples = [];
  target.best = null;
  setTone(target.el, 'idle');
  target.tag.textContent = target.selected ? '未测' : '未选';
  target.ms.textContent = '—';
  target.ms.classList.add('is-idle');
  target.ms.classList.remove('is-bad');
  target.bar.style.width = '0%';
  target.el.classList.toggle('is-unpicked', !target.selected);
  target.spark.forEach(bar => {
    bar.style.height = '2px';
    bar.style.opacity = '0.25';
    bar.classList.remove('is-fail');
  });
  target.el.setAttribute(
    'aria-label',
    `${target.name}，${target.selected ? '尚未探测' : '未选择测试'}`
  );
}

function updateSelectionUi() {
  const selected = selectedTargets();
  const locked = state.scanning;

  els.selectionCount.textContent = `已选 ${selected.length} / ${state.targets.length}`;
  els.selectionHint.hidden = !(state.scanSet && selectionSetDiffers());

  state.targets.forEach(target => {
    if (target.pickInput) {
      target.pickInput.checked = target.selected;
      target.pickInput.disabled = locked;
    }
    target.el.classList.toggle('is-unpicked', !target.selected);
    if (!target.samples.length) {
      target.tag.textContent = target.selected ? '未测' : '未选';
      target.el.setAttribute(
        'aria-label',
        `${target.name}，${target.selected ? '尚未探测' : '未选择测试'}`
      );
    }
  });

  els.selectAll.disabled = locked;
  els.selectNone.disabled = locked;
  els.scanButtons.forEach(button => {
    button.disabled = !state.scanning && selected.length === 0;
  });

  if (!state.scanSet) {
    els.screenProgress.textContent = `${selected.length} 个目标`;
    els.screenNote.textContent = `${selected.length} 个目标 · 每个最多 3 次`;
  }
}

function syncEmptyScanUi() {
  scope.shown = currentSet().map(() => 0);
  scope.hover = -1;
  updateScopeDetail();
  updateGroupMedians();
  updateScreenStats();
  updateScopeEmpty();
  drawScope(false);
}

function setAllSelected(value) {
  if (state.scanning) return;
  state.targets.forEach(target => {
    target.selected = value;
  });
  updateSelectionUi();
  if (!state.scanSet) {
    state.targets.forEach(setTargetIdleState);
    syncEmptyScanUi();
  }
}

function updateTargetView(target) {
  const attempts = target.samples.length;
  const best = target.best;
  const inferred = best != null
    ? infer(best)
    : { tone: attempts ? 'bad' : 'idle', label: attempts ? '超时' : '未测' };

  setTone(target.el, inferred.tone);
  target.tag.textContent = inferred.label;

  if (best != null) {
    target.ms.textContent = String(Math.round(best));
    const unit = document.createElement('span');
    unit.className = 'ms-unit';
    unit.textContent = 'ms';
    target.ms.appendChild(unit);
    target.ms.classList.remove('is-idle', 'is-bad');
  } else {
    target.ms.textContent = '—';
    target.ms.classList.remove('is-bad');
    target.ms.classList.add('is-idle');
  }

  target.bar.style.width = best != null ? `${clamp((best / 600) * 100, 3, 100)}%` : '0%';

  target.spark.forEach((bar, index) => {
    const sample = target.samples[index];
    if (!sample) {
      bar.style.height = '2px';
      bar.style.opacity = '0.25';
      bar.classList.remove('is-fail');
      return;
    }
    bar.style.opacity = '0.85';
    bar.classList.toggle('is-fail', !sample.ok);
    bar.style.height = sample.ok ? `${Math.round(3 + clamp(sample.ms / 600, 0, 1) * 14)}px` : '3px';
  });

  const spoken = best != null
    ? `${Math.round(best)} 毫秒，${inferred.label}`
    : attempts ? '请求超时' : '尚未探测';
  target.el.setAttribute('aria-label', `${target.name}，${spoken}`);
}

function updateGroupMedians() {
  const set = currentSet();
  GROUPS.forEach(group => {
    const values = set
      .filter(target => target.group === group)
      .map(target => target.best)
      .filter(value => value != null);
    const value = median(values);
    group.medianEl.textContent = value == null ? '中位 —' : `中位 ${Math.round(value)}ms`;
  });
}

/* ---------- rendering: exits ---------- */

function buildExits() {
  const list = cached('exit-list');
  state.exits = EXIT_PROVIDERS.map(provider => ({ ...provider, result: null, error: null, ms: null }));

  state.exits.forEach(exit => {
    const row = document.createElement('div');
    row.className = 'exit-row tone-idle';
    row.dataset.id = exit.id;
    row.innerHTML = `
      <span class="led x-led" aria-hidden="true"></span>
      <div class="x-provider">
        <span class="x-name-line"><span class="x-name"></span><span class="x-region"></span></span>
        <span class="x-host"></span>
      </div>
      <div class="x-ip is-empty"><span class="ip-text">—</span></div>
      <div class="x-meta is-empty"><span class="x-geo">等待探测</span><span class="x-org">—</span></div>
      <div class="x-lat">—</div>
    `;
    row.querySelector('.x-name').textContent = exit.name;
    row.querySelector('.x-host').textContent = exit.host;
    const region = row.querySelector('.x-region');
    region.textContent = exit.region === 'cn' ? '国内' : '境外';
    region.classList.toggle('is-cn', exit.region === 'cn');

    exit.el = row;
    exit.ip = row.querySelector('.x-ip');
    exit.ipText = row.querySelector('.ip-text');
    exit.meta = row.querySelector('.x-meta');
    exit.geo = row.querySelector('.x-geo');
    exit.org = row.querySelector('.x-org');
    exit.lat = row.querySelector('.x-lat');

    list.appendChild(row);
  });
}

function renderExit(exit) {
  if (exit.result && exit.result.ip) {
    const place = [...new Set([
      countryName(exit.result.cc, exit.result.country),
      exit.result.city
    ].filter(Boolean))].join(' · ');
    const org = [exit.result.asn, exit.result.org].filter(Boolean).join(' ');

    exit.ipText.textContent = exit.result.ip;
    exit.ip.classList.remove('is-empty');
    exit.geo.textContent = [flagEmoji(exit.result.cc), place].filter(Boolean).join(' ') || '未提供地区信息';
    exit.org.textContent = org || '只返回 IP 地址';
    exit.meta.classList.remove('is-empty');
    exit.lat.innerHTML = `${Math.round(exit.ms)}<span class="ms-unit">ms</span>`;
    exit.lat.classList.remove('is-bad');
  } else if (exit.error) {
    exit.ipText.textContent = '未返回';
    exit.ip.classList.add('is-empty');
    exit.geo.textContent = '查询失败';
    exit.org.textContent = exit.error;
    exit.meta.classList.add('is-empty');
    exit.lat.textContent = '—';
    exit.lat.classList.add('is-bad');
  } else {
    exit.ipText.textContent = '—';
    exit.ip.classList.add('is-empty');
    exit.geo.textContent = '等待探测';
    exit.org.textContent = '—';
    exit.meta.classList.add('is-empty');
    exit.lat.textContent = '—';
    exit.lat.classList.remove('is-bad');
  }
}

function refreshExits() {
  const available = state.exits.filter(exit => exit.result && exit.result.ip);
  const reference = available.length ? available[0].result.ip : null;

  state.exits.forEach(exit => {
    const ip = exit.result && exit.result.ip;
    const different = Boolean(ip && reference && ip !== reference);
    const tone = ip ? (different ? 'far' : 'ok') : (exit.error ? 'bad' : 'idle');

    setTone(exit.el, tone);
    exit.el.classList.toggle('is-diff', different);

    if (different) {
      if (!exit.diffBadge) {
        exit.diffBadge = document.createElement('span');
        exit.diffBadge.className = 'x-diff';
        exit.diffBadge.textContent = '不同 IP';
      }
      if (exit.diffBadge.parentNode !== exit.ip) exit.ip.appendChild(exit.diffBadge);
    } else if (exit.diffBadge && exit.diffBadge.parentNode) {
      exit.diffBadge.remove();
    }

    renderExit(exit);
  });
}

/* ---------- shared stats ---------- */

function groupStats() {
  const set = currentSet();
  const cnTargets = set.filter(target => target.group.cn);
  const intlTargets = set.filter(target => !target.group.cn);
  const bestValues = list => list.map(target => target.best).filter(value => value != null);

  return {
    reach: set.filter(target => target.best != null).length,
    total: set.length,
    cnReach: cnTargets.filter(target => target.best != null).length,
    intlReach: intlTargets.filter(target => target.best != null).length,
    cnTotal: cnTargets.length,
    intlTotal: intlTargets.length,
    cnMed: median(bestValues(cnTargets)),
    intlMed: median(bestValues(intlTargets))
  };
}

function updateScreenStats() {
  const stats = groupStats();
  const available = state.exits.filter(exit => exit.result && exit.result.ip);
  const distinct = new Set(available.map(exit => exit.result.ip)).size;

  els.roExits.textContent = available.length ? String(distinct) : '—';
  els.roReach.textContent = currentSet().some(target => target.samples.length)
    ? `${stats.reach}/${stats.total}`
    : '—';
  els.roCn.textContent = stats.cnMed == null ? '—' : `${Math.round(stats.cnMed)}ms`;
  els.roIntl.textContent = stats.intlMed == null ? '—' : `${Math.round(stats.intlMed)}ms`;
}

/* ---------- scanning ---------- */

function isActive(runId) {
  return state.scanning && state.runId === runId;
}

function setScanButtons(label) {
  els.scanButtons.forEach(button => {
    button.textContent = label;
  });
}

function updateScanProgress(round) {
  const set = state.scanSet || [];
  const done = set.reduce((sum, target) => sum + target.samples.length, 0);
  const total = set.length * 3;
  els.verdictNote.textContent = `第 ${round} / 3 轮 · 已完成 ${done} / ${total} 次请求`;
  els.screenProgress.textContent = `${done} / ${total} 次请求`;
}

function resetResults() {
  state.targets.forEach(setTargetIdleState);

  state.exits.forEach(exit => {
    exit.result = null;
    exit.error = null;
    exit.ms = null;
    exit.el.classList.remove('is-diff');
    setTone(exit.el, 'idle');
    if (exit.diffBadge) {
      exit.diffBadge.remove();
      exit.diffBadge = null;
    }
    renderExit(exit);
  });

  const total = state.scanSet ? state.scanSet.length : selectedTargets().length;

  updateGroupMedians();
  updateScreenStats();
  scope.shown = currentSet().map(() => 0);
  scope.hover = -1;
  updateScopeDetail();
  els.exitSummary.textContent = `正在探测 ${state.exits.length} 个出口服务，结果会逐个出现。`;
  els.targetSummary.textContent = `正在探测 ${total} 个站点，每个最多三次，取最快一次。`;
  els.screenProgress.textContent = `${total} 个目标`;
  els.screenNote.textContent = `${total} 个目标 · 每个最多 3 次`;
}

function setScanningUi() {
  const total = (state.scanSet ? state.scanSet.length : selectedTargets().length) * 3;
  els.headerState.textContent = '扫描中';
  els.headerLed.className = 'led is-busy';
  els.screenState.textContent = '扫描中';
  els.screenLed.className = 'led is-busy';
  els.screenProgress.textContent = `0 / ${total} 次请求`;
  els.verdictLed.className = 'led led-lg is-busy';
  els.verdictTitle.textContent = '正在探测';
  els.verdictNote.textContent = '正在启动探测…';
  els.scopeEmpty.classList.add('is-hidden');
  updateScopeDetail();
}

function startScan() {
  if (state.scanning) {
    stopScan();
    return;
  }

  const selected = selectedTargets();
  if (!selected.length) {
    showToast('至少选择一个站点');
    updateSelectionUi();
    return;
  }

  state.scanSet = selected.slice();
  state.runId += 1;
  const runId = state.runId;
  state.scanning = true;
  state.stopped = false;
  state.startedAt = new Date();
  state.finishedAt = null;

  if (monitorState.running) stopMonitor();

  resetResults();
  setScanButtons('停止');
  setScanningUi();
  updateSelectionUi();
  startScopeAnimation();

  Promise.all([scanExits(runId), scanTargets(runId)])
    .then(() => {
      if (runId === state.runId && state.scanning) finishScan(false);
    })
    .catch(() => {
      if (runId === state.runId && state.scanning) finishScan(false);
    });
}

function stopScan() {
  if (!state.scanning) return;
  state.scanning = false;
  state.runId += 1;
  state.stopped = true;

  state.active.forEach(controller => controller.abort());
  state.active.clear();

  finishScan(true);
}

async function scanExits(runId) {
  await Promise.all(state.exits.map(async exit => {
    if (!isActive(runId)) return;

    const request = () => exit.jsonp
      ? loadJsonp(exit.url, 5000)
      : fetchJSON(exit.url, 5000);

    let response = await request();
    if (!response.ok && isActive(runId)) {
      response = await request();
    }
    if (!isActive(runId)) return;

    if (response.ok) {
      try {
        const parsed = exit.parse(response.data);
        if (!parsed || !parsed.ip) throw new Error('no ip');
        exit.result = parsed;
        exit.ms = response.ms;
        exit.error = null;
      } catch {
        exit.error = '返回格式无法识别';
      }
    } else {
      exit.error = response.error || '请求失败';
    }

    refreshExits();
    updateScreenStats();
  }));
}

async function scanTargets(runId) {
  for (let round = 1; round <= 3; round += 1) {
    if (!isActive(runId)) return;
    const base = state.scanSet || [];
    const list = round === 3
      ? base.filter(target => target.best != null)
      : base;
    if (!list.length) break;

    await pool(list, 9, async target => {
      if (!isActive(runId)) return;
      const response = await probe(target.url, 3800);
      if (!isActive(runId)) return;

      target.samples.push(response);
      if (response.ok) {
        target.best = target.best == null ? response.ms : Math.min(target.best, response.ms);
      }
      updateTargetView(target);
      updateScanProgress(round);
    });

    if (!isActive(runId)) return;
    updateGroupMedians();
    updateScreenStats();
  }
}

function computeVerdict(stopped) {
  const available = state.exits.filter(exit => exit.result && exit.result.ip);
  const ips = [...new Set(available.map(exit => exit.result.ip))];
  const distinct = ips.length;
  const family4 = new Set(ips.filter(ip => ipFamily(ip) === 4));
  const family6 = new Set(ips.filter(ip => ipFamily(ip) === 6));
  const sameFamilyDistinct = Math.max(family4.size, family6.size);
  const dualOnly = distinct >= 2 && sameFamilyDistinct < 2;
  const stats = groupStats();
  let tone;
  let title;
  let note;

  if (sameFamilyDistinct >= 2) {
    const domestic = available.find(exit => exit.region === 'cn');
    const foreignIps = [...new Set(
      available
        .filter(exit => exit.region !== 'cn')
        .map(exit => exit.result.ip)
    )];
    const sameFamilyForeign = domestic
      ? foreignIps.filter(ip => ipFamily(ip) === ipFamily(domestic.result.ip))
      : [];
    const domesticDiffers = Boolean(
      domestic && sameFamilyForeign.some(ip => ip !== domestic.result.ip)
    );

    if (domesticDiffers) {
      tone = 'ok';
      title = '国内与国外出口不同';
      note = `国内对照点（${domestic.name}）从 ${domestic.result.ip} 出去，境外探测点从 ${foreignIps.slice(0, 3).join('、')} 出去。国内与国外走了不同线路，域名级分流大概率在生效。`;
    } else {
      tone = 'ok';
      title = `检测到 ${distinct} 个不同出口 IP`;
      note = `${available.length} 个可用探测点返回了 ${distinct} 个不同 IP，同一协议族内也存在多个出口，说明不同探测域名走了不同线路，域名级分流大概率在生效。具体节点名称无法从浏览器确认。`;
    }
  } else if (dualOnly) {
    tone = 'far';
    title = '双栈出口不同';
    note = 'IPv4 与 IPv6 看到了不同地址，但同一协议族内只有一个出口。这可能只是双栈差异，不一定是分流；想确认分流，可以在代理里关闭 IPv6 后重测。';
  } else if (distinct === 1) {
    if (stats.intlTotal > 0 && stats.intlReach === 0 && stats.cnReach > 0) {
      tone = 'bad';
      title = '境外站点全部不可达';
      note = '只看到一个出口，境外目标全部超时。流量可能仍在直连；先检查代理是否开启，以及规则是否覆盖这些域名。';
    } else {
      const gap = stats.intlMed != null && stats.cnMed != null
        ? stats.intlMed - stats.cnMed
        : null;
      const hint = gap != null && gap > 100
        ? ` 国际中位比国内高约 ${Math.round(gap)}ms，形态上更像国内直连、国际绕行。`
        : '';
      const scopeHint = stats.intlTotal === 0
        ? ' 本次只选择了国内站点。'
        : stats.cnTotal === 0 ? ' 本次只选择了境外站点。' : '';
      tone = 'far';
      title = '只看到单一出口';
      note = `${available.length} 个可用探测点指向同一个 IP。可能是全局代理、所有规则指向同一节点，也可能只是全部直连；结合下方延迟与可达性判断。${hint}${scopeHint}`;
    }
  } else if (stats.reach > 0) {
    tone = 'far';
    title = '出口未知，站点可探测';
    note = '出口查询被拦截或超时，无法数出出口数量。目的地矩阵仍能说明哪些线路通、哪些不通。';
  } else {
    tone = 'bad';
    title = '全部探测超时';
    note = '没有拿到任何结果。先确认网络可用，再看代理是否在系统层生效。';
  }

  if (stopped) {
    note = `扫描已停止，以下基于已完成的 ${stats.reach} / ${stats.total} 个站点。${note}`;
  }

  return { tone, title, note };
}

function finishScan(stopped) {
  state.scanning = false;
  state.finishedAt = new Date();
  state.stopped = stopped;

  const verdict = computeVerdict(stopped);

  const ledClass = verdict.tone;
  const scanCount = state.scanSet ? state.scanSet.length : state.targets.length;
  const elapsed = state.startedAt
    ? Math.max(1, Math.round((state.finishedAt - state.startedAt) / 1000))
    : null;
  const clock = state.finishedAt.toLocaleTimeString('zh-CN', { hour12: false });

  els.verdictLed.className = `led led-lg is-${ledClass}`;
  els.verdictTitle.textContent = verdict.title;
  els.verdictNote.textContent = verdict.note;

  els.headerState.textContent = stopped ? '已停止' : '已完成';
  els.headerLed.className = `led is-${ledClass}`;
  els.screenState.textContent = stopped ? '已停止' : '已完成';
  els.screenLed.className = `led is-${ledClass}`;
  els.screenProgress.textContent = stopped
    ? '扫描已停止'
    : elapsed != null ? `用时 ${elapsed}s` : `${scanCount} 个目标`;
  els.screenNote.textContent = stopped
    ? `${scanCount} 个目标 · 扫描已停止`
    : `${scanCount} 个目标 · 最后扫描 ${clock}`;

  setScanButtons('重新体检');
  updateSelectionUi();
  renderExitSummary();
  renderTargetSummary();
  updateScreenStats();
  updateGroupMedians();
  updateScopeEmpty();
  updateScopeDetail();
}

function renderExitSummary() {
  if (!state.startedAt) return;
  const available = state.exits.filter(exit => exit.result && exit.result.ip);
  const failed = state.exits.length - available.length;
  const wrap = els.exitSummary;
  wrap.textContent = '';

  const prefix = state.stopped ? '扫描已停止。' : '';

  if (!available.length) {
    wrap.textContent = `${prefix}${state.exits.length} 个探测点都没有返回可读结果：可能被跨域限制、被网络拦截，或请求超时。`;
    return;
  }

  const distinct = new Set(available.map(exit => exit.result.ip));
  const ips = [...distinct];
  const family4 = new Set(ips.filter(ip => ipFamily(ip) === 4));
  const family6 = new Set(ips.filter(ip => ipFamily(ip) === 6));
  const sameFamilyDistinct = Math.max(family4.size, family6.size);
  const strong = document.createElement('strong');

  if (distinct.size >= 2 && sameFamilyDistinct < 2) {
    strong.textContent = '检测到 IPv4 与 IPv6 两个出口地址。';
    wrap.append(
      prefix,
      strong,
      ' 同一协议族内只有一个地址，差异可能来自双栈，不一定是分流。'
    );
  } else if (distinct.size >= 2) {
    strong.textContent = `检测到 ${distinct.size} 个不同出口 IP。`;
    wrap.append(
      prefix,
      strong,
      ` ${available.length} 个探测点返回了不同 IP，同一协议族内存在不同路由，分流大概率在生效。`
    );
  } else {
    strong.textContent = `所有可用探测点都指向 ${ips[0]}。`;
    wrap.append(
      prefix,
      strong,
      ' 这可能是全局代理、所有规则指向同一节点，也可能只是全部直连。'
    );
  }

  if (failed) {
    wrap.append(` 另有 ${failed} 个探测点超时或被拦截。`);
  }
}

function renderTargetSummary() {
  if (!state.startedAt) return;
  const stats = groupStats();
  let text = `${stats.reach} / ${stats.total} 个站点可达`;
  if (stats.cnMed != null) text += `，国内中位 ${Math.round(stats.cnMed)}ms`;
  if (stats.intlMed != null) text += `，国际中位 ${Math.round(stats.intlMed)}ms`;
  text += '。「推测」只依据延迟和可达性，不代表代理客户端的真实规则。';
  if (state.stopped) text = `扫描已停止。${text}`;
  els.targetSummary.textContent = text;
}

/* ---------- scope canvas ---------- */

function setupScope() {
  scope.canvas = els.scope;
  scope.ctx = scope.canvas.getContext('2d');
  scope.shown = currentSet().map(() => 0);

  scope.canvas.addEventListener('pointerdown', onScopePointer);
  scope.canvas.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch') onScopePointer(event);
  });
  scope.canvas.addEventListener('pointerleave', () => setScopeHover(-1));

  const redraw = () => drawScope(scope.animating);
  if ('ResizeObserver' in window) {
    new ResizeObserver(redraw).observe(els.scopeWrap);
  } else {
    window.addEventListener('resize', redraw);
  }
}

function updateScopeDetail() {
  if (!els.scopeDetail) return;
  if (scope.hover < 0) {
    els.scopeDetail.textContent = state.scanning
      ? '正在扫描…'
      : '悬停或点按柱子，查看单个站点';
    return;
  }
  const target = currentSet()[scope.hover];
  if (!target) return;
  const value = target.best != null
    ? `${Math.round(target.best)} ms，${infer(target.best).label}`
    : target.samples.length ? '超时' : '未测';
  els.scopeDetail.textContent = `${target.name}，${value}`;
}

function setScopeHover(index) {
  if (scope.hover === index) return;
  scope.hover = index;
  updateScopeDetail();
  drawScope(scope.animating);
}

function onScopePointer(event) {
  const geom = scope.geom;
  const targets = currentSet();
  if (!geom || !targets.length) return;
  const rect = els.scope.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (x < geom.padLeft || x > scope.w - geom.padRight || y < geom.padTop - 2 || y > geom.baseY + 10) {
    setScopeHover(-1);
    return;
  }
  const index = clamp(
    Math.floor((x - geom.padLeft) / geom.slot),
    0,
    targets.length - 1
  );
  setScopeHover(index);
}

function startScopeAnimation() {
  if (reduceMotion) {
    drawScope(false);
    return;
  }

  scope.animating = true;
  if (scope.raf) cancelAnimationFrame(scope.raf);

  const step = () => {
    let moving = false;
    const targets = currentSet();

    if (scope.shown.length !== targets.length) {
      scope.shown = targets.map(() => 0);
    }

    targets.forEach((target, index) => {
      const goal = target.best != null ? target.best : 0;
      const current = scope.shown[index] || 0;
      const delta = goal - current;

      if (Math.abs(delta) > 0.4) {
        scope.shown[index] = current + delta * 0.16;
        moving = true;
      } else {
        scope.shown[index] = goal;
      }
    });

    drawScope(true);

    if (moving || state.scanning) {
      scope.raf = requestAnimationFrame(step);
    } else {
      scope.animating = false;
      scope.raf = 0;
      drawScope(false);
    }
  };

  scope.raf = requestAnimationFrame(step);
}

function drawScope(easeValues) {
  const canvas = scope.canvas;
  if (!canvas || !scope.ctx) return;

  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const pixelWidth = Math.round(rect.width * dpr);
  const pixelHeight = Math.round(rect.height * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  scope.w = rect.width;
  scope.h = rect.height;
  const ctx = scope.ctx;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, scope.w, scope.h);

  const targets = currentSet();
  if (!targets.length) return;

  const padLeft = 40;
  const padRight = 14;
  const padTop = 20;
  const padBottom = 28;
  const innerW = scope.w - padLeft - padRight;
  const innerH = scope.h - padTop - padBottom;
  if (innerW <= 0 || innerH <= 0) return;

  const values = targets.map(target => target.best).filter(value => value != null);
  const peak = values.length ? Math.max(...values) : 0;
  const maxMs = Math.max(400, Math.min(3200, Math.ceil(Math.max(peak, 250) / 200) * 200));
  const slot = innerW / targets.length;
  const baseY = padTop + innerH;
  const compact = scope.w < 340;

  scope.geom = { padLeft, padRight, padTop, baseY, slot };

  const groupCounts = GROUPS
    .map(group => ({
      group,
      count: targets.filter(target => target.group === group).length
    }))
    .filter(entry => entry.count > 0);

  // alternating group bands
  let groupCursor = 0;
  groupCounts.forEach((entry, visibleIndex) => {
    const x = padLeft + slot * groupCursor;
    const width = slot * entry.count;
    if (visibleIndex % 2 === 0) {
      ctx.fillStyle = 'rgba(240,180,92,.025)';
      ctx.fillRect(x, padTop, width, innerH);
    }
    groupCursor += entry.count;
  });

  const ticks = 4;
  ctx.font = '10px "IBM Plex Mono", monospace';
  ctx.textBaseline = 'middle';

  for (let index = 0; index <= ticks; index += 1) {
    const y = padTop + (innerH / ticks) * index;
    ctx.strokeStyle = index === ticks ? 'rgba(240,180,92,.28)' : 'rgba(240,180,92,.12)';
    ctx.beginPath();
    ctx.moveTo(padLeft, Math.round(y) + 0.5);
    ctx.lineTo(scope.w - padRight, Math.round(y) + 0.5);
    ctx.stroke();

    ctx.fillStyle = 'rgba(240,180,92,.58)';
    ctx.textAlign = 'right';
    ctx.fillText(String(Math.round(maxMs * (1 - index / ticks))), padLeft - 8, y);
  }

  ctx.fillStyle = 'rgba(240,180,92,.45)';
  ctx.fillText('ms', padLeft - 8, padTop - 10);

  // group separators + labels
  groupCursor = 0;
  groupCounts.forEach((entry, visibleIndex) => {
    if (visibleIndex > 0) {
      const x = padLeft + slot * groupCursor;
      ctx.strokeStyle = 'rgba(240,180,92,.16)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, baseY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const firstX = padLeft + slot * groupCursor + slot * 0.5;
    const lastX = padLeft + slot * (groupCursor + entry.count) - slot * 0.5;
    ctx.fillStyle = 'rgba(190,205,196,.72)';
    ctx.font = `${compact ? 8 : 10}px "Noto Sans SC", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(entry.group.short, (firstX + lastX) / 2, scope.h - 8);
    ctx.font = '10px "IBM Plex Mono", monospace';
    groupCursor += entry.count;
  });

  // median guide
  let medianLabel = null;
  const medianValue = median(values);
  if (medianValue != null) {
    const y = baseY - (medianValue / maxMs) * innerH;
    ctx.strokeStyle = 'rgba(240,180,92,.34)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(scope.w - padRight, y);
    ctx.stroke();
    ctx.setLineDash([]);

    const text = `全体中位 ${Math.round(medianValue)}`;
    ctx.font = '9.5px "IBM Plex Mono", monospace';
    medianLabel = {
      text,
      x: scope.w - padRight - 4,
      y: Math.max(padTop + 10, y - 7),
      width: ctx.measureText(text).width
    };
    ctx.font = '10px "IBM Plex Mono", monospace';
  }

  // hover band
  if (scope.hover >= 0 && scope.hover < targets.length) {
    const x = padLeft + slot * (scope.hover + 0.5);
    ctx.fillStyle = 'rgba(240,180,92,.07)';
    ctx.fillRect(x - slot / 2, padTop, slot, innerH);
    ctx.strokeStyle = 'rgba(240,180,92,.28)';
    ctx.beginPath();
    ctx.moveTo(x, padTop);
    ctx.lineTo(x, baseY);
    ctx.stroke();
  }

  targets.forEach((target, index) => {
    const x = padLeft + slot * (index + 0.5);
    const hovered = scope.hover === index;

    ctx.fillStyle = hovered ? 'rgba(240,180,92,.5)' : 'rgba(240,180,92,.22)';
    ctx.fillRect(x - 0.75, baseY - 2, 1.5, 2);

    if (target.best == null) {
      if (target.samples.length) {
        ctx.fillStyle = hovered ? 'rgba(229,101,74,1)' : 'rgba(229,101,74,.85)';
        const width = hovered ? 4 : 3;
        const height = hovered ? 6 : 4;
        ctx.fillRect(x - width / 2, baseY - height, width, height);
      }
      return;
    }

    const value = easeValues
      ? Math.min(target.best, scope.shown[index] || 0)
      : target.best;
    const height = Math.max(1, (value / maxMs) * innerH);
    const top = baseY - height;
    const width = hovered ? 4 : 3;

    const gradient = ctx.createLinearGradient(0, baseY, 0, top);
    gradient.addColorStop(0, 'rgba(240,180,92,.16)');
    gradient.addColorStop(1, 'rgba(240,180,92,.98)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - width / 2, top, width, height);

    ctx.save();
    ctx.shadowColor = 'rgba(240,180,92,.65)';
    ctx.shadowBlur = hovered ? 10 : 7;
    ctx.fillStyle = '#ffc16b';
    ctx.beginPath();
    ctx.arc(x, top, hovered ? 3 : 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  if (medianLabel) {
    ctx.fillStyle = 'rgba(14,23,19,.86)';
    ctx.fillRect(
      medianLabel.x - medianLabel.width - 4,
      medianLabel.y - 7,
      medianLabel.width + 8,
      14
    );
    ctx.font = '9.5px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(240,180,92,.78)';
    ctx.fillText(medianLabel.text, medianLabel.x, medianLabel.y);
    ctx.font = '10px "IBM Plex Mono", monospace';
  }
}

function updateScopeEmpty() {
  const targets = currentSet();
  if (!targets.length) {
    els.scopeEmpty.classList.remove('is-hidden');
    els.scopeEmpty.textContent = '未选择任何站点';
    return;
  }
  const hasSamples = targets.some(target => target.samples.length);
  if (state.scanning || hasSamples) {
    els.scopeEmpty.classList.add('is-hidden');
    return;
  }
  els.scopeEmpty.classList.remove('is-hidden');
  els.scopeEmpty.textContent = state.startedAt
    ? '没有采到数据 · 检查网络或代理'
    : `等待扫描 · 共 ${targets.length} 个目标`;
}

/* ---------- monitor ---------- */

function setupMonitor() {
  els.monitorInput.addEventListener('input', updateEffectiveNote);
  els.monitorInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !monitorState.running) {
      event.preventDefault();
      startMonitor();
    }
  });
  els.monitorToggle.addEventListener('click', () => {
    if (monitorState.running) stopMonitor();
    else startMonitor();
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(drawMonitorChart).observe(els.monitorChart);
  } else {
    window.addEventListener('resize', drawMonitorChart);
  }
}

function updateEffectiveNote() {
  if (monitorState.running) {
    els.monitorEffective.textContent = `监测中 · ${monitorState.url}`;
    els.monitorEffective.style.color = '';
    return;
  }
  const url = normalizeUrl(els.monitorInput.value);
  els.monitorEffective.textContent = url ? `请求将发往 ${url}` : '请输入有效的网址';
  els.monitorEffective.style.color = url ? '' : 'var(--bad)';
}

function startMonitor() {
  if (state.scanning) {
    showToast('体检进行中，完成后再开始监测');
    return;
  }

  const url = normalizeUrl(els.monitorInput.value);
  if (!url) {
    showToast('请输入有效的网址');
    els.monitorInput.focus();
    return;
  }

  monitorState.url = url;
  monitorState.running = true;
  monitorState.pending = false;
  monitorState.samples = [];
  monitorState.everStarted = true;
  monitorState.session += 1;
  const session = monitorState.session;

  els.monitorInput.disabled = true;
  els.monitorToggle.textContent = '停止监测';
  els.monitorEffective.textContent = `监测中 · ${url}`;
  els.monitorEffective.style.color = '';

  renderMonitor();
  pingMonitor(session);

  if (monitorState.timer) clearInterval(monitorState.timer);
  monitorState.timer = setInterval(() => pingMonitor(session), 2000);
}

function stopMonitor() {
  monitorState.running = false;
  monitorState.pending = false;
  monitorState.session += 1;
  if (monitorState.timer) {
    clearInterval(monitorState.timer);
    monitorState.timer = null;
  }
  els.monitorInput.disabled = false;
  els.monitorToggle.textContent = '开始监测';
  updateEffectiveNote();
  renderMonitor();
}

async function pingMonitor(session) {
  if (!monitorState.running || monitorState.pending || session !== monitorState.session) return;
  monitorState.pending = true;
  const response = await probe(monitorState.url, 5000, monitorState.bag);
  if (session !== monitorState.session || !monitorState.running) return;
  monitorState.pending = false;

  monitorState.samples.push(response);
  if (monitorState.samples.length > 40) monitorState.samples.shift();
  renderMonitor();
}

function renderMonitor() {
  const samples = monitorState.samples;
  const last = samples[samples.length - 1];
  const okSamples = samples.filter(sample => sample.ok);

  if (last) {
    if (last.ok) {
      els.monitorLast.textContent = String(Math.round(last.ms));
      els.monitorLast.classList.remove('is-bad');
      els.monitorUnit.style.visibility = 'visible';
      els.monitorTag.className = 'tag tone-ok';
      els.monitorTag.textContent = monitorState.running ? '在线' : '已停止';
    } else {
      els.monitorLast.textContent = '超时';
      els.monitorLast.classList.add('is-bad');
      els.monitorUnit.style.visibility = 'hidden';
      els.monitorTag.className = 'tag tone-bad';
      els.monitorTag.textContent = monitorState.running ? '超时' : '已停止';
    }
  } else {
    els.monitorLast.textContent = '—';
    els.monitorLast.classList.remove('is-bad');
    els.monitorUnit.style.visibility = 'visible';
    els.monitorTag.className = 'tag tone-idle';
    els.monitorTag.textContent = monitorState.running ? '等待数据' : (monitorState.everStarted ? '已停止' : '未开始');
  }

  if (okSamples.length) {
    const times = okSamples.map(sample => sample.ms);
    els.monitorMin.textContent = `${Math.round(Math.min(...times))}ms`;
    els.monitorAvg.textContent = `${Math.round(times.reduce((sum, value) => sum + value, 0) / times.length)}ms`;
    els.monitorMax.textContent = `${Math.round(Math.max(...times))}ms`;
  } else {
    els.monitorMin.textContent = '—';
    els.monitorAvg.textContent = '—';
    els.monitorMax.textContent = '—';
  }

  if (samples.length) {
    const lost = samples.filter(sample => !sample.ok).length;
    els.monitorLoss.textContent = `${Math.round((lost / samples.length) * 100)}%`;
  } else {
    els.monitorLoss.textContent = '—';
  }

  drawMonitorChart();
}

function drawMonitorChart() {
  const canvas = els.monitorChart;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const pixelWidth = Math.round(rect.width * dpr);
  const pixelHeight = Math.round(rect.height * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  const ctx = canvas.getContext('2d');
  const w = rect.width;
  const h = rect.height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const baseY = h - 6;

  ctx.strokeStyle = 'rgba(22,27,24,.12)';
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  ctx.lineTo(w, baseY);
  ctx.stroke();
  ctx.setLineDash([]);

  const samples = monitorState.samples.slice(-40);
  if (!samples.length) return;

  const successful = samples.filter(sample => sample.ok);
  const maxMs = Math.max(100, ...successful.map(sample => sample.ms));
  const count = samples.length;
  const step = count > 1 ? (w - 10) / (count - 1) : 0;
  const xAt = index => count > 1 ? 5 + index * step : w / 2;
  const yAt = ms => baseY - Math.min(1, ms / maxMs) * (baseY - 6);

  ctx.strokeStyle = 'rgba(22,27,24,.78)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  let pen = false;

  samples.forEach((sample, index) => {
    if (!sample.ok) {
      pen = false;
      return;
    }
    const x = xAt(index);
    const y = yAt(sample.ms);
    if (pen) ctx.lineTo(x, y);
    else {
      ctx.moveTo(x, y);
      pen = true;
    }
  });
  ctx.stroke();

  samples.forEach((sample, index) => {
    if (!sample.ok) {
      ctx.fillStyle = 'rgba(174,59,42,.7)';
      ctx.fillRect(xAt(index) - 1, baseY - 5, 2, 5);
    }
  });

  const last = samples[samples.length - 1];
  if (last && last.ok) {
    ctx.fillStyle = '#f0b45c';
    ctx.beginPath();
    ctx.arc(xAt(samples.length - 1), yAt(last.ms), 2.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(22,27,24,.65)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

/* ---------- boot ---------- */

function bindEvents() {
  els.scanButtons.forEach(button => {
    button.addEventListener('click', startScan);
  });
  els.selectAll.addEventListener('click', () => setAllSelected(true));
  els.selectNone.addEventListener('click', () => setAllSelected(false));
}

function updateStaticCounts() {
  const count = state.targets.length;
  const exitCount = state.exits.length;
  const selected = selectedTargets().length;
  const domesticExits = state.exits.filter(exit => exit.region === 'cn').length;

  if (els.heroTargetCount) els.heroTargetCount.textContent = String(count);
  if (els.heroExitCount) els.heroExitCount.textContent = String(exitCount);
  if (els.selectionCount) els.selectionCount.textContent = `已选 ${selected} / ${count}`;
  if (els.exitSummary) {
    els.exitSummary.textContent = `尚未探测。开始体检后，这里会列出 ${exitCount} 个独立服务返回的出口信息` +
      `${domesticExits ? `，其中 ${domesticExits} 个位于国内` : ''}。`;
  }
  if (els.screenProgress) els.screenProgress.textContent = `${selected} 个目标`;
  if (els.screenNote) els.screenNote.textContent = `${selected} 个目标 · 每个最多 3 次`;
}

function init() {
  cacheElements();
  buildTargets();
  buildExits();
  setupScope();
  setupMonitor();
  bindEvents();
  updateStaticCounts();
  updateSelectionUi();
  updateGroupMedians();
  updateScreenStats();
  updateScopeEmpty();
  updateScopeDetail();
  updateEffectiveNote();
  drawScope(false);
  drawMonitorChart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
