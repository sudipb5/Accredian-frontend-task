
import { motion } from "framer-motion";
import { ReferralModal } from "@/components/ReferralModal";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50">
      <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Refer & Earn Program
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Share Knowledge,
            <br />
            <span className="text-primary">Earn Rewards</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Refer your friends to our courses and earn exclusive rewards. The more
            friends you refer, the more rewards you unlock.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-primary rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-lg active:scale-100"
            >
              <span className="relative flex items-center gap-2">
                Refer Now
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ReferralModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const features = [
  {
    title: "Simple Process",
    description: "Refer your friends in just a few clicks. It's that easy!",
    icon: <motion.div className="text-2xl">1</motion.div>,
  },
  {
    title: "Track Progress",
    description: "Monitor your referrals and rewards in real-time.",
    icon: <motion.div className="text-2xl">2</motion.div>,
  },
  {
    title: "Get Rewarded",
    description: "Earn exciting rewards for successful referrals.",
    icon: <motion.div className="text-2xl">3</motion.div>,
  },
];

export default Index;
