/**
 * @license
 * Copyright (c) 2017-2018 Noticeable. All rights reserved.
 */
import '@polymer/polymer/polymer-legacy.js';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import 'js-sha3/src/sha3.js';

import './lib/noticeable-widget-icons.js';
import './lib/noticeable-widget-label.js';
import './lib/noticeable-widget-sliding-pages.js';
import './lib/twemoji.js';

import {env} from './env.js';
import {postSamples} from './samples.js';

// import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';

// setPassiveTouchGestures(true);

/**
 * [Noticeable](https://noticeable.io) is an easy to use newsfeed and changelog.
 *
 * This [custom element](https://developers.google.com/web/fundamentals/web-components/customelements) is
 * provided by Noticeable to make product updates visible, improve user engagement and reduce churn.
 *
 * It's important to remember that using `<noticeable-widget>` is no different than using a `<div>` or any
 * other element once dependencies have been imported. For setup instructions, please look at your
 * [project settings](https://noticeable.io/projects).
 *
 * The inner of this element is made of 2 parts: a trigger and a popup. The trigger includes by default a badge
 * with a counter that depicts the number of new posts which have not yet been seen. Upon tap, the trigger opens
 * a popup that displays the most recent posts published, from the [Noticeable](https://noticeable.io) service.
 *
 * In order to configure camel-case properties of elements using attributes, dash-case must be used in the
 * attribute name of the element. Please also note local definitions have precedence over remote settings
 * defined in the Noticeable service.
 *
 * You can find customization examples on our [samples](https://widget.noticeable.io/v1/samples/) page.
 *
 * If you any questions, concerns or suggestions, please reach us to
 * [support@noticeable.io](mailto:support@noticeable.io).
 *
 * ### Styling
 *
 * `<noticeable-widget>` provides the following
 * [mixins](https://www.polymer-project.org/3.0/docs/devguide/custom-css-properties#use-custom-css-mixins)
 * for styling:
 *
 * Mixin           | Description (relative to the widget internals)
 * ----------------|-------------
 * --noticeable-widget-emoji | Mixin applied to selector `.emoji`.
 * --noticeable-widget-label | Mixin applied to all instances of `noticeable-widget-label` element.
 * --noticeable-widget-popup-container | Mixin applied to selector `#popup-container`.
 * --noticeable-widget-popup-container-for-phone | Mixin applied to selector `#popup-container` on small devices (phones).
 * --noticeable-widget-popup-content | Mixin applied to selector `.popup-content`.
 * --noticeable-widget-popup-entry-labels | Mixin applied to selector `.labels`.
 * --noticeable-widget-popup-entry | Mixin applied to selector `.popup-entry`.
 * --noticeable-widget-popup-entry-excerpt | Mixin applied to selector `.popup-entry .excerpt`.
 * --noticeable-widget-popup-entry-hover | Mixin applied to selector `.popup-entry:hover`.
 * --noticeable-widget-popup-entry-last-of-type | Mixin applied to selector `.popup-entry:last-of-type`.
 * --noticeable-widget-popup-entry-read | Mixin applied to selector `.popup-entry-read`.
 * --noticeable-widget-popup-entry-read-hover | Mixin applied to selector `.popup-entry-read:hover`.
 * --noticeable-widget-popup-entry-unread-border-color | Custom property used to alter the color of the left border set to unread posts. The default value is based on the project accent color.
 * --noticeable-widget-popup-entry-title | Mixin applied to selector `.popup-entry .title`.
 * --noticeable-widget-popup-footer | Mixin applied to selector `.popup-footer`.
 * --noticeable-widget-popup-footer-a | Mixin applied to selector `.popup-footer a`.
 * --noticeable-widget-popup-footer-a-hover | Mixin applied to selector `.popup-footer a:hover`.
 * --noticeable-widget-popup-footer-a-visited | Mixin applied to selector `.popup-footer a:visited`.
 * --noticeable-widget-popup-header | Mixin applied to selector `.popup-header`.
 * --noticeable-widget-popup-header-a | Mixin applied to selector `.popup-header a`.
 * --noticeable-widget-popup-header-a-hover | Mixin applied to selector `.popup-header a:hover`.
 * --noticeable-widget-popup-header-a-visited | Mixin applied to selector `.popup-header a:visited`.
 * --noticeable-widget-popup-post-content | Mixin applied to selector `.post-content`.
 * --noticeable-widget-popup-post-content-a | Mixin applied to selector `.post-content a`.
 * --noticeable-widget-popup-post-content-a-hover | Mixin applied to selector `.post-content a:hover`.
 * --noticeable-widget-popup-post-content-footer | Mixin applied to selector `.post-content-footer`.
 * --noticeable-widget-popup-post-content-footer-hover | Mixin applied to selector `.post-content-footer:hover`.
 * --noticeable-widget-popup-post-content-footer-a | Mixin applied to selector `.post-content-footer a`.
 * --noticeable-widget-popup-post-content-footer-a-hover | Mixin applied to selector `.post-content-footer a:hover`.
 * --noticeable-widget-popup-post-content-footer-a-visited | Mixin applied to selector `.post-content-footer a:visited`.
 * --noticeable-widget-popup-post-content-h1 | Mixin applied to selector `.post-content h1`.
 * --noticeable-widget-popup-post-content-h2 | Mixin applied to selector `.post-content h2`.
 * --noticeable-widget-popup-post-content-h3 | Mixin applied to selector `.post-content h3`.
 * --noticeable-widget-popup-post-content-h4 | Mixin applied to selector `.post-content h4`.
 * --noticeable-widget-popup-post-content-h5 | Mixin applied to selector `.post-content h5`.
 * --noticeable-widget-popup-post-content-h6 | Mixin applied to selector `.post-content h6`.
 * --noticeable-widget-popup-post-content-img | Mixin applied to selector `.post-content img`.
 * --noticeable-widget-post-content-link-color | Custom property used to alter links color. The default value is based on the project accent color.
 * --noticeable-widget-popup-post-content-value | Mixin applied to selector `.post-content-value`.
 * --noticeable-widget-popup-post-header | Mixin applied to selector `.post-header`.
 * --noticeable-widget-popup-post-header-a | Mixin applied to selector `.post-header a`.
 * --noticeable-widget-popup-post-header-a-hover | Mixin applied to selector `.post-header a:hover`.
 * --noticeable-widget-popup-post-header-a-visited | Mixin applied to selector `.post-header a:visited`.
 * --noticeable-widget-popup-post-header-back | Mixin applied to selector `.post-header-back`.
 * --noticeable-widget-post-header-title | Mixin applied to selector `.post-header-title`.
 * --noticeable-widget-sliding-pages | Mixin applied to selector `noticeable-widget-sliding-pages`.
 * --noticeable-widget-spinner-background-color | Custom property controlling the background color of the spinner used when loading posts.
 * --noticeable-widget-spinner-foreground-color | Custom property controlling the foreground color of the spinner used when loading posts.
 * --noticeable-widget-trigger | Mixin applied to selector `#trigger`.
 * --noticeable-widget-trigger-badge | Mixin applied to selector `#trigger-badge`.
 * --noticeable-widget-trigger-badge-counter | Mixin applied to selector `#trigger-badge-counter`.
 * --noticeable-widget-trigger-badge-disabled | Mixin applied to selector `.trigger-badge-disabled`.
 * --noticeable-widget-trigger-badge-enabled | Mixin applied to selector `trigger-badge-enabled`.
 * --noticeable-widget-trigger-eye-catching | Mixin applied to selector `.eye-catching`.
 * --noticeable-widget-trigger-eye-catching-hover | Mixin applied to selector `.eye-catching:hover`.
 *
 * @polymer
 * @customElement
 */
class NoticeableWidgetPopup extends PolymerElement {
    static get template() {
        return html`
        <style>
            [hidden] {
                display: none !important;
            }

            :host {
                font-size: 15px;
                touch-action: manipulation;
            }

            * {
                white-space: normal;
            }

            iron-dropdown {
                @apply --noticeable-widget-dropdown;
            }

            noticeable-widget-label {
                margin-right: 4px;

                @apply --noticeable-widget-label;
            }

            noticeable-widget-sliding-pages {
                contain: content;

                @apply --noticeable-widget-sliding-pages;
            }

            /**
             * Workaround to fix main document style leak in this widget:
             * https://github.com/webcomponents/shadydom/issues/232
             */
            p {
                margin: 1em 0px;
            }

            #popup-container {
                background-color: white;
                border: 1px solid #e5e5e5;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
                color: #424242;
                line-height: 1.26em;
                max-height: none !important;
                overflow-y: hidden;
                padding: 0;
                width: 400px;
                z-index: 99999;

                @apply --noticeable-widget-popup-container;
            }

            #trigger {
                cursor: pointer;
                display: inline-block;

                @apply --noticeable-widget-trigger;
            }

            #trigger-badge {
                display: inline-block;

                @apply --noticeable-widget-trigger-badge;
            }

            #trigger-badge-counter {
                font-size: 11px;
                font-weight: bold;
                text-align: center;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;

                @apply --noticeable-widget-trigger-badge-counter;
            }

            .emoji {
                height: 1em;
                width: 1em;
                margin: 0 .1em;

                @apply --noticeable-widget-emoji;
            }

            .eye-catching {
                animation: eye-catching-shake 2.6s infinite;

                @apply --noticeable-widget-trigger-eye-catching;
            }

            .eye-catching:hover {
                animation: none;

                @apply --noticeable-widget-trigger-eye-catching-hover;
            }

            @keyframes eye-catching-pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(209, 14, 0, 0);
                }
                40% {
                    box-shadow: 0 0 0 5px rgba(224, 22, 29, 0.3);
                }
            }

            @keyframes eye-catching-shake {
                4%, 20% {
                    transform: translate3d(-1px, -10px, 0);
                }
                8%, 32% {
                    transform: translate3d(2px, 0, 0);
                }
                12%, 20%, 28% {
                    transform: translate3d(-3px, 0, 0);
                }
                16%, 24% {
                    transform: translate3d(2px, 0, 0);
                }
                32% {
                    transform: translate3d(0, 0, 0);
                }
            }

            .labels {
                display: inline-flex;
                margin-right: 4px;

                @apply --noticeable-widget-popup-entry-labels;
            }

            .popup-content {
                overflow-y: auto;

                @apply --noticeable-widget-popup-content;
            }

            .popup-footer {
                border-top: 1px solid #e5e5e5;
                color: #999;
                font-size: 92%;
                padding: 12px 16px;
                text-align: center;

                @apply --noticeable-widget-popup-footer;
            }

            .popup-footer a {
                color: #999;
                text-decoration: underline;

                @apply --noticeable-widget-popup-footer-a;
            }

            .popup-footer a:hover {
                text-decoration: none;

                @apply --noticeable-widget-popup-footer-a-hover;
            }

            .popup-footer a:visited {
                @apply --noticeable-widget-popup-footer-a-visited;
            }

            .popup-header {
                border-bottom: 1px solid #e5e5e5;
                font-weight: bold;
                padding: 16px;
                text-align: center;

                @apply --noticeable-widget-popup-header;
            }

            .popup-header a {
                color: inherit;
                text-decoration: none;

                @apply --noticeable-widget-popup-header-a;
            }

            .popup-header a:hover {
                @apply --noticeable-widget-popup-header-a-hover;
            }

            .popup-header a:visited {
                @apply --noticeable-widget-popup-header-a-visited;
            }

            .popup-entry {
                border-bottom: 1px solid #e5e5e5;
                cursor: pointer;
                padding: 16px 12px;
                border-left: 3px solid var(--noticeable-widget-popup-entry-unread-border-color, #1e88e5);

                @apply --noticeable-widget-popup-entry;
            }

            .popup-entry:hover {
                background-color: #f1f1f1;

                @apply --noticeable-widget-popup-entry-hover;
            }

            .popup-entry:last-of-type {
                border: 0;
                border-left: 3px solid var(--noticeable-widget-popup-entry-unread-border-color, #1e88e5);

                @apply --noticeable-widget-popup-entry-last-of-type;
            }

            .popup-entry-read {
                border-left: 0 !important;

                @apply --noticeable-widget-popup-entry-read;
            }

            .popup-entry-read:hover {
                @apply --noticeable-widget-popup-entry-read-hover;
            }

            .popup-entry .title {
                font-weight: bold;
                margin-right: 2px;
                word-wrap: break-word;

                @apply --noticeable-widget-popup-entry-title;
            }

            .popup-entry .excerpt {
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                
                @apply --noticeable-widget-popup-entry-excerpt;
            }

            .post-content {
                line-height: 1.4em;
                max-height: 350px;
                overflow-y: auto;
                padding-bottom: 8px;
                word-wrap: break-word;

                @apply --noticeable-widget-popup-post-content;
            }

            .post-content-value {
                @apply --noticeable-widget-popup-post-content-value;
            }

            .post-content a {
                color: var(--noticeable-widget-post-content-link-color, #1f55ff);
                text-decoration: underline;

                @apply --noticeable-widget-popup-post-content-a;
            }

            .post-content a:hover {
                text-decoration: none;

                @apply --noticeable-widget-popup-post-content-a-hover;
            }

            .post-content h1 {
                color: #414141;
                font-size: 19px;
                font-weight: bold;
                line-height: 24px;
                margin: 26px 0 0 0;
                @apply --noticeable-widget-popup-post-content-h1;
            }

            .post-content h2 {
                color: #414141;
                font-size: 17px;
                font-weight: bold;
                line-height: 24px;
                margin: 26px 0 0 0;
                @apply --noticeable-widget-popup-post-content-h2;
            }

            .post-content h3 {
                color: #414141;
                font-size: 15px;
                font-weight: bold;
                line-height: 24px;
                margin: 26px 0 0 0;
                @apply --noticeable-widget-popup-post-content-h3;
            }

            .post-content h4 {
                color: #414141;
                font-size: 14px;
                line-height: 24px;
                margin: 26px 0 0 0;
                @apply --noticeable-widget-popup-post-content-h4;
            }

            .post-content h5 {
                color: #515151;
                font-size: 13px;
                line-height: 24px;
                margin: 26px 0 0 0;
                @apply --noticeable-widget-popup-post-content-h5;
            }

            .post-content h6 {
                color: #717171;
                font-size: 13px;
                line-height: 24px;
                margin: 26px 0 0 0;
                @apply --noticeable-widget-popup-post-content-h6;
            }

            .post-content img {
                max-width: 100%;

                @apply --noticeable-widget-popup-post-content-img;
            }

            .post-content-footer {
                border: 1px solid #e5e5e5;
                border-radius: 4px;
                display: inline-block;
                margin: 4px 16px 16px 16px;
                padding: 8px 12px;

                @apply --noticeable-widget-popup-post-content-footer;
            }

            .post-content-footer:hover {
                background-color: #f1f1f1;

                @apply --noticeable-widget-popup-post-content-footer-hover;
            }

            .post-content-footer a {
                color: #999;
                text-decoration: none;

                @apply --noticeable-widget-popup-post-content-footer-a;
            }

            .post-content-footer a:hover {
                @apply --noticeable-widget-popup-post-content-footer-a-hover;
            }

            .post-content-footer a:visited {
                @apply --noticeable-widget-popup-post-content-footer-a-visited;
            }

            .post-content-feedback {
                padding: 0 16px 8px 16px;
                position: relative;
            }
            
            .post-content-feedback paper-icon-button {
                color: #424242;
                display: none;
                bottom: 16px;
                position: absolute;
                right: 20px;
            }
            
            .post-content-feedback paper-icon-button:hover {
                color: var(--noticeable-widget-textarea-hover-color, #1e88e5);
            }
            
            .post-content-feedback iron-autogrow-textarea {
                border: 1px solid #e5e5e5;
                border-radius: 4px;
                display: block;
                width: auto;
                --iron-autogrow-textarea: {
                    box-sizing: border-box;
                    padding: 16px;
                };
            }
            
            .post-content-feedback:hover > iron-autogrow-textarea {
                border: 1px solid transparent;
                box-shadow: 0 0 5px var(--noticeable-widget-textarea-hover-color, #1e88e5);
            }
            
            .post-content-feedback-sent {
                font-style: italic;
                padding: 8px 16px 24px 16px;
                text-align: center;
            }
            
            .post-content-reactions {
                padding: 0 16px 8px 16px;
                text-align: center;
                user-select: none;
            }
            
            .post-content-reactions img {
                margin: 0 3px;
                -webkit-transition: all 350ms cubic-bezier(.175, .885, .25, 1.5);
                transition: all 350ms cubic-bezier(.175, .885, .25, 1.5);
                width: 32px;
            }
            
            .post-content-reactions img[selected=false] {
                filter: grayscale(100%);
            }
            
            .post-content-reactions img[selected=true] {
                cursor: initial !important;
                transform: scale(1.2);
            }
            
            .post-content-reactions img:hover {
                cursor: pointer;
                transform: scale(1.2);
            }
            
            .post-content-reactions-title {
                font-weight: 500;
            }

            .post-header {
                border-bottom: 1px solid #e5e5e5;
                font-weight: bold;
                position: relative;
                text-align: center;

                @apply --noticeable-widget-popup-post-header;
            }

            .post-header a {
                color: inherit;
                text-decoration: none;

                @apply --noticeable-widget-popup-post-header-a;
            }

            .post-header a:hover {
                @apply --noticeable-widget-popup-post-header-a-hover;
            }

            .post-header a:visited {
                @apply --noticeable-widget-popup-post-header-a-visited;
            }

            .post-header-back {
                left: 8px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);

                @apply --noticeable-widget-popup-post-header-back;
            }

            .post-header-title {
                font-weight: bold;
                padding: 16px 48px 16px 56px;
                overflow: hidden;
                text-align: center;

                @apply --noticeable-widget-post-header-title;
            }

            .powered-by:before {
                content: ' ';
            }

            .trigger-badge-disabled {
                background-color: #d3d3d3;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                justify-content: center;
                flex-direction: column;
                height: 9.9px;
                text-align: center;
                text-decoration: none;
                transform: matrix(1, 0, 0, 1, 0, 0);
                transition-delay: 0s;
                transition-duration: 0.4s;
                transition-property: all;
                transition-timing-function: ease;
                user-select: none;
                width: 9.9px;

                @apply --noticeable-widget-trigger-badge-disabled;
            }

            .trigger-badge-enabled {
                align-content: center;
                background-color: #e0161d;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                height: 16px;
                line-height: 16px;
                justify-content: center;
                text-align: center;
                text-decoration: none;
                transform: matrix(1, 0, 0, 1, 0, 0);
                transition-delay: 0s;
                transition-duration: 0.4s;
                transition-property: all;
                transition-timing-function: ease;
                user-select: none;
                vertical-align: middle;
                width: 16px;

                @apply --noticeable-widget-trigger-badge-enabled;
            }

            /** Spinner related styles */

            .spinner {
                padding: 36px 32px;
            }

            .spinner:before {
                animation: spinner 1s linear infinite;
                border: 3px solid var(--noticeable-widget-spinner-background-color, #d1d1d1);
                border-radius: 50%;
                border-top-color: var(--noticeable-widget-spinner-foreground-color, #999999);
                box-sizing: border-box;
                content: '';
                height: 24px;
                left: 50%;
                margin-top: -10px;
                margin-left: -10px;
                position: absolute;
                top: 50%;
                width: 24px;
            }

            @keyframes spinner {
                to {
                    transform: rotate(360deg);
                }
            }

            /** Markdown related styles */

            /*
              Atom One Dark by Daniel Gamage
              Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax/tree/master/styles/syntax
            */

            .hljs-comment,
            .hljs-quote {
                color: #5c6370;
                font-style: italic;
            }

            .hljs-doctag,
            .hljs-keyword,
            .hljs-formula {
                color: #c678dd;
            }

            .hljs-section,
            .hljs-name,
            .hljs-selector-tag,
            .hljs-deletion,
            .hljs-subst {
                color: #e06c75;
            }

            .hljs-literal {
                color: #56b6c2;
            }

            .hljs-string,
            .hljs-regexp,
            .hljs-addition,
            .hljs-attribute,
            .hljs-meta-string {
                color: #98c379;
            }

            .hljs-built_in,
            .hljs-class .hljs-title {
                color: #e6c07b;
            }

            .hljs-attr,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-type,
            .hljs-selector-class,
            .hljs-selector-attr,
            .hljs-selector-pseudo,
            .hljs-number {
                color: #d19a66;
            }

            .hljs-symbol,
            .hljs-bullet,
            .hljs-link,
            .hljs-meta,
            .hljs-selector-id,
            .hljs-title {
                color: #61aeee;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: bold;
            }

            .hljs-link {
                text-decoration: underline;
            }

            blockquote {
                border-left: 3px solid #f1f1f1;
                color: #4d4d4d91;
                margin: 2px 0;
                padding: 0 16px;
            }

            pre {
                background: #282c34 !important;
                box-sizing: border-box;
                border-radius: 0 !important;
                color: #abb2bf !important;
                display: block;
                overflow-x: auto;
                padding: 8px !important;
            }

            pre code {
                background-color: transparent !important;
                padding: 0;
                white-space: pre-line;
            }

            code {
                background: #f1f1f1;
                border-radius: 2px;
                font-family: 'Roboto Mono', monospace;
                font-size: 14px;
                overflow-x: auto;
                padding: 1px 8px;
            }

            iframe {
                border: none;
                width: 100%;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            td {
                border-bottom: 2px solid #f1f1f1;
                padding: 10px 20px;
                text-align: left;
            }

            th {
                background-color: #f9f9f9;
                border-bottom: 2px solid #f1f1f1;
                padding: 10px 20px;
                text-align: left;
            }

            /**
             * Media queries for screens with small width (phones).
             */

            @media only screen and (max-width: 600px) {

                #popup-container {
                    max-height: none !important;
                    max-width: 400px !important;
                    margin: 8px;
                    width: auto !important;

                    @apply --noticeable-widget-popup-container-for-phone;
                }

            }

        </style>

        <iron-ajax id="apiAjax" content-type="application/json" handle-as="json" headers\$="{&quot;Authorization&quot;: &quot;Apikey [[accessToken]]&quot;}" on-error="_handleDataError" on-response="_handleDataResponse" url="[[apiUrl]]"></iron-ajax>

        <iron-ajax
                id="feedbackPostAjax"
                content-type="application/x-www-form-urlencoded"
                handle-as="text"
                method="POST"
                url="https://metrics.noticeable.io/feedback"></iron-ajax>

        <iron-ajax
                id="reactionsPostAjax"
                content-type="application/x-www-form-urlencoded"
                handle-as="text"
                method="POST"
                url="https://metrics.noticeable.io/reactions"></iron-ajax>

        <iron-ajax id="widgetTriggerClickAjax" content-type="application/x-www-form-urlencoded" handle-as="text" method="POST" timeout="3000" url="[[_env.endpoints.metrics]]/clicks/widget/trigger"></iron-ajax>

        <iron-ajax id="widgetViewPostAjax" content-type="application/x-www-form-urlencoded" handle-as="text" method="POST" timeout="3000" url="[[_env.endpoints.metrics]]/views/widget/post"></iron-ajax>

        <div id="trigger" on-click="toggle" slot="dropdown-trigger">
            <slot></slot>
            <slot name="badge">
                <div id="trigger-badge" class="trigger-badge-disabled" hidden="[[!_showTriggerBadge(_dataLoaded, _unSeenPostCount, triggerSoftHide)]]">
                    <div id="trigger-badge-counter" hidden="[[!_showBadgeCounter(triggerDisplayCounter, _unSeenPostCount)]]">[[_unSeenPostCount]]
                    </div>
                </div>
            </slot>
        </div>

        <iron-dropdown id="popup" allow-outside-scroll="[[popupOutsideScroll]]" dynamic-align="[[popupDynamicAlign]]" horizontal-align="[[popupHorizontalAlign]]" horizontal-offset="[[popupHorizontalOffset]]" no-cancel-on-esc-key="[[!closeOnEscKey]]" no-cancel-on-outside-click="[[!closeOnOutsideClick]]" no-overlap="" on-iron-overlay-closed="_onPopupClosed" on-iron-overlay-opened="_onPopupOpened" opened="{{opened}}" vertical-align="[[popupVerticalAlign]]" vertical-offset="[[popupVerticalOffset]]" with-backdrop="[[popupBackdrop]]">

            <div id="popup-container" slot="dropdown-content">
                <noticeable-widget-sliding-pages id="sliding-pages" hidden="[[!_dataLoaded]]" on-page-change="_onPageChange">
                    <div>
                        <template is="dom-if" if="[[popupHeader]]">
                            <div class="popup-header">
                                <a href="[[_timelineUrl]]/" target="noticeable-timeline" title="[[popupHeader]]">[[popupHeader]]</a>
                            </div>
                        </template>
                        <div class="popup-content">
                            <template is="dom-repeat" items="[[_postData]]">
                                <div class\$="popup-entry [[_getPostReadClass(item.id)]]" id\$="[[item.id]]" on-click="_openPost">
                                    <div class="labels">
                                        <template is="dom-repeat" items="[[item.labels]]" as="label">
                                            <noticeable-widget-label color="[[label.color]]" name="[[label.name]]"></noticeable-widget-label>
                                        </template>
                                    </div><!-- This comment prevents the insertion of a space upon formatting --><span class="title" inner-h-t-m-l="[[item.title]]"></span>
                                    <span class="excerpt" inner-h-t-m-l="[[item.excerpt]]"></span>
                                </div>
                            </template>
                        </div>
                        <template is="dom-if" if="[[popupFooter]]">
                            <div class="popup-footer">
                                <div>
                                    <a href="[[_timelineUrl]]/" target="noticeable-timeline" title="[[popupFooter]]">[[popupFooter]]</a>
                                    <template is="dom-if" if="[[!whiteLabel]]">
                                        <span class="powered-by">
                                            powered by <a href="https://noticeable.io" target="_blank" title="Noticeable - Make your updates visible.">Noticeable</a>
                                        </span>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div>
                        <div class="post-header">
                            <div class="post-header-back">
                                <paper-icon-button alt="[[postBackLink]]" icon="noticeable-widget:arrow-back" on-tap="_showPosts"></paper-icon-button>
                            </div>
                            <div class="post-header-title">
                                <a href="[[_postHeaderTitleLink(_post)]]" inner-h-t-m-l="[[_post.title]]" target="noticeable-post" title="[[_post.rawTitle]]"></a>
                            </div>
                        </div>

                        <div class="post-content">
                            <div class="post-content-value" inner-h-t-m-l="[[_post.content]]"></div>

                            <template is="dom-if" if="[[_post.reactions]]">
                                <div class="post-content-reactions">
                                    <p class="post-content-reactions-title" hidden="[[!postReactionsTitle]]">[[postReactionsTitle]]</p>
                                    <p>
                                        <img aria-labelledby="badReaction"
                                             id="badReaction"
                                             on-tap="_sendBadReaction"
                                             src="https://images.noticeable.cloud/reactions/bad.svg"/>

                                        <img aria-labelledby="neutralReaction"
                                             id="neutralReaction"
                                             on-tap="_sendNeutralReaction"
                                             src="https://images.noticeable.cloud/reactions/neutral.svg"/>

                                        <img aria-labelledby="goodReaction"
                                             id="goodReaction"
                                             on-tap="_sendGoodReaction"
                                             src="https://images.noticeable.cloud/reactions/good.svg"/>
                                    </p>
                                </div>
                            </template>

                            <template is="dom-if" if="[[_displayFeedbackForm]]">
                                <div class="post-content-feedback">
                                    <iron-autogrow-textarea
                                            rows="4"
                                            placeholder="[[postFeedbackTextareaPlaceholder]]"
                                            value="{{_feedbackComment}}"></iron-autogrow-textarea>
                                    <paper-icon-button
                                            alt="Send"
                                            id="sendFeedback"
                                            icon="noticeable-widget:send"
                                            on-tap="_sendFeedback"></paper-icon-button>
                                </div>
                            </template>

                            <template is="dom-if" if="[[_displayFeedbackSentMessage]]">
                                <div class="post-content-feedback-sent" hidden="[[!postFeedbackSentMessage]]">
                                    [[postFeedbackSentMessage]]
                                </div>
                            </template>

                            <template is="dom-if" if="[[postContentFooter]]">
                                <div class="post-content-footer">
                                    <a href="[[_timelineUrl]]/posts/[[_post.slug]]" target="noticeable-post" title="[[postContentFooter]]">[[postContentFooter]]</a>
                                </div>
                            </template>
                        </div>
                    </div>
                </noticeable-widget-sliding-pages>
                <div hidden="[[_dataLoaded]]" slot="dropdown-content">
                    <div class="spinner"></div>
                </div>
            </div>
        </iron-dropdown>
`;
    }

    static get is() {
        return 'noticeable-widget-popup';
    }

    static get observers() {
        return [
            '_onParameterChange(accessToken, projectId, _segments)'
        ]
    }

    static get properties() {
        return {
            /**
             * The access token used to fetch data from the API.
             */
            accessToken: {
                type: String,
            },
            /**
             * The API URL used for fetching widget data.
             */
            apiUrl: {
                type: String,
                value: env.endpoints.api
            },
            /**
             * The minimum delay (in ms) to wait before fetching the widget content again.
             *
             * If the value is lower than _0_, then the auto-refresh is disabled.
             *
             * The default value is _-1_.
             */
            autoRefresh: {
                observer: '_onAutoRefreshChange',
                type: Number,
                value: undefined
            },
            /**
             * Set to _true_ to disable closing the widget with the _ESC_ key.
             *
             * The default value is _true_.
             */
            closeOnEscKey: {
                type: Object,
                value: undefined
            },
            /**
             * Set to _true_ to disable closing the widget by clicking outside the popup.
             *
             * The default value is _true_.
             */
            closeOnOutsideClick: {
                type: Object,
                value: undefined
            },
            /**
             * The maximum number of entries to fetch. The value must be in the range _[1,9]_.
             *
             * The default value is _3_.
             */
            fetchLimit: {
                type: Number,
                value: undefined
            },
            /**
             * After the specified time (in ms), widget posts are automatically marked as
             * seen. A value lower than _0_ means the feature is disabled.
             *
             * The default value is _-1_.
             */
            markAsSeenAfter: {
                type: Number,
                value: undefined
            },
            /**
             * When enabled, all widget requests go straight to Noticeable servers bypassing caching layers.
             * This ensures data freshness at the cost of higher response times.
             *
             * The default value is _false_.
             */
            noCache: {
                type: Boolean,
                value: false
            },
            /**
             * Define whether the widget must appear opened by default.
             * The widget is considered opened if its popup is visible.
             *
             * The default value is _false_.
             */
            opened: {
                notify: true,
                type: Object,
                value: undefined
            },
            /**
             * Set to true to display a backdrop behind the popup when it is opened.
             *
             * Allowed values are _false_ or _true_. The default value is _false_.
             *
             * The widget with backdrop is styled to appear on top of other content by setting its
             * `z-index` property. However, you must ensure no element has a stacking context with a higher
             * `z-index` than its parent stacking context.
             */
            popupBackdrop: {
                type: Object,
                value: undefined
            },
            /**
             * If _true_, it will use _popupHorizontalAlign_ and _popupVerticalAlign_ values as preferred
             * alignment and if there's not enough space, it will pick the values which minimize the cropping.
             *
             * The default value is _true_.
             */
            popupDynamicAlign: {
                type: Object,
                value: undefined
            },
            /**
             * The text to use as the popup footer description.
             * If empty, then no footer bar appears.
             *
             * The default value is _empty_.
             */
            popupFooter: {
                type: String,
                value: undefined
            },
            /**
             * The text to use as the popup title.
             * If empty, no header bar appears.
             *
             * The default value is _empty_.
             */
            popupHeader: {
                type: String,
                value: undefined
            },
            /**
             * The orientation against which to align the popup horizontally relative to the trigger.
             *
             * Allowed values are _center_, _left_ or _right_. The default value is _left_.
             */
            popupHorizontalAlign: {
                type: String,
                value: undefined
            },
            /**
             * A pixel value that will be added to the position calculated for the
             * given `popupHorizontalAlign`, in the direction of alignment. You can think
             * of it as increasing or decreasing the distance to the side of the
             * screen given by `popupHorizontalAlign`.
             *
             * If `popupHorizontalAlign` is "left", this offset will increase or decrease
             * the distance to the left side of the screen: a negative offset will
             * move the popup to the left; a positive one, to the right.
             *
             * Conversely if `popupHorizontalAlign` is "right", this offset will increase
             * or decrease the distance to the right side of the screen: a negative
             * offset will move the dropdown to the right; a positive one, to the left.
             *
             * The default value is _0_.
             */
            popupHorizontalOffset: {
                type: Number,
                value: undefined,
            },
            /**
             * By default, the popup will constrain scrolling on the page to itself when opened.
             * Set to _true_ in order to prevent scroll from being constrained to the popup when it opens.
             *
             * The default value is _false_.
             */
            popupOutsideScroll: {
                type: Object,
                value: undefined
            },
            /**
             * The orientation against which to align the popup vertically relative to the trigger.
             *
             * Allowed values are _bottom_ or _top_. The default value is _top_.
             */
            popupVerticalAlign: {
                type: String,
                value: undefined
            },
            /**
             * A pixel value that will be added to the position calculated for the
             * given `popupVerticalAlign`, in the direction of alignment. You can think
             * of it as increasing or decreasing the distance to the side of the
             * screen given by `popupVerticalAlign`.
             *
             * If `popupVerticalAlign` is "top", this offset will increase or decrease
             * the distance to the top side of the screen: a negative offset will
             * move the popup upwards; a positive one, downwards.
             *
             * Conversely if `popupVerticalAlign` is "bottom", this offset will increase
             * or decrease the distance to the bottom side of the screen: a negative
             * offset will move the dropdown downwards; a positive one, upwards.
             *
             * The default value is _10_.
             */
            popupVerticalOffset: {
                type: Number,
                value: undefined,
            },
            /**
             * The text associated with button to move back to the post list from a post.
             */
            postBackLink: {
                type: String,
                value: undefined
            },
            /**
             * The text to display at the bottom of a post content.
             * If not empty, clicking on the text opens the post on the timeline.
             * If empty, then nothing appears.
             */
            postContentFooter: {
                type: String,
                value: undefined
            },
            /**
             * The label associated with the button used to send feedback.
             */
            postFeedbackSendButtonLabel: {
                type: String,
                value: undefined
            },
            /**
             * The text to display once the feedback form is submitted.
             */
            postFeedbackSentMessage: {
                type: String,
                value: undefined
            },
            /**
             * The text to display above the feedback textarea form.
             */
            postFeedbackTextareaPlaceholder: {
                type: String,
                value: undefined
            },
            /**
             * The text to display above the emojis reaction icons.
             */
            postReactionsTitle: {
                type: String,
                value: undefined
            },
            /**
             * The text associated with the 'bad' emoji reaction.
             */
            postReactionsLegendBad: {
                type: String,
                value: undefined
            },
            /**
             * The text associated with the 'neutral' emoji reaction.
             */
            postReactionsLegendNeutral: {
                type: String,
                value: undefined
            },
            /**
             * The text associated with the 'good' emoji reaction.
             */
            postReactionsLegendGood: {
                type: String,
                value: undefined
            },
            /**
             * Defines the maximum number of characters for post summaries.
             *
             * Allowed values are between _0_ and _240_. The default value is _140_.
             */
            postExcerptMaxLength: {
                type: Object,
                value: undefined
            },
            /**
             * Defines where to open the content related to a post excerpt.
             *
             * Allowed values are _timeline_ or _widget_. The default value is _widget_.
             */
            postExcerptTarget: {
                type: Object,
                value: undefined
            },
            /**
             * The project ID used to fetch data from the API.
             */
            projectId: {
                type: String
            },
            /**
             * A comma separated list of segmentation filters used to target specific groups of users.
             *
             * This property cannot be defined remotely from noticeable.io.
             **/
            segments: {
                observer: '_onSegmentsChange',
                type: String
            },
            /**
             * Considers local attribute definitions only when enabled.
             * Settings defined on the noticeable.io service are ignored.
             *
             * Allowed values are _false_ or _true_.
             */
            skipRemoteSettings: {
                type: Object,
                value: false
            },
            /**
             * Defines whether the trigger must include the number of posts which have not yet been seen.
             * This property makes sense only when the badge is visible.
             *
             * Allowed values are _false_ or _true_. The default value is _true_.
             */
            triggerDisplayCounter: {
                type: Object,
                value: undefined
            },
            /**
             * Delay to wait (in ms) before showing the trigger once widget data has been fetched.
             *
             * The default value is _0_.
             */
            triggerDisplayAfter: {
                type: Number,
                value: undefined
            },
            /**
             * When enabled, animates the trigger to increase its visibility and encourage people tapping on it.
             *
             * Allowed values are _false_ or _true_. The default value is _true_.
             */
            triggerEyeCatching: {
                type: Object,
                value: undefined
            },
            /**
             * When enabled, animates the trigger to encourage people tapping on it.
             *
             * This property cannot be defined remotely from noticeable.io. It is used in advanced
             * customization scenarios to select the inner element where the eye catching animation
             * must be applied.
             */
            triggerEyeCatchingTargetSelector: {
                type: String,
                value: '#trigger-badge'
            },
            /**
             * When enabled, prevents the badge trigger to be hidden even if all posts have been seen.
             *
             * Allowed values are _false_ or _true_. The default value is _true_.
             *
             * If you need to hide the badge until post data are fetched, you need to set
             * this property to _false_ programmatically.
             */
            triggerSoftHide: {
                type: Object,
                value: undefined
            },
            /**
             * When _true_, hide all _Noticeable_ branding from the widget.
             *
             * Allowed values are _false_ or _true_. The default value is _false_.
             */
            whiteLabel: {
                type: Object,
                value: undefined
            },


            _env: {
                type: Object
            },

            _autoRefreshTimer: {
                type: Object
            },
            _customDomain: {
                type: Object
            },
            _dataLoaded: {
                type: Boolean,
                value: false,
            },
            _displayFeedbackForm: {
                type: Boolean
            },
            _displayFeedbackSentMessage: {
                type: Boolean
            },
            _displayPostContentFooter: {
                type: Boolean,
            },
            _feedbackComment: {
                observer: '_onFeedbackCommentChange',
                type: String
            },
            _graphqlQuery: {
                type: String
            },
            _localStorageKey: {
                computed: '_computeLocalStorageKey(projectId, segments)',
                type: String
            },
            _newPostSeen: {
                type: Array
            },
            _post: {
                type: Object
            },
            _postData: {
                type: Object,
            },
            _postDataMap: {
                type: Object,
            },
            _projectSettings: {
                type: Object,
                value: undefined
            },
            _segments: {
                type: Array
            },
            _timelineUrl: {
                computed: '_computeTimelineUrl(_customDomain)',
                type: String
            },
            _unSeenPostCount: {
                observer: '_onUnSeenPostCountChange',
                type: Number,
                value: undefined
            },
        }
    }

    constructor() {
        super();

        /**
         * Fired when the element is upgraded (that is, when the element is created,
         * or when a previously-created element becomes defined).
         *
         * @event noticeable-widget-created
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-created', {bubbles: true, composed: true}));
    }

    /**
     * Closes the popup, if opened.
     */
    close() {
        this.$.popup.close();
    }

    connectedCallback() {
        super.connectedCallback();

        /**
         * Fired when the element is added to a document.
         *
         * @event noticeable-widget-connected
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-connected', {bubbles: true, composed: true}));
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        /**
         * Fired when the element is removed from a document.
         *
         * @event noticeable-widget-disconnected
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-disconnected', {bubbles: true, composed: true}));
    }

    /**
     * Injects a CSS definition as a new child element of the shadow root.
     *
     * You must wait for event `noticeable-widget-ready` before invoking this method,
     * otherwise the call will fail.
     */
    injectCSS(def) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = def;
        this.shadowRoot.appendChild(style);
    }

    /**
     * Opens the popup, if closed.
     */
    open() {
        this.$.popup.open();
    }

    ready() {
        super.ready();

        this._env = env;

        const apiAjax = this.$.apiAjax;

        apiAjax.addEventListener('iron-ajax-presend', (e) => {
            if (apiAjax.activeRequests && apiAjax.activeRequests.length > 1) {
                for (let i = 0; i < apiAjax.activeRequests.length - 1; i++) {
                    apiAjax.activeRequests[i].abort();
                }
            }
        });

        /**
         * Fired when the component is ready.
         *
         * The element's template has been instantiated and initial property values have been set.
         * However, light DOM elements may not have been distributed.
         *
         * @event noticeable-widget-ready
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-ready', {bubbles: true, composed: true}));
    }

    /**
     * Define segmentation filters to use for targeting specific users.
     */
    setSegments(array) {
        if (Array.isArray(array)) {
            this._segments = array;
        } else {
            console.error('The argument passed to \'setSegment\' must be an array of Strings.');
        }
    }

    /**
     * Toggles the opened state of the popup: opens it if closed or closes it if opened.
     */
    toggle() {
        if (!this.opened) {
            this.$.popup.open();
        } else {
            this.$.popup.close();
        }
    }

    _checkFetchLimitValue() {
        if (this.fetchLimit < 1) {
            console.warn(
                "The value for the attribute 'fetch-limit' must be in range [1,9] but it contains "
                + this.fetchLimit + ", the value has been forced to 1.");

            this.fetchLimit = 1;
        }

        if (this.fetchLimit > 9) {
            console.warn(
                "The value for the attribute 'fetch-limit' must be in range [1,9] but it contains "
                + this.fetchLimit + ", the value has been forced to 9.");

            this.fetchLimit = 9;
        }
    }

    _computeLocalStorageKey(projectId, segments) {
        return sha3_256(projectId + '@' + segments);
    }

    _computeTriggerState(posts) {
        let postIdAlreadySeen = this._getLocalStorageItem('posts:seen');

        if (!postIdAlreadySeen) {
            postIdAlreadySeen = [];
        }

        let newPostCount = 0;
        let postSeen = [];

        const now = new Date();
        const expirationDate = new Date(now.getTime() - this.markAsSeenAfter);

        posts.forEach(post => {
            const postId = post.id;

            let alreadySeen = false;

            if (this.markAsSeenAfter >= 0
                && new Date(post.publicationTime) < expirationDate) {
                alreadySeen = true;
            } else {
                // no need for a map since iteration is done on at most 9 items
                for (const index in postIdAlreadySeen) {

                    if (postIdAlreadySeen[index] === postId) {
                        alreadySeen = true;
                        break;
                    }
                }
            }

            if (!alreadySeen) {
                newPostCount++;
            }

            postSeen.push(postId);
        });

        this._newPostSeen = postSeen;
        this._unSeenPostCount = newPostCount;
    }

    _computeTimelineUrl(customDomain) {
        if (customDomain && customDomain.verified) {
            return `https://${customDomain.name}`;
        } else {
            return `${env.endpoints.timeline}/${this.projectId}`;
        }
    }

    _isInteger(value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }

    _onAutoRefreshChange(newValue) {
        if (newValue && this._isInteger(newValue) && newValue >= 0) {
            if (this._autoRefreshTimer) {
                clearTimeout(this._autoRefreshTimer);
            }

            if (newValue < 60000) {
                console.warn(
                    'The Noticeable widget does not allow refreshing more frequently than every minute. '
                    + 'Auto refresh value set to 60 seconds.');
                newValue = 60000;
            }

            this._autoRefreshTimer = setInterval(() => {
                this.$['apiAjax'].generateRequest();
            }, newValue);
        } else {
            if (this._autoRefreshTimer) {
                clearTimeout(this._autoRefreshTimer);
                this._autoRefreshTimer = undefined;
            }
        }
    }

    _onFeedbackCommentChange(comment) {
        const paperIconButton = this.shadowRoot.querySelector('#sendFeedback');
        if (paperIconButton) {
            paperIconButton.style.display =
                !comment || comment.trim().length === 0 ? 'none' : 'block';
        }
    }

    _updateBadge(isBadgeAlreadyVisible) {
        if (this.triggerDisplayAfter > 0) {
            setTimeout(() => {
                this._dataLoaded = true;
                this.$.popup.notifyResize();
                this._fireBadgeVisibleEvent(isBadgeAlreadyVisible);
            }, this.triggerDisplayAfter);
        } else {
            this._dataLoaded = true;
            this.$.popup.notifyResize();
            this._fireBadgeVisibleEvent(isBadgeAlreadyVisible);
        }
    }

    _emojify(text) {
        if (typeof twemoji === 'undefined') {
            return text;
        }

        return twemoji.parse(text);
    }

    _fireBadgeVisibleEvent(isBadgeAlreadyVisible) {
        if (isBadgeAlreadyVisible) {
            return;
        }

        /**
         * Fired when the badge associated to the widget badge is visible.
         *
         * @event noticeable-widget-badge-visible
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-badge-visible', {
            bubbles: true,
            composed: true,
            detail: {
                unSeenPostCount: this._unSeenPostCount
            }
        }));
    }

    _handleDataError(event) {
        if (event.detail.request.aborted) {
            return;
        }

        console.error('Error while fetching widget data');

        let response = event.detail.request.xhr.response;

        if (response) {
            if (response.errors) {
                response.errors.forEach(error => {
                    console.error(error.message);
                });
            } else {
                console.error(response.errors);
            }
        }
    }

    _handleDataResponse(event) {
        const response = event.detail.response;

        if (!response.errors) {
            const project = response.data.project;

            this._initializeData(project, project.posts.edges);
        } else {
            console.error('Error while fetching widget data from the API:', response.errors);
        }
    }

    _initializeData(projectSettings, postEdges) {
        this._customDomain = projectSettings ? projectSettings.timeline.customDomain : null;
        const widgetSettings = projectSettings ? projectSettings.widget : null;

        this._loadProperties(widgetSettings);

        if (projectSettings && projectSettings.accentColor) {
            const accentColor = tinycolor(projectSettings.accentColor);
            const hexString = accentColor.toHexString();
            this.updateStyles({
                '--noticeable-widget-popup-entry-unread-border-color': hexString,
                '--noticeable-widget-post-content-link-color': hexString,
                '--noticeable-widget-textarea-hover-color': hexString
            });
        }

        let postDataTmp = [];
        let postDataMapTmp = {};

        if (postEdges.length > this.fetchLimit) {
            postEdges = postEdges.slice(postEdges.length - this.fetchLimit, postEdges.length);
        }

        postEdges.forEach(edge => {
            let remainingChars = 0;

            edge.node.labels.forEach(label => {
                remainingChars -= label.name.length;
            });

            remainingChars -= edge.node.title.length;
            remainingChars += this.postExcerptMaxLength + 6;

            edge.node.rawTitle = edge.node.title;
            edge.node.content = this._emojify(edge.node.content.html);
            edge.node.excerpt = this._emojify(this._truncate(edge.node.excerpt, remainingChars));
            edge.node.title = this._emojify(edge.node.title);

            postDataTmp.push(edge.node);
            postDataMapTmp[edge.node.id] = edge.node;
        });

        this._postData = postDataTmp;
        this._postDataMap = postDataMapTmp;

        const _isBadgeAlreadyVisible = this._unSeenPostCount !== undefined;

        this._computeTriggerState(this._postData.reverse());

        this._updateBadge(_isBadgeAlreadyVisible);
    }

    _truncate(str, maxLength) {
        if (str === undefined || str == null) {
            return '';
        }

        if (str.length <= maxLength) {
            return str;
        }

        let indexLastSpace = -1;
        let iterationIndex = 0;

        while (iterationIndex < str.length) {
            const character = str.charAt(iterationIndex);
            if (character === ' ') {
                indexLastSpace = iterationIndex;
            }

            if (iterationIndex >= maxLength) {
                break;
            }

            iterationIndex++;
        }

        return str.substring(0, indexLastSpace === -1 ? maxLength : indexLastSpace) + '...';
    }

    _isDemonstrationModeEnabled() {
        return !this.accessToken || this.accessToken === 'YOUR_ACCESS_TOKEN'
            || !this.projectId || this.projectId === 'YOUR_PROJECT_ID';
    }

    _getPostReadClass(postId) {
        let postRead = this._getLocalStorageItem('posts:read');

        if (postRead && postRead.indexOf(postId) !== -1) {
            return 'popup-entry-read';
        } else {
            return '';
        }
    }

    /**
     * Load custom element property values from _noticeable.io_ if
     * `skipRemoteSettings` is `false`, otherwise default values are applied.
     * Please note local definitions have precedence over remote settings.
     */
    _loadProperties(remoteWidgetSettings) {
        if (!remoteWidgetSettings) {
            this.skipRemoteSettings = true;
        }

        this.autoRefresh = this._selectPropertyValue(
            this.autoRefresh, remoteWidgetSettings,
            (settings => settings.autoRefresh), 3600000
        );

        this.closeOnEscKey = this._selectPropertyValue(
            this.closeOnEscKey, remoteWidgetSettings,
            (settings => settings.closeOnEscKey), true
        );

        this.closeOnOutsideClick = this._selectPropertyValue(
            this.closeOnOutsideClick, remoteWidgetSettings,
            (settings => settings.closeOnOutsideClick), true
        );

        this.fetchLimit = this._selectPropertyValue(
            this.fetchLimit, remoteWidgetSettings,
            (settings => settings.fetchLimit), 3
        );

        this._checkFetchLimitValue();

        this.markAsSeenAfter = this._selectPropertyValue(
            this.markAsSeenAfter, remoteWidgetSettings,
            (settings => settings.markAsSeenAfter), -1
        );

        this.opened = this._selectPropertyValue(
            this.hasAttribute('opened') ? this.opened : this.$.popup.opened, remoteWidgetSettings,
            (settings => settings.opened), false
        );

        this.postExcerptMaxLength = this._selectPropertyValue(
            this.postExcerptMaxLength, remoteWidgetSettings,
            (settings => settings.postExcerptMaxLength), 140
        );

        this.postExcerptTarget = this._selectPropertyValue(
            this.postExcerptTarget, remoteWidgetSettings,
            (settings => settings.postExcerptTarget), 'widget'
        );

        this.popupOutsideScroll = this._selectPropertyValue(
            this.popupOutsideScroll, remoteWidgetSettings,
            (settings => settings.popup.allowOutsideScroll), false
        );

        this.popupDynamicAlign = this._selectPropertyValue(
            this.popupDynamicAlign, remoteWidgetSettings,
            (settings => settings.popup.useDynamicAlign), true
        );

        let defaultPopupFooterValue = '';

        if (this._isDemonstrationModeEnabled()) {
            defaultPopupFooterValue = 'Acme changelog';
        }

        this.popupFooter = this._selectPropertyValue(
            this.popupFooter, remoteWidgetSettings,
            (settings => settings.popup.footer), defaultPopupFooterValue
        );

        this.popupHeader = this._selectPropertyValue(
            this.popupHeader, remoteWidgetSettings,
            (settings => settings.popup.header), ''
        );

        this.popupHorizontalAlign = this._selectPropertyValue(
            this.popupHorizontalAlign, remoteWidgetSettings,
            (settings => settings.popup.horizontalAlign), 'left'
        );

        this.popupHorizontalOffset = this._selectPropertyValue(
            this.popupHorizontalOffset, remoteWidgetSettings,
            (settings => settings.popup.horizontalOffset), 0
        );

        this.popupNoCancelOnEscKey = this._selectPropertyValue(
            this.popupNoCancelOnEscKey, remoteWidgetSettings,
            (settings => settings.popup.noCancelOnEscKey), false
        );

        this.popupVerticalAlign = this._selectPropertyValue(
            this.popupVerticalAlign, remoteWidgetSettings,
            (settings => settings.popup.verticalAlign), 'top'
        );

        this.popupVerticalOffset = this._selectPropertyValue(
            this.popupVerticalOffset, remoteWidgetSettings,
            (settings => settings.popup.verticalOffset), 10
        );

        this.popupBackdrop = this._selectPropertyValue(
            this.popupBackdrop, remoteWidgetSettings,
            (settings => settings.popup.withBackdrop), true
        );

        this.postContentFooter = this._selectPropertyValue(
            this.postContentFooter, remoteWidgetSettings,
            (settings => settings.texts.postViewMoreButton), 'View more'
        );

        this.postBackLink = this._selectPropertyValue(
            this.postBackLink, remoteWidgetSettings,
            (settings => settings.texts.postBackLink), 'Back'
        );

        this.postFeedbackSendButtonLabel = this._selectPropertyValue(
            this.postFeedbackSendButtonLabel, remoteWidgetSettings,
            (settings => settings.texts.postFeedbackSendButtonLabel), 'Send'
        );

        this.postFeedbackSentMessage = this._selectPropertyValue(
            this.postFeedbackSentMessage, remoteWidgetSettings,
            (settings => settings.texts.postFeedbackSentMessage), 'Thanks for your feedback!'
        );

        this.postFeedbackTextareaPlaceholder = this._selectPropertyValue(
            this.postFeedbackTextareaPlaceholder, remoteWidgetSettings,
            (settings => settings.texts.postFeedbackTextareaPlaceholder), 'Send us your feedback.'
        );

        this.postReactionsTitle = this._selectPropertyValue(
            this.postReactionsTitle, remoteWidgetSettings,
            (settings => settings.texts.postReactionsTitle), 'Did you like this update?'
        );

        this.postReactionsLegendBad = this._selectPropertyValue(
            this.postReactionsLegendBad, remoteWidgetSettings,
            (settings => settings.texts.postReactionsLegendBad), 'Negative'
        );

        this.postReactionsLegendNeutral = this._selectPropertyValue(
            this.postReactionsLegendNeutral, remoteWidgetSettings,
            (settings => settings.texts.postReactionsLegendNeutral), 'Neutral'
        );

        this.postReactionsLegendGood = this._selectPropertyValue(
            this.postReactionsLegendGood, remoteWidgetSettings,
            (settings => settings.texts.postReactionsLegendGood), 'Positive'
        );

        this.triggerDisplayAfter = this._selectPropertyValue(
            this.triggerDisplayAfter, remoteWidgetSettings,
            (settings => settings.trigger.displayAfter), 0
        );

        this.triggerDisplayCounter = this._selectPropertyValue(
            this.triggerDisplayCounter, remoteWidgetSettings,
            (settings => settings.trigger.displayCounter), true
        );

        this.triggerEyeCatching = this._selectPropertyValue(
            this.triggerEyeCatching, remoteWidgetSettings,
            (settings => settings.trigger.useEyeCatching), true
        );

        this.triggerSoftHide = this._selectPropertyValue(
            this.triggerSoftHide, remoteWidgetSettings,
            (settings => settings.trigger.useSoftHide), true
        );

        let defaultUseWhiteLabelValue = false;

        if (this._isDemonstrationModeEnabled()) {
            defaultUseWhiteLabelValue = true;
        }

        this.whiteLabel = this._selectPropertyValue(
            this.whiteLabel, remoteWidgetSettings,
            (settings => settings.useWhiteLabel), defaultUseWhiteLabelValue
        );
    }

    _onPageChange(event) {
        this.$.popup.notifyResize();
    }

    _onParameterChange(accessToken, projectId, segments) {
        if (segments === undefined && this.segments) {
            return;
        }

        if (this._isDemonstrationModeEnabled()) {
            this._initializeData(null, JSON.parse(JSON.stringify(postSamples)));
        } else if (accessToken && projectId) {
            let xhr = this.$['apiAjax'];

            let segments = '';

            if (this._segments && this._segments.length > 0) {
                segments += 'segments: [';

                this._segments.forEach(segment => {
                    segments += '"' + segment + '" ';
                });

                segments += ']';
            }

            const params = {
                query: "{ project(id:\"" + this.projectId + "\") { accentColor posts(before: \"now\" isDraft: false last:9 " + segments + ") { edges { node { content { html } excerpt hiddenComments id labels { color name } publicationTime reactions slug title } } } timeline { customDomain { name verified } } widget { autoRefresh closeOnEscKey closeOnOutsideClick fetchLimit markAsSeenAfter opened popup { allowOutsideScroll footer header horizontalAlign horizontalOffset useDynamicAlign verticalAlign verticalOffset withBackdrop } postExcerptMaxLength postExcerptTarget texts { postBackLink postFeedbackSendButtonLabel postFeedbackSentMessage postFeedbackTextareaPlaceholder postReactionsTitle postReactionsLegendBad postReactionsLegendNeutral postReactionsLegendGood postViewMoreButton } trigger { displayAfter displayCounter useEyeCatching useSoftHide } useWhiteLabel } } }"
            };

            if (this.noCache) {
                xhr.method = 'POST';
                xhr.body = {
                    "query": params.query
                };
            } else {
                xhr.method = 'GET';
                xhr.params = params;
            }

            xhr.generateRequest();
        }
    }

    _onPopupOpened() {
        if (this._newPostSeen) {
            this._setLocalStorageItem('posts:seen', this._newPostSeen);
            this._unSeenPostCount = 0;
        }

        if (!this._isDemonstrationModeEnabled()) {
            this.$.widgetTriggerClickAjax.body = 'p=' + this.projectId;
            this.$.widgetTriggerClickAjax.generateRequest();
        }

        /**
         * Fired when the popup is opened.
         *
         * @event noticeable-widget-popup-opened
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-popup-opened', {bubbles: true, composed: true}));
    }

    _onPopupClosed() {
        this.$['sliding-pages'].reset();

        /**
         * Fired when the popup is closed.
         *
         * @event noticeable-widget-popup-closed
         */
        this.dispatchEvent(new CustomEvent('noticeable-widget-popup-closed', {bubbles: true, composed: true}));
    }

    _onSegmentsChange(segments) {
        this._segments = segments.split(',');
    }

    _onUnSeenPostCountChange(newValue) {
        const badge = this.shadowRoot.querySelector('#trigger-badge');
        const eyeCatchingTarget = this.shadowRoot.querySelector(this.triggerEyeCatchingTargetSelector);

        if (!newValue) {
            badge.classList.remove('trigger-badge-enabled');
            badge.classList.add('trigger-badge-disabled');
            eyeCatchingTarget.classList.remove('eye-catching');
        } else {
            if (this.triggerEyeCatching && !this._isIeBrowserBelow12()) {
                eyeCatchingTarget.classList.add('eye-catching');
            } else {
                eyeCatchingTarget.classList.remove('eye-catching');
            }

            badge.classList.remove('trigger-badge-disabled');
            badge.classList.add('trigger-badge-enabled');
        }
    }

    _isIeBrowserBelow12() {
        return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
    }

    _openPost(event) {
        const postId = event.currentTarget.id;

        this._post = this._postDataMap[postId];

        let postRead = this._getLocalStorageItem('posts:read');

        if (!postRead) {
            postRead = [];
        }

        if (postRead.indexOf(postId) === -1) {
            if (postRead.length > 20) {
                postRead = postRead.slice(10);
            }

            postRead.push(postId);

            this._setLocalStorageItem('posts:read', postRead);

            const classList = event.currentTarget.classList;
            classList.remove('popup-entry-read');
            classList.add('popup-entry-read');
        }

        if (this.postExcerptTarget === 'timeline') {
            window.open(
                this._timelineUrl + '/posts/' + this._post.slug,
                'noticeable-post');
        } else {
            if (!this._isDemonstrationModeEnabled()) {
                this.$.widgetViewPostAjax.body = 'p=' + this.projectId + '&m=' + postId;
                this.$.widgetViewPostAjax.generateRequest();
            }

            this.$['sliding-pages'].next();
            this.$['sliding-pages'].scrollTop();

            setTimeout(() => {
                const feedback = this._getLocalStorageItem('feedback:' + postId);
                const reaction = this._getLocalStorageItem('reaction:' + postId);
                if (reaction) {
                    this._selectReaction(reaction);
                }
                this._displayFeedbackForm = this._post.hiddenComments && !feedback;
                this._displayFeedbackSentMessage = false;
                this._displayPostContentFooter =
                    this.postContentFooter && !this._post.hiddenComments && !this._post.reactions;
                this._feedbackComment = '';
            }, 0);
        }
    }

    _postHeaderTitleLink(_post) {
        if (!this.postContentFooter) {
            return '';
        }

        return this._timelineUrl + '/posts/' + _post.slug;
    }

    _selectPropertyValue(localDef, remoteDef, remoteGetFunc, defaultValue) {
        if (localDef === undefined) {
            if (this.skipRemoteSettings) {
                return defaultValue;
            } else {
                try {
                    let remoteValue = remoteGetFunc(remoteDef);

                    if (remoteValue === undefined || remoteValue === null) {
                        return defaultValue;
                    }

                    return remoteValue;
                } catch (e) {
                    return defaultValue;
                }
            }
        } else {
            return localDef;
        }
    }

    _sendFeedback(event) {
        const postId = this._post.id;

        let body = 'p=' + this.projectId + '&m=' + postId + '&c=' + this._feedbackComment;
        let userData;
        try {
            userData = JSON.parse(sessionStorage.getItem('noticeable:session'));
        } catch (error) {
            userData = null;
        }
        if (userData) {
            if (userData.avatarUrl) {
                body += '&ua=' + userData.avatarUrl;
            }
            if (userData.email) {
                body += '&ue=' + userData.email;
            }
            if (userData.id) {
                body += '&ui=' + userData.id;
            }
            if (userData.name) {
                body += '&un=' + userData.name;
            }
        }

        this.$.feedbackPostAjax.body = body;
        this.$.feedbackPostAjax.generateRequest();

        this._setLocalStorageItem('feedback:' + postId, new Date());

        this._displayFeedbackForm = false;
        this._displayFeedbackSentMessage = true;
        this._feedbackComment = '';
    }

    _sendBadReaction(event) {
        this._sendReaction(event, 'bad');
    }

    _sendNeutralReaction(event) {
        this._sendReaction(event, 'neutral');
    }

    _sendGoodReaction(event) {
        this._sendReaction(event, 'good');
    }

    _sendReaction(event, value) {
        const emojiButton = this.shadowRoot.querySelector('#' + value + 'Reaction');
        if (emojiButton && emojiButton.getAttribute('selected') !== 'true') {
            const postId = this._post.id;
            this.$.reactionsPostAjax.body = 'p=' + this.projectId + '&m=' + postId + '&r=' + value;
            this.$.reactionsPostAjax.generateRequest();
            this._setLocalStorageItem('reaction:' + postId, value);
            this._selectReaction(value);
        }
    }

    _selectReaction(value) {
        this.shadowRoot.querySelector('#badReaction').setAttribute('selected', 'bad' === value);
        this.shadowRoot.querySelector('#neutralReaction').setAttribute('selected', 'neutral' === value);
        this.shadowRoot.querySelector('#goodReaction').setAttribute('selected', 'good' === value);
    }

    _showBadgeCounter(triggerDisplayCounter, postCount) {
        return triggerDisplayCounter && postCount > 0;
    }

    _showPosts() {
        this.$['sliding-pages'].previous();
    }

    /**
     * Local storage manipulation.
     */

    _buildLocalStorageKey(key) {
        return 'noticeable:project:' + this._localStorageKey + ':widget:' + key;
    }

    _getLocalStorageItem(key) {
        return JSON.parse(localStorage.getItem(this._buildLocalStorageKey(key)));
    }

    _removeLocalStorageItem(key) {
        return localStorage.removeItem(this._buildLocalStorageKey(key));
    }

    _setLocalStorageItem(key, value) {
        localStorage.setItem(this._buildLocalStorageKey(key), JSON.stringify(value));
    }

    _showTriggerBadge(dataLoaded, unSeenPostCount, triggerSoftHide) {
        if (dataLoaded) {
            return unSeenPostCount > 0 || (unSeenPostCount === 0 && triggerSoftHide);
        }

        return triggerSoftHide === undefined || triggerSoftHide;
    }
}

window.customElements.define(NoticeableWidgetPopup.is, NoticeableWidgetPopup);