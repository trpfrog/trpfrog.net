import React from "react";

import Header from './header/Header'
import Footer from "./Footer";
import Navigation from "./Navigation";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

type Props = {
  style?: any;
  className?: string
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({
  children, style, className
}) => {
  return (
    <>
      <div id={'inner-body'}>
        <Header/>
        <Navigation/>
        <main>
          <div id="main_wrapper" style={style} className={className}>
            {children}
          </div>
        </main>
        <div id="page_top" onClick={backToTop}>
          <span id={'back-to-top-icon'}>
            <FontAwesomeIcon icon={faAngleDoubleUp}/>
          </span>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Layout;
