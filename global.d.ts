// global.d.ts
declare let global: {
    doGet: (e: any) => GoogleAppsScript.HTML.HtmlOutput;
    doPost: () => void;
};