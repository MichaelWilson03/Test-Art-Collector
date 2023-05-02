/* eslint-disable react/prop-types */
import React from "react";
/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */

import { fetchQueryResultsFromURL } from "../api";

const Preview = ({
  searchResults: { info, records },
  setSearchResults,
  setFeaturedResult,
  setIsLoading,
}) => {
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id="preview">
      <header className="pagination">
        {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
        <button
          disabled={!info.prev}
          className="previous"
          onClick={() => {
            fetchPage(info.prev);
          }}
        >
          Previous
        </button>
        {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
        <button
          disabled={!info.next}
          className="next"
          onClick={() => {
            fetchPage(info.next);
          }}
        >
          Next
        </button>
      </header>
      <section className="results">
        {records.map((record) => (
          <div
            key={record.id}
            className="object-preview"
            onClick={(event) => {
              event.preventDefault();
              setFeaturedResult(record);
            }}
          >
            {record.primaryimageurl ? (
              <img src={record.primaryimageurl} alt={record.description} />
            ) : null}
            {record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>}
          </div>
        ))}
      </section>
    </aside>
  );
};

export default Preview;
