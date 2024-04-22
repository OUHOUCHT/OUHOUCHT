import MediaLink from "./MediaLink";
import MediaLinksList from "./MediaLinksList";

const AboutUsLinks = () => {
  return (
    <div className="col-md-2">
      <h5 className="pb-1 title">روابط مفيدة</h5>
      <div className="row">
        <div className="col-md-12  ">
        <MediaLinksList>
                <MediaLink  link="https://bibliotheque.parlement.ma/" text="المكتبة" />
                <MediaLink  link="http://portail.parlement.intra:9080/navigator/?desktop=exposition" text="الأرشيف الإلكتروني"    />
                {
                  /**
                   * <MediaLink  link="/parlement/termsOfService" text="شروط الخدمة"    />
                   * <MediaLink  link="/parlement/privacyPolicy" text="سياسة الخصوصية"    />
                   */
                }

        </MediaLinksList>
        </div>
      </div>

    </div>
  );
};

export default AboutUsLinks;
