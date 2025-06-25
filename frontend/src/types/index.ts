// Represents the single user object returned from /api/userinfo
export interface UserInfo {
  "First Name": string;
  "Last Name": string;
  Bio: string;
  Location: string;
  Github: string;
  LinkedIn: string;
  Website: string;
  "Resume URL": string;
  picture: string;
}

// Represents global theme/layout customization pulled from /api/customization.
export interface Customization {
  primarycolor: string;
  secondarycolor: string;
  font: string;
  themestyle: "light" | "dark";
  layout: "grid" | "list";
}

// Represents a single item from the /api/projects array.
export interface Project {
  "Project ID": string;
  Title: string;
  Description: string;
  Github: string;
  Tags: string; // Comma-separated string
  Date: string;
  Highlight: string; // Can be "TRUE" or empty string
  Images: string; // Comma-separated string of image names
}

// Represents a single tag string from /api/tags.
export type Tag = string;

// Each item in /api/images contains a name and corresponding URL.
export interface ImageMap {
  "Image Name": string;
  "Image URL": string;
}
