import React from 'react'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import BackToTop from './BackToTop'
import MainWrapper from '@/components/MainWrapper'

type Props = {
  style?: any
  className?: string
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  style,
  className,
}) => {
  return (
    <>
      <div id={'inner-body'}>
        <Header />
        <Navigation />
        <main>
          <MainWrapper style={style} className={className}>
            {children}
          </MainWrapper>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  )
}

export default Layout
