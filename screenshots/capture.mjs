import {chromium} from '@playwright/test';
import {initial} from '../src/game.mjs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:2});
await page.goto('http://localhost:5173/');
const state=initial();state.pet={name:'小橘',kind:0};state.xp=125;state.stock=[2,1,1,1];state.connected=true;state.feeds=[{day:'2026-10-12',xp:125,food:0}];
await page.evaluate(s=>localStorage.setItem('yoxi-v1',JSON.stringify(s)),state);await page.reload();await page.evaluate(()=>document.fonts.ready);await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
await page.locator('.challenge-teaser img').waitFor();await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
for(const [tab,file] of [['首頁','ppt-home.png'],['城市猜謎','ppt-quiz.png'],['行事曆','ppt-calendar.png'],['我的','ppt-profile.png']]){
 await page.getByRole('button',{name:tab,exact:true}).click();await page.locator('.phone-frame').screenshot({path:'screenshots/'+file});
}
await page.setViewportSize({width:1366,height:768});
await page.waitForFunction(()=>{const r=document.querySelector('.phone-frame').getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight});
const bounds=await page.locator('.phone-frame').boundingBox();if(bounds.y<0||bounds.y+bounds.height>768)throw new Error('Phone preview exceeds laptop viewport');
await page.getByRole('button',{name:'Demo',exact:true}).click();await page.getByRole('button',{name:'隔日 08:00 揭曉',exact:true}).click();await page.getByRole('button',{name:'關閉',exact:true}).click();
console.log('4 個 820×1728 PPT 手機截圖完成；768px 筆電高度與框內控制已驗證。');
await browser.close();
