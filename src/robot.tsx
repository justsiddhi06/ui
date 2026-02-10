import Lottie from "lottie-react";

export default function Robot({ active }: { active: boolean }) {
  return (
    <div className="robot">
      <Lottie
        path="/loop.json"
        loop={active}          // ✅ sirf typing pe loop
        autoplay={active}      // ✅ sirf typing pe play
        style={{ width: 450 }}
      />
    </div>
  );
}
