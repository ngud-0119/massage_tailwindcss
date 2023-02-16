import PhotoAlbum from "react-photo-album";
import React, { useState } from "react";
import { baseUrl } from "../../utils/isLogins";
import "../../css/gallery.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import FadeLoader from "react-spinners/FadeLoader";
import { Blurhash } from "react-blurhash";
export default function Gallery({ images, imageLoaded, loading }) {
  const [index, setIndex] = useState(-1);

  const url = baseUrl();

  let photos =
    images?.length > 0 &&
    images.map((img) => {
      return {
        src: `${url}/files/${img.img}`,
        width: 150,
        height: 150,
      };
    });
  console.log("tag photo", photos);

  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  // Next Image
  const nextSlide = () => {
    slideNumber + 1 === images.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <div>
      {openModal && (
        <div className="sliderWrap">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="btnClose fa-2x"
            style={{ color: "#c8175d" }}
            onClick={handleCloseModal}
          />
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className="btnPrev fa-2x"
            style={{ color: "#c8175d" }}
            onClick={prevSlide}
          />
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className="btnNext fa-2x"
            style={{ color: "#c8175d" }}
            onClick={nextSlide}
          />
          <div className="fullScreenImage">
            <img src={`${url}/files/${images[slideNumber].img}`} alt="img" />
          </div>
        </div>
      )}
      <div
        className="galleryWrap"
        style={{
          display: loading ? "flex" : "none",
          // justifyContent: "center",
          // alignItem: "center",
          // height: "170px",
        }}
      >
        {/* <FadeLoader color="#c8175d" /> */}
        {images &&
          images.map((slide, index) => {
            return (
              <div className="single" key={index}>
                <Blurhash
                  hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                  width="100%"
                  height={260}
                  resolutionX={25}
                  resolutionY={25}
                  punch={1}
                />
              </div>
            );
          })}
      </div>

      <div
        className="galleryWrap"
        style={{ display: loading ? "none" : "flex" }}
      >
        {images &&
          images.map((slide, index) => {
            return (
              <div
                className="single"
                key={index}
                onClick={() => handleOpenModal(index)}
              >
                <img
                  src={`${url}/files/${slide.img}`}
                  alt="gallery img"
                  onLoad={imageLoaded}
                  height={260}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
