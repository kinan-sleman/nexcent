import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FooterData from "./Footer.json";

interface LinkItem {
    title: string;
    link: string;
}

interface SocialLinkItem {
    platform: string;
    link: string;
}

interface CompanyInfo {
    logo: string;
    name: string;
    copyright: string;
    social_links: SocialLinkItem[];
}

interface Section {
    title: string;
    links: LinkItem[];
}

interface Newsletter {
    title: string;
    placeholder: string;
    button_icon: string;
}

interface FooterItem {
    is_demo: boolean;
    demo_title: string;
    demo_btn: LinkItem;
    footer: {
        company_info: CompanyInfo;
        sections: Section[];
        newsletter: Newsletter;
    };
}

interface FooterState {
    footer: FooterItem | null;
}

const initialState: FooterState = {
    footer: null,
};

const FooterSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
        setFooter(state, action: PayloadAction<FooterItem>) {
            state.footer = action.payload;
        },
    },
});

export const { setFooter } = FooterSlice.actions;

export const loadFooter = () => (dispatch: any) => {
    dispatch(setFooter(FooterData));
};

export default FooterSlice.reducer;
