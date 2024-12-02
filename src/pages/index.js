import {useRouter} from "next/router";
import Header from "@/components/Header/Header.jsx";
import NavBar from "@/components/NavBar/NavBar";
import Counter from "@/components/Counter/Counter";
import CompanyGoal from "@/components/CompanyGoal/CompanyGoal";
import DiscountProductCard from "@/components/DiscountProductCard/DiscountProductCard";
import SwitchSection from "@/components/SwitchSection/SwitchSection";
import Catalog from "@/components/Catalog/Catalog";
import Reviews from "@/components/Reviews/Reviews";
import Brands from "@/components/Brands/Brands";

export default function Home() {
    const router = useRouter();
    return (
        <>
            <NavBar/>
            <Header/>
            <Counter/>
            <CompanyGoal/>
            <DiscountProductCard/>
            <SwitchSection/>
            <Catalog/>
            <Reviews/>
            <Brands/>
        </>
    );
}
