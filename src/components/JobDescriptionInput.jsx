
import React from "react"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const JobDescriptionInput = ({ jobDescription, setJobDescription, onAnalyze, isAnalyzing }) => {
  return (
    <Card className="mb-8 bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Job Description Analysis
        </CardTitle>
        <CardDescription className="text-gray-400">
          Paste the job description to analyze skill match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-40 p-4 rounded-lg bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAnalyze}
          disabled={!jobDescription.trim() || isAnalyzing}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors
            ${jobDescription.trim() && !isAnalyzing
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Job Match"}
        </motion.button>
      </CardContent>
    </Card>
  )
}

export default JobDescriptionInput
