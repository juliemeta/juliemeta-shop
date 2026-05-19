import BannerSection from "@/components/banner/BannerSection";
import { DynamicBreadcrumbs } from "@/components/breadcrumbs/dynamicBreadcrumbs";
import { StyledContainer } from "@/styles/StyledContainer";
import { StyledTextWrapper } from "@/styles/StyledTextWrapper";
import { Button } from "@mui/material";
import Link from "next/link";

async function getPosts() {
  const res = await fetch("https://eudaimeta.dk/wp-json/wp/v2/posts", {
    next: { revalidate: 60 },
  });

  return res.json();
}

export default async function CogitoPage() {
  const posts = await getPosts();

  return (
    <>
      <BannerSection
        title="Cogito meta sum"
        image="/assets/images/cogito-meta-sum.png"
        overlay="#f2f0ecf5"
      />
      <StyledContainer>
        <StyledTextWrapper>
          <DynamicBreadcrumbs
            items={[
              { label: "Forside", href: "/" },
              {
                label: "Cogito meta sum",
              },
            ]}
          />
          {posts.map((post: any) => (
            <article key={post.id} style={{ marginBottom: "4rem" }}>
              <Link href={`/cogito/${post.slug}`}>
                <h2
                  style={{
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  }}
                >
                  {post.title.rendered}
                </h2>
              </Link>

              <div
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              />
            </article>
          ))}
          <Button href="/">👉 Til forsiden</Button>
        </StyledTextWrapper>
      </StyledContainer>
    </>
  );
}
