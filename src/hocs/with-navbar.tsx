import * as React from 'react'
import Head from 'next/head'
import NavBar from 'src/components/nav-bar'

type WithNavbarProps = {
  children: React.ReactNode
}

const WithNavbar = (props: WithNavbarProps) => (
  <div>
    <Head>
      <title>Couture</title>
      <meta name="description" content="Couture - the business of designing, making, and selling fashionable custom-made clothing." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    <main>
      {props.children}
    </main>
  </div>
)

export default WithNavbar
