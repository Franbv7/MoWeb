import React from "react";
import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";

function CarouselSlider({ items, linkBase, imageSource, imageAlt, itemName }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Carousel className="carousel">
      {items?.map((item) => (
        <Paper key={item.id}>
          <Link to={`${linkBase}/${item.id}`}>
            <img src={imageSource(item)} alt={imageAlt(item)} />
          </Link>
          <div className="description">
            <h3>{itemName(item)}</h3>
          </div>
        </Paper>
      ))}
    </Carousel>
  );
}

export default CarouselSlider;
