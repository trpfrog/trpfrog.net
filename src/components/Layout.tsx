import React from 'react'

import Header from './organisms/Header'
import Footer from './organisms/Footer'
import Navigation from './organisms/Navigation'
import BackToTop from './organisms/BackToTop'
import MainWrapper from '@/components/atoms/MainWrapper'

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
