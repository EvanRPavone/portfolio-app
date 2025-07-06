// portfolio-app/frontend/src/layout/MainLayout.tsx
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Components
import Header from "../components/Header/Header";
import AboutCard from "../components/AboutCard/AboutCard";
import ProjectSpotlight from "../components/ProjectSpotlight/ProjectSpotlight";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";

// Types
import type { ImageMap, UserInfo } from "../types";

const MainLayout = () => {
    const [images, setImages] = useState<Record<string, string>>({});
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/images`)
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

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE}/api/userinfo`)
            .then((res) => res.json())
            .then((data) => setUserInfo(data[0]))
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

            <Container
                maxWidth="lg"
                sx={{ flexGrow: 1, py: { xs: 3, sm: 4 } }}
            >
                {userInfo && <AboutCard user={userInfo} />}
                <ProjectSpotlight images={images} />
                <ProjectList images={images} />
            </Container>

            <Footer />
        </Box>
    );
};

export default MainLayout;
