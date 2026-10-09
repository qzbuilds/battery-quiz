// 题目、计分、结果都在 QUIZ 里，换一份 QUIZ 就是一个新测试。
// 每个选项给 0～3 分，总分越高电量越满。
var QUIZ = {
  questions: [
    { q: '周一早上闹钟响了，你的第一反应是？', o: [
      ['直接起，今天有想做的事', 3], ['赖两分钟，然后起', 2], ['按掉，再定一个', 1], ['睁眼就开始盼周五', 0]] },
    { q: '老板在群里 @你，你的心跳是？', o: [
      ['没感觉，回就是了', 3], ['稍微快一点', 2], ['先截图给朋友吐槽', 1], ['想把手机扔了', 0]] },
    { q: '午饭时间，你通常在干嘛？', o: [
      ['认真吃饭，顺便散个步', 3], ['边吃边刷手机', 2], ['边吃边回消息', 1], ['吃什么不重要，能躺就行', 0]] },
    { q: '下午三点，你的状态像？', o: [
      ['刚热完身', 3], ['正常营业', 2], ['靠咖啡续命', 1], ['灵魂已经下班', 0]] },
    { q: '同事说"这个你顺手弄一下"，你会？', o: [
      ['行，顺手的事', 3], ['先问清楚要多久', 2], ['嘴上答应心里骂', 1], ['假装没看见', 0]] },
    { q: '下班路上，你最想做的事是？', o: [
      ['去健身或者学点东西', 3], ['约朋友吃顿好的', 2], ['回家躺着刷视频', 1], ['什么都不想，只想安静', 0]] },
    { q: '周末你会怎么过？', o: [
      ['安排满满，出门玩', 3], ['半天出门半天躺', 2], ['睡到中午，叫外卖', 1], ['周末也在想工作的事', 0]] },
    { q: '如果明天可以请一天假，你会？', o: [
      ['不请，手上的事正有意思', 3], ['请，去做件一直想做的事', 2], ['请，在家睡一整天', 1], ['请一天不够，想请一年', 0]] }
  ],
  // 按总分从高到低匹配，score 是这一档的最低分
  results: [
    { score: 19, cells: 4, level: '电量 80%～100%', name: '满电冲锋型',
      desc: '你对工作还有新鲜感，也知道怎么照顾自己。别人在熬，你在玩升级游戏。',
      tip: '趁电量满，把一直想学的东西开个头。' },
    { score: 13, cells: 3, level: '电量 50%～79%', name: '稳定续航型',
      desc: '不算热血，但很稳。该做的事做完，该休息的时候也舍得休息。',
      tip: '给每周留一个只属于自己的晚上。' },
    { score: 7, cells: 2, level: '电量 20%～49%', name: '低电量省电模式',
      desc: '你在用最少的力气撑完每一天。不是不行，是电快不够了。',
      tip: '这周找一件让你开心的小事，先充一格。' },
    { score: 0, cells: 1, level: '电量低于 20%', name: '请立即充电',
      desc: '你已经累到连吐槽都懒得吐了。先别逼自己，能睡就睡。',
      tip: '今晚早点放下手机，明天再说。' }
  ]
};

var state = { index: 0, total: 0 };

function $(id) { return document.getElementById(id); }

function show(pageId) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove('on');
  $(pageId).classList.add('on');
  window.scrollTo(0, 0);
}

function drawBattery(el, cells) {
  el.innerHTML = '';
  var cls = cells >= 3 ? 'full' : (cells === 2 ? 'mid' : 'low');
  for (var i = 0; i < 4; i++) {
    var c = document.createElement('div');
    c.className = 'cell' + (i < cells ? ' ' + cls : '');
    el.appendChild(c);
  }
}

function renderQuestion() {
  var item = QUIZ.questions[state.index];
  $('progress').textContent = '第 ' + (state.index + 1) + ' / ' + QUIZ.questions.length + ' 题';
  $('question').textContent = item.q;
  var box = $('options');
  box.innerHTML = '';
  item.o.forEach(function (opt) {
    var b = document.createElement('button');
    b.className = 'opt';
    b.textContent = opt[0];
    b.addEventListener('click', function () { choose(opt[1]); });
    box.appendChild(b);
  });
}

function choose(points) {
  state.total += points;
  state.index += 1;
  if (state.index < QUIZ.questions.length) renderQuestion();
  else renderResult();
}

function renderResult() {
  var r = QUIZ.results[QUIZ.results.length - 1];
  for (var i = 0; i < QUIZ.results.length; i++) {
    if (state.total >= QUIZ.results[i].score) { r = QUIZ.results[i]; break; }
  }
  $('r-level').textContent = r.level;
  drawBattery($('r-battery'), r.cells);
  $('r-name').textContent = r.name;
  $('r-desc').textContent = r.desc;
  $('r-tip').textContent = r.tip;
  show('p-result');
}

function start() {
  state.index = 0;
  state.total = 0;
  renderQuestion();
  show('p-quiz');
}

drawBattery($('start-battery'), 2);
$('btn-start').addEventListener('click', start);
$('btn-again').addEventListener('click', start);
