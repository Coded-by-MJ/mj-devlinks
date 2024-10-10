import { PiGithubLogoFill, PiDevToLogoFill } from "react-icons/pi";
import {
  SiFrontendmentor,
  SiCodewars,
  SiGitlab,
  SiHashnode,
} from "react-icons/si";
import { IoLogoTwitter } from "react-icons/io";
import {
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTwitch,
  FaCodepen,
  FaFreeCodeCamp,
  FaStackOverflow,
} from "react-icons/fa";

export const socialPlatforms = [
  {
    name: "Github",
    icon: (
      <PiGithubLogoFill className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://github.com/",
  },
  {
    name: "Dev.to",
    icon: (
      <PiDevToLogoFill className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://dev.to/",
  },
  {
    name: "Frontend Mentor",
    icon: (
      <SiFrontendmentor className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.frontendmentor.io/profile/",
  },
  {
    name: "Codewars",
    icon: (
      <SiCodewars className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.codewars.com/users/",
  },
  {
    name: "Gitlab",
    icon: (
      <SiGitlab className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://gitlab.com/",
  },
  {
    name: "Hashnode",
    icon: (
      <SiHashnode className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://hashnode.com/@",
  },
  {
    name: "Twitter",
    icon: (
      <IoLogoTwitter className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://twitter.com/",
  },
  {
    name: "LinkedIn",
    icon: (
      <FaLinkedin className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.linkedin.com/in/",
  },
  {
    name: "YouTube",
    icon: (
      <FaYoutube className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.youtube.com/@",
  },
  {
    name: "Facebook",
    icon: (
      <FaFacebook className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.facebook.com/",
  },
  {
    name: "Twitch",
    icon: (
      <FaTwitch className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.twitch.tv/",
  },
  {
    name: "Codepen",
    icon: (
      <FaCodepen className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://codepen.io/",
  },
  {
    name: "freeCodeCamp",
    icon: (
      <FaFreeCodeCamp className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://www.freecodecamp.org/news/author",
  },
  {
    name: "StackOverflow",
    icon: (
      <FaStackOverflow className="group-hover:text-main transition-all text-main-gray" />
    ),
    url: "https://stackoverflow.com/users/",
  },
];
