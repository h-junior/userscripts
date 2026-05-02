// ==UserScript==
// @name         Twitter UI cleaner
// @namespace    https://hjunior.com
// @version      1.1
// @description  Cleans the Twitter UI
// @icon         https://raw.githubusercontent.com/h-junior/userscripts/refs/heads/main/twitter-ui-cleaner/icon.png
// @author       hjunior
// @homepage     https://github.com/h-junior/userscripts
// @homepageURL  https://github.com/h-junior/userscripts
// @match        https://x.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/h-junior/userscripts/refs/heads/main/twitter-ui-cleaner/script.user.js
// @downloadURL  https://raw.githubusercontent.com/h-junior/userscripts/refs/heads/main/twitter-ui-cleaner/script.user.js
// ==/UserScript==

(function () {
	"use strict";

	const NAV_BAR_XPATH = "//*[@data-testid='AppTabBar_Home_Link']/parent::*";

	const NAV_BAR_TARGETS = {
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

	function clearNavBar() {
		console.groupCollapsed("[Twitter UI cleaner] Clearing nav bar");

		for (const [targetId, targetXPath] of Object.entries(NAV_BAR_TARGETS)) {
			console.log(`Searching for nav bar target ${targetId}`);
			const targetElement = queryXPath(targetXPath);

			if (!targetElement) {
				console.log(`Nav bar target ${targetId} not found`);
			} else {
				console.log(`Nav bar target ${targetId} found`);
				if (targetElement.getAttribute("style") !== HIDE_STYLE) {
					targetElement.setAttribute("style", HIDE_STYLE);
				}
			}
		}
		console.groupEnd();
	}

	function searchForNavBar() {
		console.log("[Twitter UI cleaner] Searching for the nav bar");
		const navBarElement = queryXPath(NAV_BAR_XPATH);

		if (navBarElement) {
			console.log(
				"[Twitter UI cleaner] Nav bar found, setting up nav bar observer"
			);
			clearNavBar();

			const observer = new MutationObserver(() => clearNavBar());
			observer.observe(navBarElement, {
				childList: true,
				subtree: true
			});

			setupObserver.disconnect();
		}
	}

	const setupObserver = new MutationObserver(() => searchForNavBar());

	setupObserver.observe(document.body, {
		childList: true,
		subtree: true
	});
})();
