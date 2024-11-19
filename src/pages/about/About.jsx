import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const teamMembers = [
  {
    name: "Davida Prempeh",
    role: "Backend Developer",
    image: "/abt2.jpg",
    bio: "Specialized in building robust APIs and database architecture",
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  },
  {
    name: "Fredrick Kumah",
    role: "Backend Developer",
    image: "/abt1.jpg",
    bio: "Expert in system optimization and cloud infrastructure",
    social: {
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      twitter: "https://twitter.com/janesmith",
    },
  },
  {
    name: "Abigail Debrah",
    role: "Frontend Developer",
    image: "/abt3.jpg",
    bio: "Passionate about creating beautiful and intuitive user interfaces",
    social: {
      github: "https://github.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      twitter: "https://twitter.com/mikejohnson",
    },
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white-80 to-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-[#0F8174] bg-clip-text">
            Meet Our Team
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            We're a passionate team of developers dedicated to creating amazing
            experiences through code.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#0F8174] backdrop-blur-sm p-6 hover:shadow-2xl hover:shadow-[#0F8174] transition-all duration-300">
                {/* Purple gradient overlay */}
                <div className="absolute inset-0 bg-[#0F8174] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="h-48 w-48 mx-auto mb-4 overflow-hidden rounded-full border-4 border-purple-500/30">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 text-center font-bold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-900/100 text-center mb-6">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FaTwitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
