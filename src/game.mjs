export const foods = [{name:'一般飼料',xp:10,icon:'🌾'},{name:'答對飼料',xp:20,icon:'✨'},{name:'特殊飼料',xp:30,icon:'🚕'},{name:'攝影飼料',xp:25,icon:'📸'}];
export function addDay(day, n=1){return new Date(Date.parse(day+'T12:00:00Z')+n*86400000).toISOString().slice(0,10)}
export function initial(){return {day:'2026-10-12',time:'20:30',pet:null,xp:0,stock:[0,0,0,0],feeds:[],rides:[],posts:[],answers:{},favorites:[],events:[{id:'sample',title:'設計師面試',date:'2026-10-13',time:'09:00',place:'台北車站',source:'模擬手機日曆',reminder:''}],connected:false,notify:true,remindTime:'20:30',settled:[],coupons:[]}}
export function stage(xp){return xp>=300?'進化':xp>=100?'成長':'初始'}
export function reduce(s,a){
 const n=structuredClone(s);
 if(a.type==='adopt'&&!n.pet)n.pet={name:a.name||'小橘',kind:a.kind};
 if(a.type==='ride'&&!n.rides.includes(n.day)){n.rides.push(n.day);n.stock[2]++}
 if(a.type==='feed'&&n.pet&&n.stock[a.index]>0){n.stock[a.index]--;n.xp+=foods[a.index].xp;n.feeds.push({day:n.day,xp:foods[a.index].xp,food:a.index})}
 if(a.type==='answer'&&n.time>='20:00'&&!n.answers[n.day])n.answers[n.day]={choice:a.choice,claimed:false};
 if(a.type==='claim'&&n.answers[a.day]&&!n.answers[a.day].claimed&&(n.day>addDay(a.day)||(n.day===addDay(a.day)&&n.time>='08:00'))){n.answers[a.day].claimed=true;n.stock[0]++;if(n.answers[a.day].choice===0)n.stock[1]++}
 if(a.type==='review'){const p=n.posts.find(p=>p.id===a.id);if(p&&p.status==='待審核'){p.status=a.pass?'合格候選':'退回';if(a.pass&&!n.posts.some(q=>q.id!==p.id&&q.day===p.day&&q.reward)){p.reward=true;n.stock[3]++}}}
 if(a.type==='settle'){const year=n.day.slice(0,4);if(!n.settled.includes(year)){n.settled.push(year);const points=n.feeds.filter(f=>f.day.startsWith(year)).reduce((v,f)=>v+f.xp,0);if(points>=100)n.coupons.push({id:year+'-goal',name:'年度達標獎',amount:50});if(points>=300)n.coupons.push({id:year+'-winner',name:'年度優勝獎',amount:100})}}
 return n;
}
