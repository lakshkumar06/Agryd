"use client";

import { useState, useEffect } from "react";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
  }, []);

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
          subject: `Agryd - Feedback from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          name: formData.name,
          feedback: formData.feedback,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Web3Forms error:", result);
        setSubmitStatus("error");
      } else if (result.success) {
        // Update saved user data in localStorage
        localStorage.setItem("agryd_user_name", formData.name);
        localStorage.setItem("agryd_user_email", formData.email);
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

  return (
    <div className="h-dvh bg-[#fbfaf9] text-[#0C0C0C] flex flex-col overflow-hidden">
      {/* Nav */}
      <nav className=" backdrop-blur-sm shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex">
            <img src="/logo.png" alt="Agryd logo" className="h-[30px] mr-3" />
            <span className="text-2xl font-semibold">Agryd</span>
          </div>
        </div>
      </nav>

      {submitStatus === "success" ? (
        <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <img src="/confirmation.png" alt="Confirmation checkmark" className="w-[30%] py-[20px]" />
            <h3 className="text-3xl font-semibold text-black mb-3">Thank you!</h3>
            <p className="text-[#6B7280] text-lg mb-8 max-w-md">
              We really appreciate your input!
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Feedback Form Section */}
          <section className="flex-1 flex items-center justify-center px-[5vw] overflow-hidden">
            <div className="w-full max-w-7xl flex flex-col justify-center items-center  rounded-2xl overflow-hidden h-full max-h-[calc(100dvh-120px)]">
              <div className="flex flex-col justify-center py-4 md:py-0 md:w-1/2 shrink-0">
                <div className="px-6 md:px-10 ">
                  <h1 className="text-xl sm:text-xl md:text-2xl font-semibold text-black text-center mb-3 md:mb-4">
                    Share your feedback
                  </h1>
                  <img src="/AssemblyLine.png" alt="Contract workflow illustration showing the approval process" className="w-[300px] sm:w-[400px] h-auto object-contain mx-auto opacity-60" />
                </div>
              </div>
              <div className="flex-1 px-6 md:px-8 pb-6 flex flex-col justify-center overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4  w-[80vw] sm:w-[450px]">
                  <div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors text-sm md:text-md"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="Email"
                      className="w-full px-4 py-2 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] focus:outline-none focus:border-[#0C0C0C] transition-colors placeholder-[#73777e] text-sm md:text-md"
                    />
                  </div>
                  <div>
                    <textarea
                      value={formData.feedback}
                      onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                      required
                      placeholder="Your feedback..."
                      rows={4}
                      className="w-full px-4 py-2 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#0C0C0C] placeholder-[#73777e] focus:outline-none focus:border-[#0C0C0C] transition-colors resize-none text-sm md:text-md"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-2 sm:py-3 bg-[#0C0C0C] hover:bg-[#1F1F1F] text-white text-md font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
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

