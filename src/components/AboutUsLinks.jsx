import MediaLink from "./MediaLink";
import MediaLinksList from "./MediaLinksList";

const AboutUsLinks = () => {
  return (
    <div className="col-md-2">
      <h5 className="pb-1 title">روابط مفيدة</h5>
      <div className="row">
        <div className="col-md-12  ">
        <MediaLinksList>
                <MediaLink  link="https://www.parlement.ma/" text="المكتبة" />
                <MediaLink  link="https://www.chambredesrepresentants.ma/ar" text="الأرشيف"    />
        </MediaLinksList>
        </div>
      </div>

    </div>
  );
};

export default AboutUsLinks;
