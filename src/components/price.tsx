import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useSession } from "next-auth/react";

export function CardSpotlightDemo() {
  return (
    <div id="pricing"className="flex flex-col md:flex-row gap-8 justify-center items-center p-4">
      {/* Free Tier Card */}
      <CardSpotlight className="h-[420px] w-full max-w-md">
        <div className="relative z-20 h-full flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-white">Free Tier</p>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm">
                5 trials
              </span>
            </div>
            <div className="text-neutral-200 mt-4">
              <p className="mb-4">Basic features to get started:</p>
              <ul className="space-y-3">
                <Step title="Enter your email address" />
                <Step title="Create a strong password" />
                <Step title="Set up two-factor authentication" />
                <Step title="Create basic interviews" />
              </ul>
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-neutral-300 text-sm mb-4">
              Limited access to standard interview templates.
            </p>
            <button  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </CardSpotlight>

      {/* Pro Tier Card - Enhanced with spotlight effect */}
      <CardSpotlight className="h-[420px] w-full max-w-md border-2 border-yellow-400/30 relative">
        <div className="absolute top-0 right-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-bl-md">
          PRO
        </div>
        <div className="relative z-20 h-full flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-white">Pro Tier</p>
              <span className="px-3 py-1 rounded-full bg-yellow-900/50 text-yellow-300 text-sm">
                Unlimited
              </span>
            </div>
            <div className="text-neutral-200 mt-4">
              <p className="mb-4">Premium features for professionals:</p>
              <ul className="space-y-3">
                <Step title="All Free tier features" pro />
                <Step title="Unlimited interview creation" pro />
                <Step title="Advanced analytics dashboard" pro />
                <Step title="Custom branding options" pro />
                <Step title="Priority customer support" pro />
                <Step title="AI-powered feedback system" pro />
              </ul>
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-neutral-300 text-sm mb-2">
              Full access to all premium features and templates.
            </p>
            <button className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-md text-black font-bold transition-colors">
              Upgrade to Pro - $29/mo
            </button>
          </div>
        </div>
      </CardSpotlight>
    </div>
  );
}

const Step = ({ title, pro = false }: { title: string; pro?: boolean }) => {
  return (
    <li className="flex gap-2 items-start">
      {pro ? (
        <div className="flex items-center">
          <StarIcon />
        </div>
      ) : (
        <CheckIcon />
      )}
      <p className={`${pro ? "text-yellow-300" : "text-white"}`}>{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

const StarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-yellow-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
        fill="currentColor"
      />
    </svg>
  );
};