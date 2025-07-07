import { Box, Typography } from "@mui/material";

const NotFound = () => (
    <Box
        sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        }}
    >
        <Typography variant="h3" gutterBottom>
            404
        </Typography>
        <Typography variant="h6">Page not found</Typography>
    </Box>
);

export default NotFound;
