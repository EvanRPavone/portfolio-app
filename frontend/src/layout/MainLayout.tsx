import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Components
import Header from "../components/Header/Header";
import ProjectSpotlight from "../components/ProjectSpotlight/ProjectSpotlight";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";

// Types
import type { ImageMap } from "../types";

const MainLayout = () => {
  const [images, setImages] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data: ImageMap[]) => {
        const imageMap: Record<string, string> = {};
        data.forEach((img) => {
          imageMap[img["Image Name"]] = img["Image URL"];
        });
        setImages(imageMap);
      })
      .catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <ProjectSpotlight images={images} />
        <ProjectList images={images} />
      </Container>

      <Footer />
    </Box>
  );
};

export default MainLayout;
