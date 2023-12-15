import MediaLink from "./MediaLink";
import MediaLinksList from "./MediaLinksList";

const AboutUsLinks = () => {
  return (
    <div className="col-md-2">
      <h5 className="pb-1 title">نبذة عنا</h5>
      <div className="row">
        <div className="col-md-12  ">
        <MediaLinksList>
                <MediaLink  link="#" text="اتصل بنا" />
        </MediaLinksList>
        </div>
      </div>

    </div>
  );
};

export default AboutUsLinks;
