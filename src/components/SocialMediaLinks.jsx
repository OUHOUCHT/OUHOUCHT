import MediaLinksList from './MediaLinksList';
import MediaLink from './MediaLink';

const SocialMediaLinks = () => {
    return (
    <div className="col-md-6">
      <h5 className="pb-1 title ">شبكات التواصل الاجتماعي</h5>
      <div className="row">
        <div className="col-md-5 ">
          <MediaLinksList>
            <MediaLink  link="https://www.facebook.com/chambredesconseillers.officiel/" text="صفحة الفيسبوك [مجلس المستشارين]" />
            <MediaLink  link="https://www.youtube.com/c/ChambredesConseillersMaroc" text=" صفحة اليوتيوب [مجلس المستشارين]"  />
            <MediaLink  link="https://twitter.com/Parlement_ma" text=" صفحة التويتر [مجلس النواب]"  />

          </MediaLinksList>
        </div>
        <div className="col-md-5 ">
          <MediaLinksList>
            <MediaLink  link="https://www.facebook.com/parlement.ma" text="صفحة الفيسبوك [مجلس النواب]" />
            <MediaLink  link="https://www.youtube.com/channel/UCLmLW2hwH-kk9w8QrdX8uAA" text=" صفحة اليوتيوب [مجلس النواب]"  />
          </MediaLinksList>
        </div>

      </div>
    </div>

      );
};

export default SocialMediaLinks;
