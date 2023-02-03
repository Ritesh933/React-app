import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
 

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);
    let data = await fetch(url);
    let response = await data.json();
    props.setProgress(70);
    setarticles(response.articles);
    setloading(false);
     setpage(page+1)
    settotalResults(response.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
     document.title = ` ${props.category} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // api="08409576053b4f379164930560d57168"
  //personal api1="2f1caa27e88c48f5a6885469e12dea2e"

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey} &page=${page}&pageSize=${props.pageSize}`;
    setpage(page+1);
    let data = await fetch(url);
    let response = await data.json();
    setarticles(articles.concat(response.articles));
    settotalResults(response.totalResults);
  };

  //  const handleNextClick = async () => {
  //   setpage(page+1)
  //    updateNews();
  //   };

  //   const handlePreviousClick = async () => {
  //   setpage(page-1)
  //    updateNews();
  //   };

  return (
    <>
      <h1 className="text-center my-3">
        NewsMonakey -Top {props.category} Headlines
      </h1>

      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    tittle={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "science",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;
