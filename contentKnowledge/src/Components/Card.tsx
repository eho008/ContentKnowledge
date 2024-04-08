import { Badge, Box, Button, Card, Flex, Inset } from "@radix-ui/themes";
import { ContentType } from "../assets/types";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteContentContext } from "../App";

interface MyCardProps {
  content: ContentType;
}

function MyCard({ content }: MyCardProps) {
  const nav = useNavigate();
  const deleteContent = useContext<(id: string) => void>(DeleteContentContext);
  function typeString() {
    switch (content.type) {
      case "Video":
        return "fa-video";
      case "Movie":
        return "fa-film";

      case "Book":
        return "fa-book";

      case "Article":
        return "fa-newspaper";

      case "Lecture":
        return "fa-chalkboard";
      case "Podcast":
        return "fa-podcast";
      case "Paper":
        return "fa-file";
      default:
        break;
    }
  }
  function handleModalDelete() {
    setDeleteUnit(false);
  }

  function handleDelete() {
    deleteContent(content._id!);
    setDeleteUnit(false);
  }
  const [deleteUnit, setDeleteUnit] = useState<boolean>(false);
  return (
    <>
      {deleteUnit && (
        <DeleteConfirm
          type="content"
          deleteUnit={handleDelete}
          handleCloseModal={handleModalDelete}
        />
      )}
      <Link to={`/contents/${content._id}`} className={`card-link`}>
        <Box maxWidth="240px">
          <Card
            size="2"
            className="relative h-72 hover:outline-white hover:outline hover:outline-offset-2 hover:outline-1 card-main"
          >
            <i
              className={`fa-solid fixed top-1.5 left-1.5 ${typeString()}`}
            ></i>
            <i
              className="fa-solid fixed top-1.5 hidden right-1.5 fa-trash trash growss"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDeleteUnit(true);
              }}
            ></i>
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src={content.image || "https://via.placeholder.com/150"}
                alt={content.title}
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "100%",
                  height: 140,
                  backgroundColor: "var(--gray-5)",
                }}
              />
            </Inset>
            <h2>{content.title}</h2>

            <Flex
              width="90%"
              justify="between"
              className="fixed bottom-0 my-2 items-end "
            >
              <Flex gap="2">
                {content.category.map((category) => (
                  <Badge key={category} color="blue" radius="none">
                    {category}
                  </Badge>
                ))}
              </Flex>
              {content.quiz ? (
                <Button
                  variant="soft"
                  color="green"
                  radius="large"
                  className="growss"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nav(`/contents/${content._id}/quiz`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="#31c91d"
                      d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0"
                    />
                  </svg>
                  Quiz
                </Button>
              ) : (
                <Button
                  color="green"
                  radius="large"
                  className="growss"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nav(`/contents/${content._id}/quiz/new`);
                  }}
                >
                  Create Quiz
                </Button>
              )}
            </Flex>
          </Card>
        </Box>
      </Link>
    </>
  );
}
export default MyCard;
