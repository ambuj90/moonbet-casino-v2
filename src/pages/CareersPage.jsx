// CareersPage.jsx - Futuristic Casino Careers Page with 3D Elements & Animations
import React, { useState, useRef, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Stars,
  Text3D,
  useTexture,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

// Theme colors for 3D elements (matching CSS variables)
const THEME = {
  pink: "#dc1fff",
  purple: "#5a3799",
  green: "#28c203",
  lightGreen: "#aaf23f",
  gold: "#AA8F23",
  darkPurple1: "#0d0e36",
  darkPurple2: "#1c1d49",
  darkPurple3: "#282753",
  mediumPurple1: "#35326b",
  mediumPurple2: "#555594",
  lavender1: "#7171b4",
  lavender2: "#9292d2",
  lightGrey: "#e1e1e1",
};

// 3D Rotating Coin Component
const FloatingCoin = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color={THEME.gold}
          metalness={0.95}
          roughness={0.05}
          emissive={THEME.gold}
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight position={[...position]} intensity={0.5} color={THEME.gold} />
    </Float>
  );
};

// 3D Rotating Card
const FloatingCard = ({ position = [0, 0, 0] }) => {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={0.5}>
      <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial
          color={THEME.purple}
          metalness={0.8}
          roughness={0.2}
          emissive={THEME.pink}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

// 3D Dice Component
const FloatingDice = ({ position = [0, 0, 0] }) => {
  return (
    <Float speed={2.5} rotationIntensity={3} floatIntensity={0.7}>
      <mesh position={position} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={THEME.pink}
          metalness={0.7}
          roughness={0.3}
          emissive={THEME.pink}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

// 3D Background Scene
const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            fade
            speed={1}
          />

          {/* Floating Elements */}
          <FloatingCoin position={[-3, 2, -2]} scale={0.5} />
          <FloatingCard position={[3, -1, -3]} />
          <FloatingDice position={[-2, -2, -2]} />
          <FloatingCoin position={[2, 1.5, -4]} scale={0.3} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Glass Card Component
const GlassCard = ({ children, className = "", delay = 0, onClick = null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden backdrop-blur-xl rounded-2xl shadow-2xl ${className}`}
      style={{
        background: "var(--glass-white-5)",
        border: "1px solid var(--glass-white-10)",
        boxShadow: "0 20px 40px rgba(90, 55, 153, 0.1)",
      }}
      onClick={onClick}
    >
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(220, 31, 255, 0.05), transparent, rgba(90, 55, 153, 0.05))",
        }}
      />

      {/* Glass Highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--glass-highlight)" }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />

      {children}
    </motion.div>
  );
};

// Neon Button Component
const NeonButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: {
      background: "var(--cta-gradient)",
    },
    secondary: {
      background: "var(--cta-pink-gradient)",
    },
    success: {
      background: "var(--cta3-green-gradient)",
    },
  };

  const currentVariant = variants[variant];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${className}`}
      style={{
        background: currentVariant.background,
        boxShadow: `0 0 20px ${currentVariant.glowColor}`,
      }}
    >
      {/* Neon Glow */}
      <motion.div
        className="absolute rounded-xl opacity-75 blur-xl"
        style={{ background: currentVariant.background }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Job Card Component
const JobCard = ({ job, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard delay={delay} className="p-8">
      <motion.div className="space-y-6">
        {/* Job Header */}
        <div className="flex justify-between items-start">
          <div>
            <motion.h3
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--white)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
            >
              {job.title}
            </motion.h3>
            <div className="flex flex-wrap gap-3 mt-3">
              <span
                className="px-3 py-1 rounded-lg text-sm"
                style={{
                  background: "rgba(220, 31, 255, 0.2)",
                  border: "1px solid rgba(220, 31, 255, 0.3)",
                  color: "var(--cta-pink)",
                }}
              >
                {job.location}
              </span>
              <span
                className="px-3 py-1 rounded-lg text-sm"
                style={{
                  background: "rgba(90, 55, 153, 0.2)",
                  border: "1px solid rgba(90, 55, 153, 0.3)",
                  color: "var(--text-lavender-2)",
                }}
              >
                {job.type}
              </span>
              {job.compensation && (
                <span
                  className="px-3 py-1 rounded-lg text-sm"
                  style={{
                    background: "rgba(40, 194, 3, 0.2)",
                    border: "1px solid rgba(40, 194, 3, 0.3)",
                    color: "var(--cta2-light-green)",
                  }}
                >
                  {job.compensation}
                </span>
              )}
            </div>
          </div>

          <NeonButton
            onClick={() => setIsExpanded(!isExpanded)}
            variant="primary"
            className="text-sm"
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </NeonButton>
        </div>

        {/* Job Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 pt-6"
              style={{ borderTop: "1px solid var(--glass-white-10)" }}
            >
              {/* About the Role */}
              <div>
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--white)" }}
                >
                  About the Role
                </h4>
                <p
                  style={{ color: "var(--text-lavender-1)", lineHeight: "1.7" }}
                >
                  {job.about}
                </p>
              </div>

              {/* What You'll Do */}
              <div>
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--white)" }}
                >
                  What You'll Do
                </h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start"
                      style={{ color: "var(--text-lavender-1)" }}
                    >
                      <span
                        className="mr-2 mt-1"
                        style={{ color: "var(--cta-pink)" }}
                      >
                        ▸
                      </span>
                      <span>{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Who You Are */}
              <div>
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--white)" }}
                >
                  Who You Are
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start"
                      style={{ color: "var(--text-lavender-1)" }}
                    >
                      <span
                        className="mr-2 mt-1"
                        style={{ color: "var(--cta-purple)" }}
                      >
                        ✦
                      </span>
                      <span>{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bonus Points */}
              {job.bonusPoints && (
                <div>
                  <h4
                    className="text-lg font-semibold mb-3"
                    style={{ color: "var(--white)" }}
                  >
                    Bonus Points
                  </h4>
                  <ul className="space-y-2">
                    {job.bonusPoints.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start"
                        style={{ color: "var(--text-lavender-1)" }}
                      >
                        <span
                          className="mr-2 mt-1"
                          style={{ color: "var(--cta2-light-green)" }}
                        >
                          ★
                        </span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We Offer */}
              <div>
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--white)" }}
                >
                  What We Offer
                </h4>
                <ul className="space-y-2">
                  {job.offers.map((offer, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start"
                      style={{ color: "var(--text-lavender-1)" }}
                    >
                      <span
                        className="mr-2 mt-1"
                        style={{ color: "var(--cta-pink)" }}
                      >
                        ◆
                      </span>
                      <span>{offer}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div
                className="pt-4"
                style={{ borderTop: "1px solid var(--glass-white-10)" }}
              >
                <h4
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--white)" }}
                >
                  How to Apply
                </h4>
                <div className="space-y-3">
                  <p style={{ color: "var(--text-lavender-1)" }}>
                    Send the following to career@moonbet.games:
                  </p>
                  <ul className="space-y-2">
                    {job.applicationSteps.map((step, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start"
                        style={{ color: "var(--text-lavender-1)" }}
                      >
                        <span
                          className="mr-2 mt-1"
                          style={{ color: "var(--cta2-light-green)" }}
                        >
                          →
                        </span>
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <NeonButton
                    onClick={() =>
                      (window.location.href = "mailto:career@moonbet.games")
                    }
                    variant="secondary"
                    className="mt-4 w-full"
                  >
                    Apply Now
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </GlassCard>
  );
};

// Main Careers Page Component
const CareersPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // Job positions data
  const jobPositions = [
    {
      id: 1,
      title: "Streamers/UGC Creators",
      location: "Remote (Global)",
      type: "Contract/Full-Time",
      compensation: "$100k-$500k+/year",
      about:
        "Moonbet is looking for authentic crypto gambling streamers and content creators who can educate audiences on why transparency matters in online casinos. You'll create entertaining content that showcases our 99.7%+ RTP games, on-chain verification, and provably fair mechanics while building an engaged community around honest gambling.\n\nThis role isn't about promoting generic casino content. It's about demonstrating why Moonbet's blockchain-first approach gives players better odds and real transparency compared to traditional crypto casinos.",
      responsibilities: [
        "Live stream Moonbet gameplay on Twitch, YouTube, Kick, or other platforms 3-5+ times per week",
        "Create short-form content (TikTok, Instagram Reels, YouTube Shorts) explaining concepts like RTP differences, blockchain verification, and crypto casino mechanics",
        "Produce educational tutorials showing how to connect wallets, verify on-chain results, and understand provably fair gaming",
        "Create and engage with communities on Twitter, Discord, and Reddit to answer questions and build authentic relationships",
        "Collaborate with brand team on campaign messaging, product launches, and transparency initiatives",
        "Test new games pre-launch and provide feedback on user experience and messaging",
        "Promote responsible gambling practices and demonstrate healthy bankroll management",
      ],
      requirements: [
        "Active gambling streamer or crypto content creator with 10,000+ engaged followers on at least one platform (Twitch, YouTube, Kick, Instagram, TikTok)",
        "Deep understanding of crypto casino mechanics, RTP, house edge, and blockchain technology",
        "Authentic passion for transparency in gambling and ability to explain technical concepts in accessible ways",
        "Comfortable discussing responsible gambling practices and demonstrating safe play habits",
        "Strong on-camera presence with ability to entertain while educating",
        "Proven track record of consistent content creation (minimum 3+ posts/streams per week)",
        "Existing audience interested in crypto, gambling, or both",
      ],
      bonusPoints: [
        "Experience with other crypto casinos (Stake, Rainbet, etc.) to provide credible comparisons",
        "Technical knowledge of blockchain explorers and smart contract verification",
        "Established relationships with crypto gambling communities",
        "Video editing skills for polished short-form content",
        "Multi-platform presence (streaming + social media)",
      ],
      offers: [
        "Performance-based compensation with unlimited earning potential ($100k-$500k+/year for top performers)",
        "Direct collaboration with product and marketing teams",
        "Creative freedom to produce content your way",
        "Remote flexibility - stream and create from anywhere",
      ],
      applicationSteps: [
        "Links to your social profiles (Twitch, YouTube, TikTok, Twitter, etc.)",
        "Recent content examples showcasing your style",
        "Brief explanation (300 words max) of why Moonbet's transparency approach matters to you",
        "Current audience metrics (followers, avg views, engagement rates)",
      ],
    },
    {
      id: 2,
      title: "Affiliate Partnerships Lead",
      location: "Remote (Global)",
      type: "Full-Time",
      compensation: "$80,000-$120,000 + performance bonuses",
      about:
        "You'll launch and grow Moonbet's affiliate program by connecting with partners who genuinely care about transparent gambling. This means finding streamers, content creators, and crypto communities who align with our values, building commission plans that prioritize partner quality over just driving traffic, and making sure every collaboration reflects our commitment to responsible gambling practices.\n\nThis position directly impacts Moonbet's trajectory. Working alongside our founding team, you'll create an affiliate ecosystem that proves performance marketing doesn't have to compromise on ethics or honesty.",
      responsibilities: [
        "Build and manage Moonbet's affiliate program from scratch, including platform selection, tracking setup, and payout automation",
        "Recruit high-value affiliates including crypto gambling streamers, review sites, YouTube creators, and community leaders",
        "Design transparent commission structures with instant crypto payouts and clear performance metrics",
        "Negotiate partnerships with established gambling affiliates and crypto influencers",
        "Monitor affiliate performance using data analytics to optimize ROI and identify top performers",
        "Ensure compliance with responsible gambling messaging and regional regulations",
        "Create affiliate resources including promotional materials, conversion guides, and transparency talking points",
      ],
      requirements: [
        "3+ years experience in affiliate marketing within crypto, iGaming, or online gambling sectors",
        "Existing relationships with crypto gambling affiliates, streamers, or review sites",
        "Strong negotiation skills and ability to close high-value partnership deals",
        "Data-driven approach to ROI optimization and performance tracking",
        "Understanding of crypto-native culture and how to communicate blockchain benefits",
        "Experience with affiliate tracking platforms (Post Affiliate Pro, Scaleo, Impact, etc.)",
        "Knowledge of gambling regulations and responsible gambling standards",
        "Excellent communicator who can explain technical concepts to non-technical partners",
      ],
      bonusPoints: [
        "Experience launching affiliate programs from zero to scale",
        "Network in crypto gambling Twitter/Discord communities",
        "Background in performance marketing or growth roles",
        "Experience with Solana ecosystem projects",
      ],
      offers: [
        "Competitive salary ($80k-$120k) based on experience",
        "Performance bonuses tied to affiliate network growth and ROI",
        "Remote-first culture with team across North America, Europe, and Asia",
        "Direct impact on company growth and brand positioning",
        "Collaborative environment with access to founders and product team",
        "Professional development budget for conferences and training",
      ],
      applicationSteps: [
        "Resume highlighting relevant affiliate marketing experience",
        "Case study or portfolio showing successful affiliate programs you've built or managed",
        "Brief explanation (300 words max) of how you'd approach building Moonbet's affiliate network",
        "Any existing relationships with crypto gambling affiliates (optional)",
      ],
    },
    {
      id: 3,
      title: "Brand Strategist (Positioning & Messaging)",
      location: "Remote (Global)",
      type: "Full-Time",
      compensation: "$90,000-$140,000",
      about:
        "Moonbet's Brand Strategist will define and execute our positioning as the transparent alternative to legacy crypto casinos. You'll develop messaging architecture that communicates our 99.7% RTP and on-chain fairness to crypto-native audiences, lead PR initiatives that establish thought leadership, and design responsible gambling messaging that balances growth with player protection.\n\nThis role shapes how the world sees Moonbet. You'll work across marketing, product, and community teams to ensure every touchpoint reinforces our commitment to transparency and fairness.",
      responsibilities: [
        "Develop brand messaging architecture that differentiates Moonbet from competitors like Stake, Rollbit, and traditional online casinos",
        "Craft differentiation campaigns highlighting 99.7% RTP, on-chain verification, and community house pools",
        "Lead PR initiatives including research studies, industry reports, and founder thought leadership",
        "Design responsible gambling messaging that demonstrates player protection without corporate lip service",
        "Create content strategies for website, social media, blog, and community channels",
        "Translate technical concepts (blockchain verification, RNG proofs, smart contracts) into compelling narratives",
        "Partner with product team to develop go-to-market messaging for new games and features",
        "Monitor brand perception across social media, forums, and review sites",
        "Build brand guidelines covering voice, tone, visual identity, and messaging frameworks",
      ],
      requirements: [
        "4+ years experience in brand strategy, marketing, or communications with proven portfolio showing successful brand differentiation",
        "Strong writer who can create compelling narratives from technical blockchain concepts",
        "Understanding of crypto-native culture and how to communicate authentically to Web3 audiences",
        "Experience in iGaming, crypto, or fintech industries preferred",
        "Ability to balance growth marketing with ethical messaging around gambling",
        "Data-informed approach to brand positioning and messaging effectiveness",
        "Excellent cross-functional collaboration skills",
        "Experience with PR and media relations including pitching, press releases, and journalist relationships",
      ],
      bonusPoints: [
        "Portfolio includes blockchain or crypto projects",
        "Experience with responsible gambling initiatives",
        "Background in journalism or content marketing",
        "Understanding of Solana ecosystem and DeFi protocols",
        "Established relationships with crypto media outlets",
      ],
      offers: [
        "Competitive salary ($90k-$140k) based on experience",
        "Remote-first culture with flexible working hours",
        "Creative autonomy to shape brand voice and strategy",
        "Direct collaboration with founders and executive team",
        "Professional development budget for courses, conferences, and tools",
        "Impact - your work directly influences how thousands of players perceive fair gambling",
      ],
      applicationSteps: [
        "Resume highlighting brand strategy and communications experience",
        "Portfolio with 2-3 case studies showing brand differentiation work you've led",
        "Writing sample explaining why Moonbet's transparency approach matters (500 words max)",
        "Brief strategy outline (bullet points fine) for how you'd position Moonbet against competitors",
      ],
    },
  ];

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: "var(--bg-dark-purple-1)" }}
    >
      {/* 3D Background */}
      <Background3D />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-5">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(90, 55, 153, 0.2), var(--bg-dark-purple-1), rgba(220, 31, 255, 0.1))",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(225deg, rgba(220, 31, 255, 0.1), transparent, rgba(90, 55, 153, 0.1))",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Title with Gradient */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              style={{ y: y1 }}
            >
              <span
                style={{
                  background: "var(--cta-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Careers
              </span>
              <span style={{ color: "var(--white)" }}> - Moonbet</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: "var(--text-lavender-1)", y: y2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Let's Build the Fairest Casino on Earth Together
            </motion.p>

            {/* Open Positions Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "rgba(40, 194, 3, 0.2)",
                border: "1px solid rgba(40, 194, 3, 0.3)",
              }}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "var(--cta2-light-green)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-3 w-3"
                  style={{ background: "var(--cta2-green)" }}
                />
              </span>
              <span
                className="text-lg font-semibold"
                style={{ color: "var(--cta2-light-green)" }}
              >
                3 Open Positions
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="relative px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span
                style={{
                  background: "var(--cta-pink-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Open Positions
              </span>
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ color: "var(--text-lavender-1)" }}
            >
              Join our mission to revolutionize online gambling with
              transparency, fairness, and blockchain technology.
            </p>
          </motion.div>

          {/* Job Cards */}
          <div className="space-y-8">
            {jobPositions.map((job, index) => (
              <JobCard key={job.id} job={job} delay={0.8 + index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-6"
            >
              <span
                style={{
                  background: "var(--cta-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ready to Join Moonbet?
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--text-lavender-1)" }}
            >
              Be part of the revolution. Help us build the fairest, most
              transparent casino in the world.
            </motion.p>

            <NeonButton
              onClick={() =>
                (window.location.href = "mailto:career@moonbet.games")
              }
              variant="primary"
              className="text-lg px-12"
            >
              Contact Us
            </NeonButton>
          </GlassCard>
        </div>
      </section>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0
                  ? "rgba(220, 31, 255, 0.1)"
                  : "rgba(90, 55, 153, 0.1)"
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CareersPage;
