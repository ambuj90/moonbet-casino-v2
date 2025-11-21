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

// 3D Rotating Coin Component
const FloatingCoin = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
          emissive="#FFA500"
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight position={[...position]} intensity={0.5} color="#FFD700" />
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
          color="#4A90E2"
          metalness={0.8}
          roughness={0.2}
          emissive="#00D9FF"
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
          color="#FF3366"
          metalness={0.7}
          roughness={0.3}
          emissive="#FF0066"
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
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10 rounded-2xl
        shadow-2xl shadow-purple-500/10
        ${className}
      `}
      onClick={onClick}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
        style={{ filter: "blur(20px)" }}
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
    primary: "from-purple-500 via-blue-500 to-cyan-500",
    secondary: "from-pink-500 via-red-500 to-orange-500",
    success: "from-green-500 via-emerald-500 to-teal-500",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-8 py-4 rounded-xl font-bold text-white
        bg-gradient-to-r ${variants[variant]}
        shadow-lg transition-all duration-300
        hover:shadow-2xl hover:shadow-purple-500/25
        ${className}
      `}
    >
      {/* Neon Glow */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${variants[variant]} rounded-xl opacity-75 blur-xl`}
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
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
            >
              {job.title}
            </motion.h3>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                {job.location}
              </span>
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 text-sm">
                {job.type}
              </span>
              {job.compensation && (
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
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
              className="space-y-6 border-t border-white/10 pt-6"
            >
              {/* About the Role */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  About the Role
                </h4>
                <p className="text-gray-300 leading-relaxed">{job.about}</p>
              </div>

              {/* What You'll Do */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  What You'll Do
                </h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start text-gray-300"
                    >
                      <span className="text-purple-400 mr-2 mt-1">▸</span>
                      <span>{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Who You Are */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Who You Are
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start text-gray-300"
                    >
                      <span className="text-blue-400 mr-2 mt-1">✦</span>
                      <span>{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bonus Points */}
              {job.bonusPoints && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Bonus Points
                  </h4>
                  <ul className="space-y-2">
                    {job.bonusPoints.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start text-gray-300"
                      >
                        <span className="text-green-400 mr-2 mt-1">★</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We Offer */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  What We Offer
                </h4>
                <ul className="space-y-2">
                  {job.offers.map((offer, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start text-gray-300"
                    >
                      <span className="text-pink-400 mr-2 mt-1">◆</span>
                      <span>{offer}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-lg font-semibold text-white mb-3">
                  How to Apply
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    Send the following to career@moonbet.games:
                  </p>
                  <ul className="space-y-2">
                    {job.applicationSteps.map((step, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start text-gray-300"
                      >
                        <span className="text-cyan-400 mr-2 mt-1">→</span>
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
    <div className="min-h-screen bg-[#080808] text-white relative overflow-hidden">
      {/* 3D Background */}
      <Background3D />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-cyan-500/10"
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
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Careers
              </span>
              <span className="text-white"> - Moonbet</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl md:text-3xl text-gray-300 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ y: y2 }}
            >
              Let's Build the Fairest Casino on Earth Together
            </motion.p>

            {/* Open Positions Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-lg font-semibold text-green-300">
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Open Positions
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Ready to Join Moonbet?
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
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
                  ? "rgba(147, 51, 234, 0.1)"
                  : "rgba(59, 130, 246, 0.1)"
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
