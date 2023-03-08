/* eslint-disable no-undef */
function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag();
}
