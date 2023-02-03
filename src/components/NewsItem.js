import React from "react";

const NewsItem = (props) => {
  let { tittle, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="container my-2">
      <div style={{ display: "flex", justifyContent: "flex-end", right: 0 }}>
        <span className="badge rounded-pill bg-danger">{source}</span>
      </div>
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{tittle}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text mb-0">
            <small class="text-secondary">
              By {author === null ? "unknown" : author}
            </small>
          </p>
          <p className="card-text">
            <small class="text-secondary">
              on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
