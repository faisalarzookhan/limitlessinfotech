"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  TrendingUp,
  Eye,
  Target,
  BarChart3,
  Globe,
  Link,
  FileText,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCwIcon as Refresh,
  Download,
  Upload,
} from "lucide-react"

interface SEOAnalysis {
  url: string
  score: number
  issues: SEOIssue[]
  keywords: string[]
  lastAnalyzed: string
}

interface SEOIssue {
  type: "error" | "warning" | "info"
  category: string
  message: string
  impact: "high" | "medium" | "low"
}

interface Keyword {
  keyword: string
  position: number
  volume: number
  difficulty: number
  trend: "up" | "down" | "stable"
}

const mockSEOAnalysis: SEOAnalysis[] = [
  {
    url: "https://limitless.com",
    score: 85,
    issues: [
      {
        type: "warning",
        category: "Performance",
        message: "Page load time could be improved",
        impact: "medium",
      },
      {
        type: "error",
        category: "Meta Tags",
        message: "Missing meta description on 3 pages",
        impact: "high",
      },
      {
        type: "info",
        category: "Content",
        message: "Consider adding more internal links",
        impact: "low",
      },
    ],
    keywords: ["web development", "mobile apps", "custom software"],
    lastAnalyzed: "2024-01-15",
  },
]

const mockKeywords: Keyword[] = [
  {
    keyword: "web development services",
    position: 3,
    volume: 12000,
    difficulty: 65,
    trend: "up",
  },
  {
    keyword: "mobile app development",
    position: 7,
    volume: 8500,
    difficulty: 72,
    trend: "stable",
  },
  {
    keyword: "custom software solutions",
    position: 12,
    volume: 3200,
    difficulty: 58,
    trend: "down",
  },
  {
    keyword: "react development",
    position: 15,
    volume: 5400,
    difficulty: 68,
    trend: "up",
  },
]

export default function SEOTools() {
  const [analyses, setAnalyses] = useState<SEOAnalysis[]>(mockSEOAnalysis)
  const [keywords, setKeywords] = useState<Keyword[]>(mockKeywords)
  const [newAnalysisUrl, setNewAnalysisUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const runSEOAnalysis = async () => {
    if (!newAnalysisUrl.trim()) return

    setIsAnalyzing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newAnalysis: SEOAnalysis = {
      url: newAnalysisUrl,
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      issues: [
        {
          type: "warning",
          category: "Performance",
          message: "Optimize images for better loading speed",
          impact: "medium",
        },
        {
          type: "info",
          category: "SEO",
          message: "Add structured data markup",
          impact: "low",
        },
      ],
      keywords: ["new keyword", "analysis keyword"],
      lastAnalyzed: new Date().toISOString().split("T")[0],
    }

    setAnalyses([newAnalysis, ...analyses])
    setNewAnalysisUrl("")
    setIsAnalyzing(false)
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "info":
        return <CheckCircle className="w-4 h-4 text-blue-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>SEO Tools & Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analysis">SEO Analysis</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
              <TabsTrigger value="robots">Robots.txt</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-6">
              {/* Run New Analysis */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Run SEO Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter URL to analyze (e.g., https://limitless.com)"
                      value={newAnalysisUrl}
                      onChange={(e) => setNewAnalysisUrl(e.target.value)}
                      className="bg-white/5 border-white/10"
                    />
                    <Button
                      onClick={runSEOAnalysis}
                      disabled={!newAnalysisUrl.trim() || isAnalyzing}
                      className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30"
                    >
                      {isAnalyzing ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing SEO factors...</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <div className="space-y-4">
                {analyses.map((analysis, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{analysis.url}</CardTitle>
                            <p className="text-sm text-gray-400">Last analyzed: {analysis.lastAnalyzed}</p>
                          </div>
                          <div className="text-center">
                            <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                              {analysis.score}
                            </div>
                            <div className="text-sm text-gray-400">SEO Score</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">ISSUES FOUND</h4>
                            <div className="space-y-2">
                              {analysis.issues.map((issue, issueIndex) => (
                                <div key={issueIndex} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                                  {getIssueIcon(issue.type)}
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">{issue.category}</span>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                          issue.impact === "high"
                                            ? "border-red-500/50 text-red-300"
                                            : issue.impact === "medium"
                                              ? "border-yellow-500/50 text-yellow-300"
                                              : "border-blue-500/50 text-blue-300"
                                        }`}
                                      >
                                        {issue.impact} impact
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-400">{issue.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">TARGET KEYWORDS</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysis.keywords.map((keyword, keywordIndex) => (
                                <Badge key={keywordIndex} variant="outline" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>

                            <div className="mt-6">
                              <h4 className="font-semibold mb-3 text-sm text-muted-foreground">QUICK ACTIONS</h4>
                              <div className="space-y-2">
                                <Button size="sm" variant="outline" className="w-full justify-start">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Report
                                </Button>
                                <Button size="sm" variant="outline" className="w-full justify-start">
                                  <Refresh className="w-4 h-4 mr-2" />
                                  Re-analyze
                                </Button>
                                <Button size="sm" variant="outline" className="w-full justify-start">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Keyword Rankings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr className="text-left">
                          <th className="p-4 font-medium">Keyword</th>
                          <th className="p-4 font-medium">Position</th>
                          <th className="p-4 font-medium">Search Volume</th>
                          <th className="p-4 font-medium">Difficulty</th>
                          <th className="p-4 font-medium">Trend</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywords.map((keyword, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="p-4 font-medium">{keyword.keyword}</td>
                            <td className="p-4">
                              <Badge
                                className={`${
                                  keyword.position <= 3
                                    ? "bg-green-500/20 text-green-300"
                                    : keyword.position <= 10
                                      ? "bg-yellow-500/20 text-yellow-300"
                                      : "bg-red-500/20 text-red-300"
                                }`}
                              >
                                #{keyword.position}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-400">{keyword.volume.toLocaleString()}/mo</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      keyword.difficulty >= 70
                                        ? "bg-red-500"
                                        : keyword.difficulty >= 50
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                    }`}
                                    style={{ width: `${keyword.difficulty}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-400">{keyword.difficulty}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                {getTrendIcon(keyword.trend)}
                                <span className="text-sm capitalize">{keyword.trend}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <Target className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-white/10">
                                  <BarChart3 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Add New Keywords</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter keywords to track (comma separated)"
                      className="bg-white/5 border-white/10"
                    />
                    <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">
                      <Target className="w-4 h-4 mr-2" />
                      Track Keywords
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sitemap" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>XML Sitemap Generator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Website URL</label>
                      <Input placeholder="https://limitless.com" className="bg-white/5 border-white/10" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Update Frequency</label>
                      <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-blue-500/50 focus:outline-none text-white">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30">
                      <Globe className="w-4 h-4 mr-2" />
                      Generate Sitemap
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit to Search Engines
                    </Button>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Sitemap Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Last Generated:</span>
                        <span className="text-gray-400">2024-01-15 10:30 AM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Total URLs:</span>
                        <span className="text-gray-400">247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Google Status:</span>
                        <Badge className="bg-green-500/20 text-green-300">Submitted</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Bing Status:</span>
                        <Badge className="bg-green-500/20 text-green-300">Submitted</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="robots" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Robots.txt Editor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="User-agent: *&#10;Disallow: /admin/&#10;Disallow: /private/&#10;&#10;Sitemap: https://limitless.com/sitemap.xml"
                    className="bg-white/5 border-white/10 min-h-[200px] font-mono text-sm"
                    defaultValue={`User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /cpanel/

Allow: /

Sitemap: https://limitless.com/sitemap.xml`}
                  />

                  <div className="flex gap-4">
                    <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Save Robots.txt
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Test Robots.txt
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold mb-2">Robots.txt Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>File Exists:</span>
                        <Badge className="bg-green-500/20 text-green-300">Yes</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Modified:</span>
                        <span className="text-gray-400">2024-01-10 14:22 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>File Size:</span>
                        <span className="text-gray-400">156 bytes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Syntax Valid:</span>
                        <Badge className="bg-green-500/20 text-green-300">Valid</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle>SEO Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Link className="w-4 h-4 mr-2" />
                      Broken Link Checker
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Meta Tag Generator
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Schema Markup Generator
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Page Speed Test
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle>Search Console Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Connect Google Search Console
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Connect Bing Webmaster Tools
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Performance Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Reports
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
