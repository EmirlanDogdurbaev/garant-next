import React from 'react';
import NavBar from "@/components/NavBar/NavBar";
import styles from "./Layout.module.scss"
import Footer from "@/components/Footer/Footer";

const Layout = ({children}) => {
    return (
        <div>
            <NavBar/>
            <main className={styles.container}>
                {children}
            </main>
            <Footer/>
        </div>
    )
};

export default Layout;