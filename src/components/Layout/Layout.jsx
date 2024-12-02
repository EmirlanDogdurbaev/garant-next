import React from 'react';
import NavBar from "@/components/NavBar/NavBar";
import styles from "./Layout.module.scss"
const Layout = ({children}) => {
    return (
        <div >
            <NavBar/>
            <main className={styles.container}>
                {children}
            </main>

        </div>
    )
};

export default Layout;