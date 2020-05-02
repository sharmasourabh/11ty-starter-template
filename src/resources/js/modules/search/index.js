(function(window, document) {
  "use strict";

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, { expand: true });

    const resEl = document.getElementById("searchResults");
    resEl.innerHTML = "";
    if (results && results.length > 0) {
      results.map((r) => {
        const { id, title, excerpt } = r.doc;
        const el = document.createElement("li");
        resEl.appendChild(el);

        const h3 = document.createElement("h4");
        el.appendChild(h3);

        const a = document.createElement("a");
        a.setAttribute("href", id);
        a.textContent = title;
        h3.appendChild(a);

        const p = document.createElement("p");
        p.textContent = excerpt;
        el.appendChild(p);
      });
    } else if (
      !results ||
      (results.length === 0 &&
        e.target.value &&
        e.target.value.trim().length !== 0)
    ) {
      const p = document.createElement("p");
      p.textContent = "Oops! Searched keyword not found 😒";
      resEl.appendChild(p);
    }
  };
  if (window.location.pathname === "/search/") {
    fetch("/search-index.json").then((response) =>
      response.json().then((rawIndex) => {
        try {
          window.searchIndex =
            undefined !== elasticlunr ? elasticlunr.Index.load(rawIndex) : [];
          document
            .getElementById("searchField")
            .addEventListener("input", search);
        } catch (ex) {
          // elasticlunr is only defined on search page.
          if (ex.message !== "elasticlunr is not defined") console.log(ex);
        }
      })
    );
  }
})(window, document);
