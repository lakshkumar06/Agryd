"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

function WaitlistModal({
  isOpen,
  onClose,
  initialEmail,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialEmail: string;
}) {
  const [formData, setFormData] = useState({
    email: initialEmail,
    name: "",
    company: "",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      // Load saved user data from localStorage
      const savedName = localStorage.getItem("agryd_user_name");
      const savedEmail = localStorage.getItem("agryd_user_email") || initialEmail;
      const savedCompany = localStorage.getItem("agryd_user_company");
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        name: savedName || "",
        company: savedCompany || "",
      }));
      setSubmitStatus("idle");
    }
  }, [isOpen, initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate access key
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error("Web3Forms access key is missing. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY environment variable.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Agryd - Waitlist - ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          name: formData.name,
          company: formData.company || "",
          comments: formData.comments || "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Web3Forms error:", result);
        setSubmitStatus("error");
      } else if (result.success) {
        // Save user data to localStorage
        localStorage.setItem("agryd_user_name", formData.name);
        localStorage.setItem("agryd_user_email", formData.email);
        if (formData.company) {
          localStorage.setItem("agryd_user_company", formData.company);
        }
        setSubmitStatus("success");
      } else {
        console.error("Web3Forms submission failed:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-4 md:pt-20 px-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl animate-bounce-in overflow-hidden py-6 md:py-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#0C0C0C] transition-colors z-10"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitStatus === "success" ? (
          <div className="flex flex-col items-center justify-center md:py-16 px-8 text-center">
           <img src="/confirmation.png" alt="Confirmation checkmark" className="w-[30%] py-[20px]" />
            <h3 className="text-3xl font-semibold text-black mb-3">You made it!</h3>
            <p className="text-[#6B7280] text-lg mb-8 max-w-md">
              We&apos;ll be in touch soon with early access details.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#0C0C0C] hover:bg-[#1F1F1F] text-white text-lg font-medium rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row bg-[#fbfaf9]">
            <div className="flex flex-col justify-center py-10 md:py-0 md:w-1/2">
              <div className="px-10">
                <h3 className="text-xl sm:text-3xl font-semibold text-black text-center">
                  You&apos;re on the right track.
                </h3>
                <img src="/AssemblyLine.png" alt="Contract workflow illustration showing the approval process" className="md:mt-[36px]" />
              </div>
            </div>
            <div className="flex-1 px-8 md:pt-16 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 md:block">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Email"

                    className="w-full px-4 py-2 md:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] focus:outline-none focus:border-[#0C0C0C] transition-colors placeholder-[#73777e]"
                  />
                </div>
                <div className="flex items-center gap-2 md:block">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 md:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 md:block">
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company"
                    className="w-full px-4 py-2 md:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="Anything you'd like us to know?"
                    rows={3}
                    className="w-full px-4 py-2 md:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#0C0C0C] hover:bg-[#1F1F1F] text-white text-lg font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WaitlistForm({
  buttonText = "Join Waitlist",
  onOpenModal,
  email,
  setEmail,
}: {
  buttonText?: string;
  onOpenModal: () => void;
  email: string;
  setEmail: (email: string) => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3 sm:py-4 bg-white border border-[#E5E7EB] rounded-xl text-[#0C0C0C] text-md md:text-lg placeholder-[#9CA3AF] focus:outline-none focus:border-[#0C0C0C] transition-colors w-[80%] sm:w-[450px] mx-auto sm:mx-0"
      />
      <button
        type="submit"
        className="px-8 py-3 sm:py-4 bg-[#0C0C0C] hover:bg-[#1F1F1F] text-white text-md md:text-lg font-medium rounded-xl transition-colors whitespace-nowrap w-fit mx-auto sm:mx-0"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white text-[#0C0C0C]">
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEmail={email}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex">
        <img src="/logo.png" alt="Agryd logo" className="h-[30px] mr-3" />

          <span className="text-2xl font-semibold">Agryd</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 px-[5vw] relative h-[90vh] sm:h-screen">
        <div className="absolute bottom-0 right-0">
          <img src="/HeroBG.png" alt="" className="opacity-50 w-full  sm:max-w-[80vw]" role="presentation" />
        </div>

        <div className="relative">
          <h1 className="text-5xl sm:text-7xl lg:text-[90px] font-medium tracking-tight leading-[1.1em] mb-8 text-center sm:text-left">
            No more Chaos.
          </h1>
          <p className="text-lg sm:text-2xl text-[#6B7280] mb-10 max-w-2xl text-center sm:text-left">
            The workspace where teams can stop chasing documents and start closing deals
          </p>
          <div className="text-center sm:text-left">
            <Link href="/demo" className="inline-block px-8 py-3 sm:py-4 bg-[#0C0C0C] hover:bg-[#1F1F1F] text-white text-md md:text-lg font-medium rounded-xl transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Feature 1 */}

      <section className="pt-32 pb-20 sm:py-32 px-[5vw] sm:flex">
      <div className="w-[40%] sm:hidden pb-10">
          <img src="/Section1.png" alt="Visualization of contract edits and approvals timeline" className="opacity-50" />
        </div>
        <div className="sm:w-[60%] flex flex-col justify-center">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-[90px] leading-[1.1em] font-medium tracking-tight mb-8">
              Every edit. <br /> Every approval. <br /> One timeline.
            </h2>
            <p className="text-md sm:text-xl text-[#6B7280] max-w-2xl leading-relaxed">
             Agryd shows you exactly what changed, when it changed, and who said yes to it. No more digging through email threads or Slack messages for the latest version.

            </p>
          </div>
        </div>
        <div className="w-[40%] hidden sm:block">
          <img src="/Section1.png" alt="Visualization of contract edits and approvals timeline" className="opacity-50" />
        </div>
      </section>

      {/* Feature 2 */}
      <section className="py-12 px-[5vw] bg-[#FAFAFA] sm:flex">
        <div className="w-[40%]">
          <img src="/Section2.png" alt="Illustration of integrated payment workflow in contracts" className="opacity-50" />
        </div>
        <div className="sm:w-[60%] flex flex-col justify-center sm:ml-[5vw]">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-[90px] font-medium tracking-tight leading-[1.1em] mb-8 max-w-3xl">
            The funds move
            </h2>
            <p className="text-md sm:text-xl text-[#6B7280] max-w-2xl leading-relaxed">
            Lock money when you create the contract. When everyone approves, it releases automatically. No reminders. No three-month wait. No more checking with accounting.</p>
          </div>
        </div>
      </section>

      {/* Feature 3 */}
      <section className="py-12 px-[5vw] sm:flex">
      <div className="w-[40%] sm:hidden">
          <img src="/Section3.png" alt="Team collaboration and unified workspace for contract management" className="opacity-50" />
        </div>
        <div className="sm:w-[60%] flex flex-col justify-center">
          <div>

            <h2 className="text-4xl sm:text-5xl lg:text-[90px] font-medium tracking-tight leading-[1.1em] mb-8 max-w-3xl">
              Built for teams
            </h2>
            <p className="text-md sm:text-xl text-[#6B7280] max-w-2xl leading-relaxed">
              Everyone works from the same source of truth. No context lost between teams.
            </p>
          </div>
        </div>
        <div className="w-[40%] hidden sm:block">
          <img src="/Section3.png" alt="Team collaboration and unified workspace for contract management" className="opacity-50" />
        </div>
      </section>

      {/* Footer CTA */}
      <section id="waitlist" className="relative bg-[#0C0C0C] text-white mt-25 sm:mt-0">
        <div className="absolute bottom-0">
          <img src="/Footerbg.png" alt="" className="opacity-20 " role="presentation" />
        </div>
        <div className="text-center relative px-6 py-20 lg:py-32">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            Ready to fix your contract workflow?
          </h2>
          <p className="text-xl text-[#9CA3AF] mb-6 md:mb-12">Join the waitlist for early access.</p>
          <div className="flex justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3 sm:py-4 bg-[#1f1f1f85] border border-[#333] rounded-xl text-white text-lg placeholder-[#6B7280] focus:outline-none focus:border-[#525252] transition-colors w-[80%] sm:w-full mx-auto "
              />
              <button
                type="submit"
                className="px-8 py-2 sm:py-4 bg-white hover:bg-[#F5F5F5] text-[#0C0C0C] text-lg font-medium rounded-xl transition-colors whitespace-nowrap w-fit mx-auto"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0C0C0C] border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#6B7280] flex items-center justify-center gap-[0.8em]"> <span><img src="/logo.png" alt="Agryd logo" className="h-[1.2em]" /></span>Agryd 2025</p>
        </div>
      </footer>
    </div>
  );
}
