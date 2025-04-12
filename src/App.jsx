
import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, CheckCircle, AlertCircle, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import JobDescriptionInput from "@/components/JobDescriptionInput"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function App() {
  const [file, setFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [jobAnalyzing, setJobAnalyzing] = useState(false)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file?.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      })
      return
    }
    setFile(file)
    analyzeResume(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const analyzeResume = async (file) => {
    setAnalyzing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    setTimeout(() => {
      setResults({
        matchScore: 85,
        atsScore: 92,
        suggestedSkills: [
          "React Native",
          "TypeScript",
          "GraphQL",
          "Docker",
          "AWS",
        ],
        strongPoints: [
          "Strong frontend development experience",
          "Excellent problem-solving abilities",
          "Effective team collaboration",
        ],
        jobMatch: null
      })
      setAnalyzing(false)
      clearInterval(interval)
      toast({
        title: "Analysis Complete",
        description: "Your resume has been successfully analyzed!",
      })
    }, 5000)
  }

  const analyzeJobMatch = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      })
      return
    }

    setJobAnalyzing(true)
    
    // Simulated job description analysis
    setTimeout(() => {
      setResults(prev => ({
        ...prev,
        jobMatch: {
          overallMatch: 78,
          matchedSkills: ["React", "JavaScript", "Frontend Development"],
          missingSkills: ["AWS Lambda", "Node.js", "MongoDB"],
          keywordMatch: 85,
        }
      }))
      setJobAnalyzing(false)
      toast({
        title: "Job Match Analysis Complete",
        description: "Your resume has been compared with the job description!",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
               Resume Analyzer
            </h1>

            <Card className="mb-8 bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Upload Your Resume</CardTitle>
                <CardDescription className="text-gray-400">
                  Drop your PDF resume here for AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-blue-500"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">
                    {isDragActive
                      ? "Drop your resume here"
                      : "Drag & drop your resume, or click to select"}
                  </p>
                </div>

                {analyzing && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-400 mb-2">Analyzing resume...</p>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {file && (
              <JobDescriptionInput
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                onAnalyze={analyzeJobMatch}
                isAnalyzing={jobAnalyzing}
              />
            )}

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">ATS Score</h3>
                        <div className="flex items-center">
                          <Progress value={results.atsScore} className="flex-1" />
                          <span className="ml-4 font-semibold text-white">
                            {results.atsScore}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">Match Score</h3>
                        <div className="flex items-center">
                          <Progress value={results.matchScore} className="flex-1" />
                          <span className="ml-4 font-semibold text-white">
                            {results.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {results.jobMatch && (
                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                          <Briefcase className="w-5 h-5" />
                          Job Description Match
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-400">Overall Match</h4>
                            <div className="flex items-center">
                              <Progress value={results.jobMatch.overallMatch} className="flex-1" />
                              <span className="ml-4 font-semibold text-white">
                                {results.jobMatch.overallMatch}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-400">Keyword Match</h4>
                            <div className="flex items-center">
                              <Progress value={results.jobMatch.keywordMatch} className="flex-1" />
                              <span className="ml-4 font-semibold text-white">
                                {results.jobMatch.keywordMatch}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-400">Matched Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {results.jobMatch.matchedSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-400">Missing Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {results.jobMatch.missingSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        Recommended Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.suggestedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Key Strengths</h3>
                      <ul className="space-y-2">
                        {results.strongPoints.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <Award className="w-5 h-5 text-blue-400 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        setFile(null)
                        setResults(null)
                        setJobDescription("")
                      }}
                      variant="outline"
                      className="ml-auto border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Analyze Another Resume
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
