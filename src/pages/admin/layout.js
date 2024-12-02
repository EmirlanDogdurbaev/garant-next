import Link from "next/link";

export default function AdminLayout({children}) {
    return (
        <>
            <nav>
                <ul style={{display: "flex", gap: "10px", padding: "10px"}}>
                    <li>
                        <Link href={"/"}>all prodicts</Link>
                    </li>
                    <li>
                        <Link href={"/"}>all prodicts</Link>
                    </li>
                    <li>
                        <Link href={"/"}>all prodicts</Link>
                    </li>
                    <li>
                        <Link href={"/"}>all prodicts</Link>
                    </li>
                </ul>
            </nav>

            <main>
                {children}
            </main>
            <footer>
                <h3>footer</h3>
            </footer>
        </>
    )
}