import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./e2e',timeout:45000,use:{baseURL:'http://localhost:5173',viewport:{width:390,height:844},launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'},headless:true},reporter:'list'});
