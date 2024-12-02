import Header from "@/components/Header/Header.jsx";
import Counter from "@/components/Counter/Counter";
import CompanyGoal from "@/components/CompanyGoal/CompanyGoal";
import DiscountProductCard from "@/components/DiscountProductCard/DiscountProductCard";
import SwitchSection from "@/components/SwitchSection/SwitchSection";
import Catalog from "@/components/Catalog/Catalog";
import Reviews from "@/components/Reviews/Reviews";
import Brands from "@/components/Brands/Brands";
import Layout from "@/components/Layout/Layout";

export default function Home() {
    return (
        <>
            <Layout>
                <Header/>
                <Counter/>
                <CompanyGoal/>
                <DiscountProductCard/>
                <SwitchSection/>
                <Catalog/>
                <Reviews/>
                <Brands/>
            </Layout>

        </>
    );
}
