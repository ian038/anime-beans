import React, { ReactNode } from 'react'
import Navbar from './Navbar'

type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = props => (
    <>
        <Navbar />
        <div className="flex items-center py-4 px-2">{props.children}</div>
    </>
)

export default Layout