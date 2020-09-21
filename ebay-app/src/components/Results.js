import React from "react";

const Results = (props) => {
  let jsonArray = JSON.parse(props.results);

  return (
    <div>
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
              <p>{item.location}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
