import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Components
import Header from "../components/Header/Header";
import ProjectSpotlight from "../components/ProjectSpotlight/ProjectSpotlight";
import TagFilterBar from "../components/TagFilter/TagFilterBar";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <ProjectSpotlight />
        <TagFilterBar />
        <ProjectList />
      </Container>

      <Footer />
    </Box>
  );
};

export default MainLayout;
