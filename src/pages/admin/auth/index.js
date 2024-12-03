import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { login } from "@/store/slices/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const loading = useSelector((state) => state.auth.status === "loading");
    const error = useSelector((state) => state.auth.error);

    const handleLogin = async () => {
        try {
            const response = await dispatch(login({ password, username })).unwrap();
            console.log("Успешный вход:", response);
            router.push("/admin"); // Перенаправление на страницу после входа
        } catch (err) {
            console.error("Ошибка входа:", err);
        }
    };

    return (

        <div className={styles.Login}>
            <div>
                <h2>Войти</h2>

                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <button onClick={handleLogin} disabled={loading}>
                        {loading ? "Загрузка..." : "Войти"}
                    </button>

                </div>
                {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
            </div>
        </div>
    );
};

export default Login;
