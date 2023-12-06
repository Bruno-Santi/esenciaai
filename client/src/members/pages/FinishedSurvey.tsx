import JSConfetti from "js-confetti";
import { useEffect } from "react";

export const FinishedSurvey = () => {
  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
  });
  useEffect(() => {
    jsConfetti.addConfetti({
      emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
    });
  }, []);

  return (
    <div className='bg-primary h-screen w-full'>
      <h2 className='font-poppins text-4xl flex m-auto text-tertiary'>
        Congratulations!
      </h2>
    </div>
  );
};
