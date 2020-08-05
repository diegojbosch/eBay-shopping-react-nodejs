import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

export default function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    var keywords = data.keywords;
    var minPrice = data.minPrice;
    var maxPrice = data.maxPrice;
    var conditionNew = data.conditionNew;
    var conditionUsed = data.conditionUsed;
    var conditionVeryGood = data.conditionVeryGood;
    var conditionGood = data.conditionGood;
    var conditionAcceptable = data.conditionAcceptable;
    var returnAccepted = data.returnAccepted;
    var freeShipping = data.freeShipping;
    var expeditedShipping = data.expeditedShipping;
    var sortOrder = data.sortBy;

    var url = "http://localhost:8080/api/v1.0/search";

    var queryParams =
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

    console.log(url + queryParams);
    const res = await fetch(url + queryParams, { method: "GET" }).then((res) =>
      res.json()
    );
    //alert(JSON.stringify(res));
  };

  return (
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
  );
}
