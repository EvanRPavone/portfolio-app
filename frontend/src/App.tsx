import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { getCustomization, getImages, getUserInfo } from "./api";
import type { Customization, ImageAsset, UserInfo } from "./types/Project";

const App: React.FC = () => {
    const [customization, setCustomization] = useState<Customization[]>([]);
    const [images, setImages] = useState<ImageAsset[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfo[]>([]);

    useEffect(() => {
        getCustomization().then((res) => {
            console.log("🎨 Customization data from API:", res.data);
            setCustomization(res.data);
        });
        getImages().then((res) => setImages(res.data));
        getUserInfo().then((res) => setUserInfo(res.data));
    }, []);

    return (
        <Home
            customization={customization}
            images={images}
            userInfo={userInfo}
        />
    );
};

export default App;
