import Link from "next/link";
import AdminNav from "@/components/AdminNav/AdminNav";

export default function AdminLayout({children}) {
    return (
        <>
            <AdminNav/>
            <main>
                {children}
            </main>
            <footer>
                <h3>footer</h3>
            </footer>
        </>
    )
}