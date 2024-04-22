import MediaLinksList from './MediaLinksList';
import MediaLink from './MediaLink';

const SocialMediaLinks = () => {
    return (
    <div className="col-md-6">
      <h5 className="pb-1 title ">شبكات التواصل الاجتماعي</h5>
      <div className="row">
        <div className="col-md-5 ">
          <MediaLinksList>
            <MediaLink  link="https://www.facebook.com/parlement.ma" text="منصة الفيسبوك [مجلس النواب]" />
            <MediaLink  link="https://www.youtube.com/channel/UCLmLW2hwH-kk9w8QrdX8uAA" text=" منصة اليوتيوب [مجلس النواب]"  />
            <MediaLink  link="https://twitter.com/Parlement_ma" text=" منصة X (التويتر) [مجلس النواب]"  />

          </MediaLinksList>
        </div>
        <div className="col-md-5 ">
          <MediaLinksList>
            <MediaLink  link="https://www.facebook.com/chambredesconseillers.officiel/" text="منصة الفيسبوك [مجلس المستشارين]" />
            <MediaLink  link="https://www.youtube.com/c/ChambredesConseillersMaroc" text=" منصة اليوتيوب [مجلس المستشارين]"  />

          </MediaLinksList>
        </div>

      </div>
    </div>

      );
};

export default SocialMediaLinks;
