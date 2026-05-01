// ==UserScript==
// @name         Spotify visual panel remover
// @namespace    https://hjunior.com
// @version      1.0
// @description  Removes the visual panel in Spotify web UI
// @icon         https://raw.githubusercontent.com/h-junior/userscripts/refs/heads/main/spotify-visual-panel-remover/icon.png
// @author       hjunior
// @homepage     https://github.com/h-junior/userscripts
// @match        https://open.spotify.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const XPATHS = [
    "//*[@id='main-view']/following-sibling::*",
  ];

  const HIDE_STYLE = "display: none !important";

  function queryXPath(xpath) {
    return document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  function findTarget() {
    for (const xpath of XPATHS) {
      try {
        const el = queryXPath(xpath);
        if (el) return el;
      } catch (e) {
        console.warn(`[Spotify visual panel remover] XPath ${xpath} failed: ${e}`);
      }
    }
    return null;
  }

  function hideTarget() {
    const target = findTarget();
    if (!target) {
      console.error(`[Spotify visual panel remover] Visual panel not found`);
      return
    }
    if (target.getAttribute('style') !== HIDE_STYLE) {
      target.setAttribute('style', HIDE_STYLE);
    }
  }

  const observer = new MutationObserver(() => hideTarget());

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  hideTarget();
})();