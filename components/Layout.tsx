import React from "react";

import Header from './Header'
import Footer from "./Footer";
import Navigation from "./Navigation";
import BackToTop from "./BackToTop";

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
        <BackToTop/>
        <Footer/>
      </div>
    </>
  );
}

export default Layout;
