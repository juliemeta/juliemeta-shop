import { DynamicBreadcrumbs } from "@/components/breadcrumbs/dynamicBreadcrumbs";
import { StyledContainer } from "@/styles/StyledContainer";
import { StyledTextWrapper } from "@/styles/StyledTextWrapper";
import { Box, Button, Divider, Typography } from "@mui/material";

async function getPost(slug: string) {
  const res = await fetch(
    `https://eudaimeta.dk/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    {
      next: { revalidate: 60 },
    },
  );

  const posts = await res.json();

  return posts[0];
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return (
      <Box>
        Ups! Tankerne er forsvundet. <br />
        <Button href="/cogito-meta-sum" variant="contained">
          ↩ Gå tilbage
        </Button>
      </Box>
    );
  }

  const categories = post._embedded?.["wp:term"]?.flat() || [];

  const category = categories.find((term: any) => term.taxonomy === "category");

  const formattedDate = new Date(post.date).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <StyledContainer>
      <StyledTextWrapper>
        <DynamicBreadcrumbs
          items={[
            {
              label: "Forside",
              href: "/",
            },

            {
              label: "Cogito meta sum",
              href: "/cogito",
            },

            {
              label: post.title.rendered,
            },
          ]}
        />
        <Typography variant="h1">{post.title.rendered}</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 6,
            opacity: 0.7,
          }}
        >
          {category && (
            <Typography variant="caption">{category.name}</Typography>
          )}

          <Typography variant="caption">·</Typography>

          <Typography variant="caption">{formattedDate}</Typography>
        </Box>

        <Box
          sx={{
            "& h1": {
              typography: "h1",
              mt: 8,
              mb: 3,
            },

            "& h2": {
              typography: "h2",
              mt: 6,
              mb: 2,
            },

            "& h3": {
              typography: "h3",
              mt: 5,
              mb: 2,
            },

            "& p": {
              typography: "body1",
              mb: 3,
              lineHeight: 1.9,
            },

            "& ul, & ol": {
              pl: 4,
              mb: 3,
            },

            "& li": {
              mb: 1,
            },

            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: 3,
              my: 4,
            },

            "& blockquote": {
              borderLeft: "4px solid",
              borderColor: "divider",
              pl: 3,
              ml: 0,
              fontStyle: "italic",
              opacity: 0.8,
            },
          }}
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />

        <Divider variant="middle" />

        <br />

        <Button href="/">👉 Til forsiden</Button>

        <br />

        <Button variant="outlined" href="/cogito-meta-sum">
          ↩ Tilbage til oversigt
        </Button>
      </StyledTextWrapper>
    </StyledContainer>
  );
}
