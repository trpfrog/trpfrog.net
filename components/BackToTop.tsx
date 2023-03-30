'use client';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export default function BackToTop() {
  return (
    <div id="page_top" onClick={backToTop}>
      <span id={'back-to-top-icon'}>
        <FontAwesomeIcon icon={faAngleDoubleUp}/>
      </span>
    </div>
  );
}
