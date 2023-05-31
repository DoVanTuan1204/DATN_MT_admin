import HomeStats from "@/components/HomeStats";
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import { useRouter } from "next/router";
import Login from "./login";

export default function Home() {
  const router = useRouter();
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  return (
    <div>
      <Layout>
        <HomeStats />
      </Layout>
    </div>
  );
}
