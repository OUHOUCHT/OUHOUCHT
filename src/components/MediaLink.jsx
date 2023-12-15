/* eslint-disable react/prop-types */

const MediaLink = ({ icon, link, text }) => {
  return (
    <li>
      <a href={link}>
        {icon} {text}
      </a>
    </li>
  );
};

export default MediaLink;
