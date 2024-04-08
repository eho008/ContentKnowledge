import { Link } from "react-router-dom";
import { ContentType } from "../assets/types";
import MyCard from "../Components/Card";
import { Box, Card, Container } from "@radix-ui/themes";

export default function Hello({ contents }: { contents: ContentType[] }) {
  return (
    <>
      <Box
        style={{
          background: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Container size="3" py="3">
          <div className="grid gap-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 justify-items-center">
            {contents.map((content) => (
              <MyCard key={content.title} content={content} />
            ))}
            <Link to="/contents/new">
              <Box width="240px">
                <Card
                  size="3"
                  className="h-72 hover:outline-white hover:outline hover:outline-offset-2 hover:outline-1"
                >
                  <div className="w-full h-full flex items-center justify-center pb-8">
                    <p className="text-9xl opacity-60">+</p>
                  </div>
                </Card>
              </Box>
            </Link>
          </div>
        </Container>
      </Box>
    </>
  );
}
