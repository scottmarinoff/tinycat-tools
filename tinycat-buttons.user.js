(function () {
  if (window.location.pathname.indexOf("/item/") !== -1) {
    const ABEBOOKS_SEARCH  = "https://www.abebooks.com/servlet/SearchResults?kn=";
    const LIBRARY_SEARCH   = "https://discover.midhudsonlibraries.org/search?searchType=title&universalLimiterIds=at_library&materialTypeIds=b&languageIds=eng&pageNum=0&query=";

    // ── UPDATE THIS to your actual GitHub Pages URL once deployed ──
    const REVIEW_PAGE = "https://scottmarinoff.github.io/tinycat-tools/book-reviews.html";

    function mainTitle(full) {
      return full.replace(/\s*:.*$/, "").trim();
    }
    function makeButton(text, url) {
      const btn = document.createElement("a");
      btn.href = url;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      btn.textContent = text;
      btn.style.cssText = [
        "display:block",
        "margin:10px auto 0",
        "padding:5px 12px",
        "font-size:13px",
        "border:1px solid #b44",
        "border-radius:4px",
        "color:#b44",
        "text-decoration:none",
        "text-align:center",
        "width:calc(100% - 20px)",
      ].join(";");
      btn.addEventListener("mouseover", () => {
        btn.style.background = "#b44";
        btn.style.color = "#fff";
      });
      btn.addEventListener("mouseout", () => {
        btn.style.background = "";
        btn.style.color = "#b44";
      });
      return btn;
    }
    function injectDetailPage() {
      const social = document.querySelector("#social");
      if (!social || social.dataset.abeInjected) return;
      social.dataset.abeInjected = "1";
      const h1 = document.querySelector("h1");
      const h2 = document.querySelector("h2");
      const authorEl = h2 && h2.querySelector("a");
      const fullTitle  = h1 ? h1.textContent.trim() : "";
      const shortTitle = mainTitle(fullTitle);
      const author     = authorEl ? authorEl.textContent.trim() : "";

      // Build review page URL with title + author as query params
      const reviewsUrl = REVIEW_PAGE
        + "?title="  + encodeURIComponent(shortTitle)
        + "&author=" + encodeURIComponent(author);

      const libraryUrl = LIBRARY_SEARCH + encodeURIComponent(shortTitle);
      const abeUrl     = ABEBOOKS_SEARCH + encodeURIComponent(fullTitle + (author ? " " + author : ""));

      social.appendChild(makeButton("Find Reviews", reviewsUrl));
      social.appendChild(makeButton("Find at Library", libraryUrl));
      social.appendChild(makeButton("Search AbeBooks", abeUrl));
    }
    injectDetailPage();
    new MutationObserver(injectDetailPage).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
})();
