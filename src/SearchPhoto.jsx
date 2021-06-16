import React, { useState, useEffect } from "react";
const accessKey = "1IrgcpY1RP4xefW3OtnLW6Q1sBNxwsWrd-9GL51ysA0";
const endPoint = `https://api.unsplash.com/`;
const PostData = async (url = "") => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  return response.json();
};
const SearchPhoto = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (e) => setQuery(e.target.value);
  const handleNext = async () => {
    setPage((prev) => prev + 1);
    const result = await PostData(
      endPoint +
        `search/photos/?client_id=${accessKey}&orientation=squarish&query=${query}&page=${page}&per_page=${8}`
    );
    setPhotos((prev) => [...prev, ...result?.results]);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await PostData(
      endPoint +
        `search/photos/?client_id=${accessKey}&orientation=squarish&query=${query}&page=${page}&per_page=${8}`
    );
    setPhotos(result?.results);
  };
  useEffect(() => {
    (async () => {
      const result = await PostData(
        endPoint +
          `photos/?client_id=${accessKey}&orientation=squarish&per_page=${8}`
      );
      setPhotos(result);
    })();
  }, []);
  return (
    <>
      <form className="form" onSubmit={handleSearch}>
        <div className="row">
          <div className="col-10 ">
            <input
              type="text"
              name="query"
              className="input shadow p-3 mb-5 bg-white rounded"
              value={query}
              onChange={handleChange}
              placeholder={`Search for photos`}
            />
          </div>
          <div className="col">
            <button type="submit" className="button btn btn-dark btn-lg ">
              {"Search"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h1 className=" title">Random</h1>
        <p className="subtitle">{`${photos.length} images has been found.`}</p>
      </div>

      <div className="img-grid">
        {photos.map((photo, index) => (
          <div key={index} className="img-wrap">
            <img
              className="rounded mx-auto d-block"
              alt={photo.alt_description}
              src={photo.urls.full}
            />
          </div>
        ))}
      </div>
      <footer>
        <div className="d-flex justify-content-center mt-10">
          <button
            onClick={handleNext}
            style={{ height: 40, width: "14%" }}
            className="btn btn-lg btn-dark m-5"
            type="button"
          >
            {"Load More"}
          </button>
        </div>
      </footer>
    </>
  );
};

export default SearchPhoto;
// {/* <div class="d-flex justify-content-center">
//   <div class="spinner-border" role="status">
//     <span class="visually-hidden">Loading...</span>
//   </div>
// </div> */}
