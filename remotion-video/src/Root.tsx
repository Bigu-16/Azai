import "./index.css";
import { Composition } from "remotion";
import { AzyabLogoAnimation } from "./AzyabLogo";
import { AzyabLogoAnimationLight } from "./AzyabLogoLight";
import { LinkedInExplainer } from "./linkedin-explainer/LinkedInExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AzyabLogoAnimation"
        component={AzyabLogoAnimation}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AzyabLogoAnimationLight"
        component={AzyabLogoAnimationLight}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AzyabLinkedInExplainer"
        component={LinkedInExplainer}
        durationInFrames={1093}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
