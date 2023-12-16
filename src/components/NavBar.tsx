import {Linkd} from "./Linkd";
import {useTina} from "tinacms/dist/react";
import {PageQueryResponse} from "@/types";

import {PageLink} from "./PageLink";
import {Page} from "../../tina/__generated__/types";

type NavButtonsProps = {
    pages: PageQueryResponse;
};

export function NavButtons(props: NavButtonsProps) {
    const _siteData = useTina({
        data: props.pages.data,
        query: props.pages.query,
        variables: props.pages.variables,
    });
    const navPages = _siteData.data.pageConnection.edges.filter(edge => edge.node).map(edge => edge.node);

    return (
        <div className="flex flex-wrap gap-2">
            <Linkd className="btn btn-primary btn-sm" href="/">
                Home
            </Linkd>
            {navPages && navPages.map((link, idx) => (
                <PageLink key={idx} page={link as Page} className="btn btn-primary btn-sm"/>
            ))}
        </div>
    );
}
