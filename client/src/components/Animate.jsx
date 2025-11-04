import { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Animate() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    AOS.refresh();

    const handleRouteChange = () => {
      AOS.refresh();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return null;
}