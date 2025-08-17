import { Redirect } from "expo-router";
import { ROUTES } from "../src/constants/routes";

export default function Index() {
  return <Redirect href={ROUTES.WELCOME} />;
}
