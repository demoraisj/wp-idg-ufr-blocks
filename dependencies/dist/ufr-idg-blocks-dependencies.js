/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (() => {

window.addEventListener("DOMContendLoaded",function(){var a=document.querySelector(".container"),b=document.querySelectorAll(".banner-container");b.forEach(function(b){var c=a.clientWidth,d=b.getAttribute("data-width"),e=b.getAttribute("data-height");if(d>c){b.style.width="".concat(c-20,"px"),b.style.height="".concat(e*(100*c/d)/100,"px")}else b.style.width="".concat(e,"px"),b.style.width="".concat(d,"px");b.style.display="flex"})});

/***/ }),
/* 2 */
/***/ (() => {

function _createForOfIteratorHelper(a,b){var c="undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(!c){if(Array.isArray(a)||(c=_unsupportedIterableToArray(a))||b&&a&&"number"==typeof a.length){c&&(a=c);var d=0,e=function F(){};return{s:e,n:function n(){return d>=a.length?{done:!0}:{done:!1,value:a[d++]}},e:function e(a){throw a},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var f,g=!0,h=!1;return{s:function s(){c=c.call(a)},n:function n(){var a=c.next();return g=a.done,a},e:function e(a){h=!0,f=a},f:function f(){try{g||null==c["return"]||c["return"]()}finally{if(h)throw f}}}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}window.addEventListener("load",function(){var a=document.getElementById("editor");a&&a.addEventListener("DOMSubtreeModified",function(){var a,b=document.getElementsByClassName("block-responsive"),c=_createForOfIteratorHelper(b);try{for(c.s();!(a=c.n()).done;){var d=a.value,e=getComputedStyle(d).width;e=e.replace("px",""),e=+e,600>e&&!d.classList.contains("small")?(d.classList.contains("very-small")&&d.classList.remove("very-small"),d.classList.add("small")):200>e&&!d.classList.contains("very-small")?(d.classList.contains("small")&&d.classList.remove("small"),d.classList.add("very-small")):(d.classList.contains("very-small")&&d.classList.remove("very-small"),d.classList.contains("small")&&d.classList.remove("small"))}}catch(a){c.e(a)}finally{c.f()}})});

/***/ }),
/* 3 */
/***/ (() => {

window.addEventListener("load",function(){function toggleCollapse(){var a=document.querySelectorAll(".wp-block-create-block-ufr-collapse-list-card .heading");a.forEach(function(a){a.nextElementSibling.classList.contains("closed")?a.nextElementSibling.classList.remove("closed"):a.nextElementSibling.classList.add("closed"),a.querySelector(".arrow i").classList.contains("fa-chevron-down")?(a.querySelector(".arrow i").classList.remove("fa-chevron-down"),a.querySelector(".arrow i").classList.add("fa-chevron-up")):(a.querySelector(".arrow i").classList.remove("fa-chevron-up"),a.querySelector(".arrow i").classList.add("fa-chevron-down"))})}document.querySelectorAll(".wp-block-create-block-ufr-collapse-list-card .heading").forEach(function(a){a.addEventListener("click",toggleCollapse)})});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _banner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _banner_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_banner_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_responsivity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _block_responsivity_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_block_responsivity_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _collapse_list_card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _collapse_list_card_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_collapse_list_card_js__WEBPACK_IMPORTED_MODULE_2__);
window.dispatchEvent(new Event("ufr-block-dependencies-loaded"));
})();

/******/ })()
;