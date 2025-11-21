import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  // Social Icons
  const EmailIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2" />
      <line
        x1="17.5"
        y1="6.5"
        x2="17.51"
        y2="6.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <section className="w-full min-h-screen   py-12 md:py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h1
              className="text-xl md:text-2xl lg:text-2xl font-bold text-white mb-8 uppercase"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Contact Us
            </h1>

            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              Got a question or hit a snag? Moonbet's support squad is on
              standby. Drop us a line using the form on the right and we'll sort
              it fast. For quick fixes, hit the{" "}
              <span className="text-[#F07730] font-bold">FAQ</span> link in the
              top menu.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="mailto:support@moonbet.games"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center 
                         hover:bg-[#F07730] transition-all duration-300 group text-black hover:text-white"
              >
                <EmailIcon />
              </motion.a>

              <motion.a
                href="https://twitter.com/moonbet"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center 
                         hover:bg-[#F07730] transition-all duration-300 group"
              >
                <div className="text-black group-hover:text-white transition-colors">
                  <TwitterIcon />
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/moonbet"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center 
                         hover:bg-[#F07730] transition-all duration-300 group"
              >
                <div className="text-black group-hover:text-white transition-colors">
                  <InstagramIcon />
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 
                             rounded-xl text-white placeholder-gray-500 focus:outline-none 
                             focus:border-[#F07730] focus:bg-white/15 transition-all duration-300"
                    style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 
                             rounded-xl text-white placeholder-gray-500 focus:outline-none 
                             focus:border-[#F07730] focus:bg-white/15 transition-all duration-300"
                    style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-300 text-sm mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                  className="w-full px-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 
                           rounded-xl text-white placeholder-gray-500 focus:outline-none 
                           focus:border-[#F07730] focus:bg-white/15 transition-all duration-300"
                  style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm mb-2"
                >
                  Write your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write us your questions here"
                  required
                  rows="5"
                  className="w-full px-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 
                           rounded-xl text-white placeholder-gray-500 focus:outline-none 
                           focus:border-[#F07730] focus:bg-white/15 transition-all duration-300 resize-none"
                  style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 md:py-5 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                         text-black font-bold text-base md:text-lg rounded-xl 
                         hover:shadow-lg hover:shadow-[#F07730]/25 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Additional Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Other Ways to Reach Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "💬",
                title: "Live Chat",
                desc: "Get instant help",
                action: "Start Chat",
              },
              {
                icon: "📧",
                title: "Email Support",
                desc: "support@moonbet.games",
                action: "Send Email",
              },
              {
                icon: "📚",
                title: "FAQ Center",
                desc: "Find quick answers",
                action: "Browse FAQ",
              },
              {
                icon: "🌐",
                title: "Community",
                desc: "Join Discord",
                action: "Join Now",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="wallet-btn3 rounded-2xl p-6 text-center hover:bg-white/5 
                         transition-all duration-300 cursor-pointer group"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
                <span className="text-[#F07730] text-sm font-bold group-hover:text-[#EFD28E] transition-colors">
                  {item.action} →
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUsPage;
