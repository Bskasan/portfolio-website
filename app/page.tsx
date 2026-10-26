import PageWrapper from "@/components/animated/PageWrapper";
import HomeScreen from "@/components/pages/HomeScreen";

import { getAllPosts } from "@/lib/blogs";

const HomePage = () => {
  return (
    <PageWrapper>
      <HomeScreen postCount={getAllPosts().length} />
    </PageWrapper>
  );
};

export default HomePage;
