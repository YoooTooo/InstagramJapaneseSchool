// global.d.ts
declare let global: {
    doGet: (e: any) => GoogleAppsScript.HTML.HtmlOutput;
    doPost: (e: nay) => any;
};