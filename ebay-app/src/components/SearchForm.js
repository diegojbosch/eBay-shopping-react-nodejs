import React, { useState } from "react";
import Results from "./Results";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import logo from "../images/eBay_logo.png";
import { BsSearch, BsSlashCircle } from "react-icons/bs";

const SearchForm = ({ register, handleSubmit, errors }) => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [keywords, setKeywords] = useState(null);

  const hideResults = () => {
    setShowResults(false);
  };

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
    console.log(res.item);
    setShowResults(true);
    setKeywords(keywords);
  };

  return (
    <div>
      <div className="searchForm">
        <div className="logo">
          <img src={logo} alt="Logo"></img>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={2}>
              <Form.Label htmlFor="keywords">
                <b>Keywords</b>
              </Form.Label>
            </Col>
            <Col xs={10}>
              <Form.Control
                type="text"
                name="keywords"
                ref={register({ required: "Keywords required" })}
                placeholder="Enter keywords"
              />
              {errors.keywords && errors.keywords.message}
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Label htmlFor="minPrice">
                <b>Price range </b>
              </Form.Label>
            </Col>
            <Col xs={5}>
              <Form.Control
                type="number"
                name="minPrice"
                id="minPrice"
                min="0"
                required
                ref={register}
                placeholder="Min Price"
              />
            </Col>
            <Col xs={5}>
              <Form.Control
                type="number"
                name="maxPrice"
                id="maxPrice"
                min="0"
                required
                ref={register}
                placeholder="Max Price"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Label htmlFor="condition">
                <b>Condition</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                inline
                label="New"
                type="checkbox"
                name="conditionNew"
                id="conditionNew"
                ref={register}
              />

              <Form.Check
                inline
                label="Used"
                type="checkbox"
                name="conditionUsed"
                id="conditionUsed"
                ref={register}
              />

              <Form.Check
                inline
                label="Very good"
                type="checkbox"
                name="conditionVeryGood"
                id="conditionVeryGood"
              />

              <Form.Check
                inline
                label="Good"
                type="checkbox"
                name="conditionGood"
                id="conditionGood"
                ref={register}
              />

              <Form.Check
                inline
                label="Acceptable"
                type="checkbox"
                name="conditionAcceptable"
                id="conditionAcceptable"
                ref={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Label htmlFor="seller">
                <b>Seller</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                inline
                label="Return accepted"
                type="checkbox"
                name="returnAccepted"
                id="returnAccepted"
                ref={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Label htmlFor="shipping">
                <b>Shipping</b>
              </Form.Label>
            </Col>
            <Col>
              <Form.Check
                inline
                label="Free"
                type="checkbox"
                name="freeShipping"
                id="freeShipping"
                ref={register}
              />

              <Form.Check
                inline
                label="Expedited"
                type="checkbox"
                name="expeditedShipping"
                id="expeditedShipping"
                ref={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Form.Label htmlFor="sortBy">
                <b>Sort by</b>
              </Form.Label>
            </Col>
            <Col x={2}>
              <select name="sortBy" id="sortBy" ref={register}>
                <option value="BestMatch">Best match</option>
                <option value="CurrentPriceHighest">
                  Price: highest first
                </option>
                <option value="PricePlusShippingHighest">
                  Price + Shipping: first
                </option>
                <option value="PricePlusShippingLowest">
                  Price + Shipping: lowest first
                </option>
              </select>
            </Col>
          </Row>
          <Row>
            <div className="align-self-end ml-auto">
              <Button variant="primary" type="submit">
                <BsSearch /> Search
              </Button>{" "}
              <Button variant="secondary" type="reset" onClick={hideResults}>
                <BsSlashCircle /> Clear
              </Button>{" "}
            </div>
          </Row>
        </Form>
      </div>
      <div className="Results">
        {showResults ? <Results results={results} keywords={keywords} /> : ""}
      </div>
    </div>
  );
};

export default SearchForm;
