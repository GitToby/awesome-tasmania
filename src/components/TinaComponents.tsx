import { Linkd } from "./Linkd";

export const tinaComponents = {
  Iframe: (props: { src: string }) => (
    <iframe className="w-full shadow mb-5 h-72" src={props.src}></iframe>
  ),
  Link: (props: any) => {
    const link = props.link;
    if (link && link.url && link.description) {
      return (
        <Linkd
          className="btn btn-wide btn-outline my-4"
          href={link.url}
          externalFlag={link.externalFlag}
        >
          {link.description}
        </Linkd>
      );
    } else {
      return null;
    }
  },
  // Link: (props: any) => <>{JSON.stringify(props)}</>,
};
