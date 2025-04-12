
import React from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background/80 backdrop-blur-sm border-t py-8 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm text-gray-600">Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span className="text-sm text-gray-600">by ResumeAI Team</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
