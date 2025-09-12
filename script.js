const floatingAI = document.getElementById('floatingAI');
const floatingChat = document.getElementById('floatingChat');
const floatingInput = document.getElementById('floatingInput');
const imageResult = document.getElementById('imageResult');

function appendFloatingMessage(sender, text){
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  div.innerText = text;
  floatingChat.appendChild(div);
  floatingChat.scrollTop = floatingChat.scrollHeight;
}

const responses = [
  { keywords: ['مرحبا','هلا','أهلا'], reply: 'أهلاً بك! أنا Vivk AI، مساعدك الذكي المتطور. كيف يمكنني مساعدتك اليوم؟' },
  { keywords: ['كيف حالك','كيفك'], reply: 'أنا بخير، شكراً لسؤالك 😊 وأنت؟' },
  { keywords: ['اسمك'], reply: 'اسمي Vivk AI، مساعد ذكي مستقل بالكامل 😉' },
  { keywords: ['وقت','الساعة'], reply: ()=>'الوقت الآن: ' + new Date().toLocaleTimeString() },
  { keywords: ['تاريخ'], reply: ()=>'التاريخ اليوم: ' + new Date().toLocaleDateString() },
  { keywords: ['طقس'], reply: 'أنا لا أستطيع معرفة الطقس حالياً، لكن يمكنني إعطائك نصائح عامة.' },
  { keywords: ['برمجة','كود','javascript','html','python'], reply: 'يمكنني مساعدتك في البرمجة، أخبرني ما الذي تريد فعله؟' },
  { keywords: ['رياضة','كرة قدم','كرة سلة'], reply: 'الرياضة مفيدة للصحة! ما رياضتك المفضلة؟' },
  { keywords: ['فلسفة','حياة','نصيحة'], reply: 'الحياة رحلة، حاول الاستمتاع بكل لحظة وتعلم من كل تجربة.' },
  { keywords: ['معرفة','معلومة','معلومات'], reply: 'يمكنني تزويدك بالكثير من المعلومات، فقط اسألني عن أي شيء.' },
];

function botResponse(message){
  message = message.toLowerCase();
  for(let r of responses){
    if(r.keywords.some(k => message.includes(k))){
      return typeof r.reply === 'function' ? r.reply() : r.reply;
    }
  }
  const fallback = [
    'مثير للاهتمام! أخبرني المزيد…',
    'لم أفهم تماماً، هل يمكنك إعادة الصياغة؟',
    'هذا سؤال جيد! دعني أفكر…',
    'أنا هنا لأساعدك، حاول أن تصيغ سؤالك بشكل آخر.'
  ];
  return fallback[Math.floor(Math.random()*fallback.length)];
}

function sendFloatingMessage(){
  const text = floatingInput.value.trim();
  if(!text) return;
  appendFloatingMessage('user', text);
  floatingInput.value = '';
  setTimeout(()=>{ appendFloatingMessage('bot', botResponse(text)); }, 500);
}

function generateFloatingImage(){
  const prompt = floatingInput.value.trim();
  if(!prompt) return alert('اكتب وصف الصورة أولاً!');
  appendFloatingMessage('user', 'طلب إنشاء صورة: ' + prompt);
  const img = document.createElement('img');
  img.src = 'https://source.unsplash.com/100x100/?' + encodeURIComponent(prompt);
  imageResult.appendChild(img);
  floatingInput.value = '';
  setTimeout(()=>{ appendFloatingMessage('bot', 'تم إنشاء الصورة بنجاح!'); }, 500);
}

if(floatingInput){
  floatingInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter') sendFloatingMessage();
  });
}

const floatingHeader = document.getElementById('floatingHeader');
floatingHeader.onclick = () => {
  if(floatingAI.style.height === '50px'){
    floatingAI.style.height = '500px';
  } else {
    floatingAI.style.height = '50px';
  }
};