
import './Footer.css'; // Import your custom styles
import AboutUsLinks from '../AboutUsLinks';
import UsefulLinks from '../UsefulLinks';
import SocialMediaLinks from '..//SocialMediaLinks';
import CopyrightNotice from '../CopyrightNotice';
const Footer = () => {
  return (
    <footer className="container-fluid bg-light text-dark px-5 pt-4 p-3" >
      <div className=" text-right">
        <div className="row">
          <UsefulLinks />
          <SocialMediaLinks/>
         <AboutUsLinks /> 
        </div>
        <div className="row mt-5  site-footer__copyright">
          <CopyrightNotice />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
