"use client";

import { useState, useEffect } from "react";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
const SUPADEMO_EMBED_URL = process.env.NEXT_PUBLIC_SUPADEMO_EMBED_URL || "";

export default function DemoPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    // Load saved user data from localStorage
    const savedName = localStorage.getItem("agryd_user_name");
    const savedEmail = localStorage.getItem("agryd_user_email");
    if (savedName || savedEmail) {
      setFormData((prev) => ({
        ...prev,
        name: savedName || "",
        email: savedEmail || "",
      }));
    }
    // Preload loading image
    const img = new Image();
    img.src = "/loading.webp";
  }, []);

  useEffect(() => {
    if (submitStatus === "success" && !isIframeLoaded) {
      // Fallback timeout in case onLoad doesn't fire (cross-origin iframe issue)
      const timeout = setTimeout(() => {
        setIsIframeLoaded(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [submitStatus, isIframeLoaded]);

  useEffect(() => {
    if (isSubmitting || (submitStatus === "success" && !isIframeLoaded)) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === "") return ".";
          if (prev === ".") return "..";
          if (prev === "..") return "...";
          return "";
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [isSubmitting, submitStatus, isIframeLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate access key
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error("Web3Forms access key is missing. Please set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY environment variable.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Ensure loading image is loaded before showing loading state
    const img = new Image();
    img.src = "/loading.webp";
    await new Promise((resolve) => {
      if (img.complete) {
        resolve(true);
      } else {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
      }
    });
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
          subject: `Agryd - Demo Request - ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          name: formData.name,
          company: formData.company || "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Web3Forms error:", result);
        setSubmitStatus("error");
        setIsSubmitting(false);
      } else if (result.success) {
        // Save user data to localStorage
        localStorage.setItem("agryd_user_name", formData.name);
        localStorage.setItem("agryd_user_email", formData.email);
        if (formData.company) {
          localStorage.setItem("agryd_user_company", formData.company);
        }
        setSubmitStatus("success");
        setIsIframeLoaded(false);
      } else {
        console.error("Web3Forms submission failed:", result);
        setSubmitStatus("error");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-dvh bg-[#fbfaf9] text-[#0C0C0C] flex flex-col overflow-hidden">
      <nav className=" backdrop-blur-sm shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex">
            <img src="/logo.png" alt="Agryd logo" className="h-[30px] mr-3" />
            <span className="text-2xl font-semibold">Agryd</span>
          </div>
        </div>
      </nav>

      {submitStatus === "success" ? (
        <div className="flex-1 flex items-center justify-center w-full overflow-hidden relative">
          {!isIframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#fbfaf9]">
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <img src="/loading.webp" alt="Loading animation" className="w-[30%] py-[20px] opacity-55" />
                <h3 className="text-3xl font-semibold text-black mb-3">Lemme cook{loadingDots}</h3>
              </div>
            </div>
          )}
          <div style={{ position: "relative", boxSizing: "content-box", maxHeight: "80svh", width: "100%", aspectRatio: "1.85", padding: "40px 0 40px 0" }}>
            <iframe
              src={SUPADEMO_EMBED_URL}
              loading="lazy"
              title="Agryd.xyz"
              allow="clipboard-write"
              frameBorder="0"
              allowFullScreen
              onLoad={() => setIsIframeLoaded(true)}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>
      ) : isSubmitting ? (
        <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <img src="/loading.webp" alt="" className="w-[30%] py-[20px] opacity-55" />
            <h3 className="text-3xl font-semibold text-black mb-3">Lemme cook</h3>
          </div>
        </div>
      ) : (
        <>

          {/* Demo Form Section */}
          <section className="flex-1 flex items-center justify-center px-[5vw] overflow-hidden">
            <div className="w-full max-w-7xl flex flex-col justify-center items-center  rounded-2xl overflow-hidden h-full max-h-[calc(100dvh-120px)]">
              <div className="flex flex-col justify-center py-4 md:py-0 md:w-1/2 shrink-0">
                <div className="px-6 md:px-10 ">
                  <h1 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-black text-center mb-6 md:mb-8">
                    You're on a right track
                  </h1>
                  <img src="/AssemblyLine.png" alt="Contract workflow illustration showing the approval process" className=" h-auto object-contain mx-auto opacity-65" />
                </div>
              </div>
              <div className="flex-1 px-6 md:px-8 pb-6 flex flex-col justify-center overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4 w-[80vw] sm:w-[450px]">
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="Email"
                      className="w-full px-4 py-2 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] focus:outline-none focus:border-[#0C0C0C] transition-colors placeholder-[#73777e]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      placeholder="Your company"
                      className="w-full px-4 py-2 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-2 sm:py-3 bg-[#0C0C0C] hover:bg-[#1F1F1F] text-white text-lg font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Let's go"}
                  </button>
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );

}

