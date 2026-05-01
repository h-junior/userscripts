// ==UserScript==
// @name         Twitter UI cleaner
// @namespace    https://hjunior.com
// @version      1.0
// @description  Cleans the Twitter UI
// @icon         https://raw.githubusercontent.com/h-junior/userscripts/refs/heads/main/twitter-ui-cleaner/icon.png
// @author       hjunior
// @homepage     https://github.com/h-junior/userscripts
// @match        https://x.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const TARGETS = {
    GROK_BUTTON: "//*[@href='/i/grok']",
	CREATOR_STUDIO_BUTTON: "//*[@href='/i/jf/creators/studio']",
	PREMIUM_BUTTON: "//*[@href='/i/premium_sign_up']"
  };

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

  function findTarget(targetXPath) {
	try {
		const targetElement = queryXPath(targetXPath);
		if (targetElement) return targetElement;
	} catch (err) {
		console.warn(`XPath ${targetXPath} failed: ${err}`);
	}
    return null;
  }

  function clearUi() {
	console.groupCollapsed("[Twitter UI cleaner] Trying to clear UI");
	for (const [targetId, targetXPath] of Object.entries(TARGETS)) {
		console.log(`Searching for target ${targetId}`);
		const targetElement = findTarget(targetXPath);

		if (!targetElement) {
			console.log(`Target ${targetId} not found`);
		} else {
			console.log(`Target ${targetId} found`);
			if (targetElement.getAttribute('style') !== HIDE_STYLE) {
				targetElement.setAttribute('style', HIDE_STYLE);
				delete TARGETS[targetId];
			}
		}
	}
	console.groupEnd();
	if (Object.entries(TARGETS).length === 0) {
		console.info("[Twitter UI cleaner] Disconnecting observer");
		observer.disconnect();
	}
  }

  const observer = new MutationObserver(() => clearUi());

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();