import React from "react";
//higer order component - bierze komponent jako argument\
//i zwraca modified component
import { withRouter } from "react-router-dom";

import "./menu-item.styles.scss";

const functionLog = props => {
  console.log(props);
};

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
 console.log(match);
 
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="content">
        <div className="title">{title}</div>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
