import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound";
import type { ImageMap, UserInfo } from "./types";

function App() {
    const [images, setImages] = useState<Record<string, string>>({});
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${import.meta.env.VITE_API_BASE}/api/images`).then((res) => res.json()),
            fetch(`${import.meta.env.VITE_API_BASE}/api/userinfo`).then((res) => res.json()),
        ])
            .then(([imageData, userData]) => {
                const imageMap: Record<string, string> = {};
                imageData.forEach((img: ImageMap) => {
                    imageMap[img["Image Name"]] = img["Image URL"];
                });
                setImages(imageMap);
                setUserInfo(userData[0]);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                aria-label="Loading app content"
            >
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Router>
          <Routes>
            <Route
                path="/"
                element={<MainLayout images={images} userInfo={userInfo} />}
            />
            <Route
                path="/:projectId"
                element={<MainLayout images={images} userInfo={userInfo} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    );
}

export default App;
