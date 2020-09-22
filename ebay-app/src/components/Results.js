import React from "react";
import { Button, Tabs, Tab, Table, Accordion } from "react-bootstrap";

const Results = (props) => {
  let jsonArray = JSON.parse(props.results);

  return (
    <div>
      <div className="results-title">Results for {props.keywords}</div>
      {jsonArray.map((item, index) => {
        return (
          <div className="result" key={index}>
            <div className="image">
              <img src={item.galleryURL} alt=""></img>
            </div>
            <div className="description">
              <p>
                <a href={item.viewItemURL}>{item.title}</a>
              </p>
              <p>
                <b>Price:</b> {item.sellingStatus[0].currentPrice[0].__value__}
              </p>
              <p>
                <Accordion>
                  <i>{item.location}</i>{" "}
                  <Accordion.Toggle as={Button} variant="light" eventKey="0">
                    Details
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0" style={{ margin: 12 }}>
                    <Tabs
                      defaultActiveKey="basicInfo"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="basicInfo" title="Basic Info">
                        <Table responsive="sm">
                          <tbody>
                            <tr>
                              <td style={{ width: 150 }}>
                                <b>Category name</b>
                              </td>
                              <td>{item.primaryCategory[0].categoryName}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 150 }}>
                                <b>Condition</b>
                              </td>
                              <td>{item.condition[0].conditionDisplayName}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab eventKey="shippingInfo" title="Shipping Info">
                        <Table responsive="sm">
                          <tbody>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Shipping type</b>
                              </td>
                              <td>{item.shippingInfo[0].shippingType}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Shipping cost</b>
                              </td>
                              <td>
                                {
                                  item.shippingInfo[0].shippingServiceCost[0]
                                    .__value__
                                }
                              </td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Shipping location</b>
                              </td>
                              <td>{item.shippingInfo[0].shipToLocations}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Expedited shipping</b>
                              </td>
                              <td>{item.shippingInfo[0].expeditedShipping}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>One day shipping available</b>
                              </td>
                              <td>
                                {item.shippingInfo[0].oneDayShippingAvailable}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                      <Tab eventKey="listingInfo" title="Listing Info">
                        <Table responsive="sm">
                          <tbody>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Best offer enabled</b>
                              </td>
                              <td>{item.listingInfo[0].bestOfferEnabled}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Buy it now available</b>
                              </td>
                              <td>{item.listingInfo[0].buyItNowAvailable}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Listing type</b>
                              </td>
                              <td>{item.listingInfo[0].listingType}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Gift</b>
                              </td>
                              <td>{item.listingInfo[0].gift}</td>
                            </tr>
                            <tr>
                              <td style={{ width: 180 }}>
                                <b>Watch count</b>
                              </td>
                              <td>{item.listingInfo[0].watchCount}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Tab>
                    </Tabs>
                  </Accordion.Collapse>
                </Accordion>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
