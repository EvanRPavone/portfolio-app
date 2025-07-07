// portfolio-app/frontend/src/layout/MainLayout.tsx

import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Components
import Header from "../components/Header/Header";
import AboutCard from "../components/AboutCard/AboutCard";
import ProjectSpotlight from "../components/ProjectSpotlight/ProjectSpotlight";
import ProjectList from "../components/ProjectList/ProjectList";
import Footer from "../components/Footer/Footer";

// Types
import type { UserInfo } from "../types";

interface MainLayoutProps {
    images: Record<string, string>;
    userInfo: UserInfo | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ images, userInfo }) => {
    const { projectId } = useParams();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: (theme) => theme.palette.background.default,
            }}
        >
            <Header user={userInfo} />

            <Container maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 3, sm: 4 } }}>
                {userInfo && <AboutCard user={userInfo} />}
                <ProjectSpotlight images={images} />
                <ProjectList images={images} openModalId={projectId || null} />
            </Container>

            <Footer />
        </Box>
    );
};

export default MainLayout;
