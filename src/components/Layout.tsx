import React from 'react'

import MainWrapper from '@/components/atoms/MainWrapper'

import BackToTop from './organisms/BackToTop'
import Footer from './organisms/Footer'
import Header from './organisms/Header'
import Navigation from './organisms/Navigation'

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
