import type { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Vite plugin to inline critical CSS and load non-critical CSS asynchronously
 * This eliminates render-blocking CSS and improves FCP/LCP
 */
export function criticalCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-critical-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        try {
          // Read critical CSS file
          const criticalCssPath = resolve(process.cwd(), 'client/src/critical.css');
          const criticalCss = readFileSync(criticalCssPath, 'utf-8');

          // Find the CSS link tag
          const cssLinkRegex = /<link[^>]+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/gi;

          // Replace synchronous CSS with inline critical CSS + async full CSS
          let modifiedHtml = html.replace(cssLinkRegex, (match, cssPath) => {
            return `<!-- Critical CSS Inlined -->
    <style>${criticalCss}</style>

    <!-- Load full CSS asynchronously -->
    <link rel="preload" href="${cssPath}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${cssPath}"></noscript>`;
          });

          // Add loadCSS polyfill for older browsers
          const loadCssScript = `
    <script>
      !function(e){"use strict";var t=function(t,n,r,o){var i,a=e.document,d=a.createElement("link");if(n)i=n;else{var l=(a.body||a.getElementsByTagName("head")[0]).childNodes;i=l[l.length-1]}var s=a.styleSheets;if(o)for(var c in o)o.hasOwnProperty(c)&&d.setAttribute(c,o[c]);d.rel="stylesheet",d.href=t,d.media="only x",function e(t){if(a.body)return t();setTimeout(function(){e(t)})}(function(){i.parentNode.insertBefore(d,n?i:i.nextSibling)});var f=function(e){for(var t=d.href,n=s.length;n--;)if(s[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",function(){this.media=r||"all"}),d.onloadcssdefined=f,f(function(){d.media!==r&&(d.media=r)}),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this);
    </script>`;

          // Insert script before closing head tag
          modifiedHtml = modifiedHtml.replace('</head>', `${loadCssScript}\n  </head>`);

          return modifiedHtml;
        } catch (error) {
          console.warn('Critical CSS plugin warning:', error);
          return html;
        }
      }
    }
  };
}
