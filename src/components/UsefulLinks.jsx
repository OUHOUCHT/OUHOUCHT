import MediaLink from "./MediaLink";
import MediaLinksList from "./MediaLinksList";

const UsefulLinks = () => {
  return (
    <div className="col-md-4">
      <h5 className="pb-1 title "> البوابة الإلكترونية</h5>
      <div className="row">
        <div className="col-md-6  ">
          <MediaLinksList>
                <MediaLink  link="https://www.parlement.ma/" text="بوابة البرلمان" />
                <MediaLink  link="https://www.chambredesrepresentants.ma/ar" text="بوابة مجلس النواب"  />
                <MediaLink   link="http://www.chambredesconseillers.ma/ar" text="بوابة مجلس المستشارين" />
          </MediaLinksList>
      </div>

 

      </div>

    </div>
  );
};

export default UsefulLinks;
