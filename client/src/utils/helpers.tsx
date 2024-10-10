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

export function getCorrespondingLogo(name: string, className?: string) {
  switch (name) {
    case "Github":
      return <PiGithubLogoFill className={className} />;
    case "Dev.to":
      return <PiDevToLogoFill className={className} />;
    case "Frontend Mentor":
      return <SiFrontendmentor className={className} />;
    case "Codewars":
      return <SiCodewars className={className} />;
    case "Gitlab":
      return <SiGitlab className={className} />;
    case "Hashnode":
      return <SiHashnode className={className} />;
    case "Twitter":
      return <IoLogoTwitter className={className} />;
    case "LinkedIn":
      return <FaLinkedin className={className} />;
    case "YouTube":
      return <FaYoutube className={className} />;
    case "Facebook":
      return <FaFacebook className={className} />;
    case "Twitch":
      return <FaTwitch className={className} />;
    case "Codepen":
      return <FaCodepen className={className} />;
    case "freeCodeCamp":
      return <FaFreeCodeCamp className={className} />;
    case "StackOverflow":
      return <FaStackOverflow className={className} />;
    default:
      return null;
  }
}

export function getBgColor(name: string) {
  switch (name) {
    case "Github":
      return "bg-[#1a1a1a] text-white";
    case "Frontend Mentor":
      return "bg-white border border-solid border-[#d9d9d9] text-[#333]";
    case "Twitter":
      return "bg-[#43b7e9] text-white";
    case "LinkedIn":
      return "bg-[#2d68ff] text-white";
    case "YouTube":
      return "bg-[#ee3939] text-white";
    case "Facebook":
      return "bg-[#2442ac] text-white";
    case "Dev.to":
      return "bg-[#333] text-white";
    case "Codewars":
      return "bg-[#ba1a50] text-white";
    case "freeCodeCamp":
      return "bg-[#302267] text-white";
    case "Gitlab":
      return "bg-[#eb4925] text-white";
    case "Hashnode":
      return "bg-[#0330d1] text-white";
    case "StackOverflow":
      return "bg-[#ec7100] text-white";
    case "Twitch":
      return "bg-[#ee3fc8] text-white";
    case "Codepen":
      return "bg-[#464646] text-white";
    default:
      return "";
  }
}

export function getProfileUrl(name: string) {
  switch (name) {
    case "Github":
      return "https://www.github.com/";
    case "Dev.to":
      return "https://www.dev.to/";
    case "Frontend Mentor":
      return "https://www.frontendmentor.io/profile/";
    case "Codewars":
      return "https://www.codewars.com/users/";
    case "Gitlab":
      return "https://www.gitlab.com/";
    case "Hashnode":
      return "https://www.hashnode.com/@";
    case "Twitter":
      return "https://www.twitter.com/";
    case "LinkedIn":
      return "https://www.linkedin.com/in/";
    case "YouTube":
      return "https://www.youtube.com/";
    case "Facebook":
      return "https://www.facebook.com/";
    case "Twitch":
      return "https://www.twitch.tv/";
    case "Codepen":
      return "https://www.codepen.io/";
    case "freeCodeCamp":
      return "https://www.freecodecamp.org/news/author";
    case "StackOverflow":
      return "https://www.stackoverflow.com/users/";
    default:
      return "";
  }
}

export const validateImageFile = async (file: File) => {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/png", "image/jpeg"];

  if (file.size > maxUploadSize) {
    throw new Error("The file size must be less than 1 MB.");
  }

  if (!acceptedFileTypes.includes(file.type)) {
    throw new Error("The file must be a PNG or JPG format.");
  }

  const dimensions = await getImageDimensions(file);
  if (dimensions.width > 1024 || dimensions.height > 1024) {
    throw new Error(
      "The image dimensions must be 1024x1024 pixels or smaller."
    );
  }
};

async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const dimensions = { width: img.width, height: img.height };
      URL.revokeObjectURL(url); // Clean up URL
      resolve(dimensions);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
}
