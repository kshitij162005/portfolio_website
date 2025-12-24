import { useEffect, useState } from "react";
import { Calendar, Mail, Send, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if Calendly script is already loaded
    const existingScript = document.querySelector('script[src*="calendly.com"]');
    
    if (!existingScript) {
      // Load Calendly widget script
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Add custom styles for Calendly widget
    const styleId = 'calendly-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .calendly-inline-widget {
          background: transparent !important;
        }
        .calendly-inline-widget iframe {
          background: transparent !important;
        }
        .calendly-badge-wrapper {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset status when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Using Web3Forms - a free email API service
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b31fd35f-f0f2-4bba-b982-eaacd0f9526b", // Web3Forms access key
          to_email: "kotechakshitij@gmail.com",
          from_name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">Let's Connect</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Interested in working together? Schedule a call or send me a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Calendly Embed */}
          <div className="glass rounded-xl overflow-hidden border border-border/50">
            <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border/30">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Schedule a Call</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Pick a time that works for you</p>
                </div>
              </div>
            </div>

            {/* Calendly inline widget container */}
            <div className="relative w-full bg-card/50 overflow-hidden">
              <div 
                className="calendly-inline-widget w-full" 
                data-url="https://calendly.com/kotechakshitij/call-with-kshitij"
                style={{ 
                  minWidth: '100%', 
                  height: '450px'
                }}
              />
            </div>
          </div>

          {/* Send Message Form */}
          <div className="glass rounded-xl p-4 sm:p-6 flex flex-col border border-border/50">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Send a Message</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">I'll respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-3 sm:space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/30 border-border/50 focus:border-primary/50 transition-colors text-sm h-9 sm:h-10"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/30 border-border/50 focus:border-primary/50 transition-colors text-sm h-9 sm:h-10"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="subject" className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/30 border-border/50 focus:border-primary/50 transition-colors text-sm h-9 sm:h-10"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5 sm:space-y-2 flex-1">
                <Label htmlFor="message" className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/30 border-border/50 focus:border-primary/50 transition-colors min-h-[100px] sm:min-h-[120px] resize-none text-sm"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-green-500 bg-green-500/10 p-2.5 sm:p-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-destructive bg-destructive/10 p-2.5 sm:p-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full mt-auto h-10 sm:h-11 text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Built with ♥️ by Kshitij Kotecha © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}