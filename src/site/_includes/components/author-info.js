const { html } = require("common-tags");

module.exports = ({ post, author, showSocialMedia = false }) => {
  if (!post) {
    throw new Error(`Can't generate AuthorInfo without post object`);
  }

  if (!author) {
    throw new Error(`Can't generate AuthorInfo without author object`);
  }

  const fullName = `${author.name}`;

  function renderTwitter({ twitter }) {
    return html`
      <li class="b-author-link-listitem">
        <a class="b-author-link text-gray-600" href="https://twitter.com/${twitter}"
          >Twitter</a
        >
      </li>
    `;
  }

  function renderGitHub({ github }) {
    return html`
      <li class="b-author-link-listitem">
        <a class="b-author-link text-gray-600" href="https://github.com/${github}">GitHub</a>
      </li>
    `;
  }

  function renderGlitch({ glitch }) {
    return html`
      <li class="b-author-link-listitem">
        <a class="b-author-link text-gray-600" href="https://glitch.com/@${glitch}">Glitch</a>
      </li>
    `;
  }

  function renderSocialMedia(author) {
    return html`
      <ul class="b-author-link-list">
        ${author.twitter && renderTwitter(author)}
        ${author.github && renderGitHub(author)}
        ${author.glitch && renderGlitch(author)}
      </ul>
    `;
  }

  return html`
    <div
      class="b-author-info"
      style="display: flex; flex-direction: column; justify-content: center;"
    >
      <cite class="b-author-name">${fullName}</cite>
      ${showSocialMedia && renderSocialMedia(author)}
    </div>
  `;
};
