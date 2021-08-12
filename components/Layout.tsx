import React, { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = props => (
    <>
        <Navbar />
        <div className="container w-full md:max-w-3xl mx-auto pt-20">{props.children}</div>
    </>
)

export default Layout