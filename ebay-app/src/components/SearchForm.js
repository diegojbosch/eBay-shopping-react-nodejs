import React, { useState } from "react";
import Results from "./Results";

const SearchForm = ({ register, handleSubmit, errors }) => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const onSubmit = async (data) => {
    let keywords = data.keywords;
    let minPrice = data.minPrice;
    let maxPrice = data.maxPrice;
    let conditionNew = data.conditionNew;
    let conditionUsed = data.conditionUsed;
    let conditionVeryGood = data.conditionVeryGood;
    let conditionGood = data.conditionGood;
    let conditionAcceptable = data.conditionAcceptable;
    let returnAccepted = data.returnAccepted;
    let freeShipping = data.freeShipping;
    let expeditedShipping = data.expeditedShipping;
    let sortOrder = data.sortBy;

    let url = "http://localhost:8080/api/v1.0/search";

    let queryParams =
      "?keywords=" +
      keywords +
      "&min_price=" +
      minPrice +
      "&max_price=" +
      maxPrice +
      "&sort_order=" +
      sortOrder;

    if (conditionNew === true) {
      queryParams += "&condition_new=" + conditionNew;
    }

    if (conditionUsed === true) {
      queryParams += "&condition_used=" + conditionUsed;
    }

    if (conditionVeryGood === "undefined") {
      queryParams += "&condition_very_good=" + conditionVeryGood;
    }

    if (conditionGood === true) {
      queryParams += "&condition_good=" + conditionGood;
    }

    if (conditionAcceptable === true) {
      queryParams += "&condition_acceptable=" + conditionAcceptable;
    }

    if (returnAccepted === true) {
      queryParams += "&return_accepted=" + returnAccepted;
    }

    if (freeShipping === true) {
      queryParams += "&free_shipping=" + freeShipping;
    }

    if (expeditedShipping === true) {
      queryParams += "&expedited_shipping=" + expeditedShipping;
    }

    const res = await fetch(url + queryParams, { method: "GET" }).then((res) =>
      res.json()
    );

    setResults(JSON.stringify(res.item));
    setShowResults((prev) => !prev);
  };

  return (
    <div className="searchForm">
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="keywords">Keywords:</label>
            <input
              type="text"
              name="keywords"
              ref={register({ required: "Keywords required" })}
            />
            {errors.keywords && errors.keywords.message}
          </div>
          <div>
            <label htmlFor="minPrice">From </label>
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              min="0"
              required
              ref={register}
            />
            <label htmlFor="maxPrice">to </label>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              min="0"
              required
              ref={register}
            />
          </div>
          <div>
            <label htmlFor="condition">Condition:</label>
            <input
              type="checkbox"
              name="conditionNew"
              id="conditionNew"
              ref={register}
            />
            <label htmlFor="conditionNew">New</label>
            <input
              type="checkbox"
              name="conditionUsed"
              id="conditionUsed"
              ref={register}
            />
            <label htmlFor="conditionUsed">Used</label>
            <input
              type="checkbox"
              name="conditionVeryGood"
              id="conditionVeryGood"
            />
            <label htmlFor="conditionVeryGood">Very good</label>
            <input
              type="checkbox"
              name="conditionGood"
              id="conditionGood"
              ref={register}
            />
            <label htmlFor="conditionGood">Good</label>
            <input
              type="checkbox"
              name="conditionAcceptable"
              id="conditionAcceptable"
              ref={register}
            />
            <label htmlFor="conditionAcceptable">Acceptable</label>
          </div>
          <div>
            Seller:
            <input
              type="checkbox"
              name="returnAccepted"
              id="returnAccepted"
              ref={register}
            />
            <label htmlFor="returnAccepted">Return accepted</label>
          </div>
          <div>
            <label htmlFor="shipping">Shipping:</label>
            <input
              type="checkbox"
              name="freeShipping"
              id="freeShipping"
              ref={register}
            />
            <label htmlFor="freeShipping">Free</label>
            <input
              type="checkbox"
              name="expeditedShipping"
              id="expeditedShipping"
              ref={register}
            />
            <label htmlFor="expeditedShipping">Expedited</label>
          </div>
          <div>
            <label htmlFor="sortBy">Sort by:</label>
            <select name="sortBy" id="sortBy" ref={register}>
              <option value="BestMatch">Best match</option>
              <option value="CurrentPriceHighest">Price: highest first</option>
              <option value="PricePlusShippingHighest">
                Price + Shipping: first
              </option>
              <option value="PricePlusShippingLowest">
                Price + Shipping: lowest first
              </option>
            </select>
          </div>
          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>

      <div className="Results">
        {showResults ? <Results results={results} /> : ""}
      </div>
    </div>
  );
};

export default SearchForm;
