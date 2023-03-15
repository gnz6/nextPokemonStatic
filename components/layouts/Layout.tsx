import Head from "next/head"
import { Navbar } from "../ui";

interface Props {
    children: JSX.Element | React.ReactNode;
    title?: string
}

export const Layout = ({ children, title } : Props ) => {
  return (
    <>
     <Head>
        <title>{ title? title : "Pokemon App"}</title>
        <meta name="author" content="gnz6"/>
        <meta name="description" content="Info pokemon xxxxxx"/>
        <meta name="keywords" content=" pokemon name"/>
    </Head>   

    <Navbar/>

    <main style={{
        padding:"0px 20px"
    }} >
        {children}
    </main>
    </>
  )
}
