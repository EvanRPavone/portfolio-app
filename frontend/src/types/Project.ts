export type Project = {
    Title?: string;
    Tags?: string;
    Description?: string;
    Github?: string;
    Type?: string;
    Date?: string;
    [key: string]: string | undefined;
};

// types.ts
export type Customization = {
    key: string;
    value: string;
};

export type ParsedCustomization = {
    primary: string;
    secondary: string;
    font: string;
    themeStyle: string;
    layout: string;
};

export type ImageAsset = {
    projectId: string;
    url: string;
    alt?: string;
};

export type UserInfo = {
    "First Name": string;
    "Last Name": string;
    "Bio": string;
    "Location": string;
    "Github": string;
    "LinkedIn": string;
    "Website": string;
    "Resume URL": string;
};

