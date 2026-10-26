import PageWrapper from "@/components/animated/PageWrapper";
import HomeAboutMe from "@/components/pages/HomeAboutMe";

import { getAllPosts } from "@/lib/blogs";

const HomePage = () => {
  return (
    <PageWrapper>
      <HomeAboutMe postCount={getAllPosts().length} />
    </PageWrapper>
  );
};

export default HomePage;
