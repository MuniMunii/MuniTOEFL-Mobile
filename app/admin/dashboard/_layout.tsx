import { Slot } from "expo-router";
import BottomNavbar from "../../../components/navigation/bottomNav";
export default function DashboardLayout(){
    return (
        <>
        <Slot/>
        <BottomNavbar/>
        </>
    )
}