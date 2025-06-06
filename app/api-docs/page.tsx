"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Code, Copy, Play, Book, Key, Globe, Zap } from "lucide-react"

const apiEndpoints = [
  {
    method: "GET",
    path: "/api/cpanel/users",
    description: "Retrieve all users",
    parameters: [
      { name: "page", type: "number", description: "Page number for pagination" },
      { name: "limit", type: "number", description: "Number of items per page" },
      { name: "role", type: "string", description: "Filter by user role" },
    ],
    response: {
      success: true,
      data: [
        {
          id: "1",
          email: "admin@limitless.com",
          name: "Admin User",
          role: "admin",
          created_at: "2024-01-10T00:00:00Z",
        },
      ],
    },
  },
  {
    method: "POST",
    path: "/api/cpanel/domains",
    description: "Create a new domain",
    parameters: [
      { name: "domain", type: "string", description: "Domain name" },
      { name: "type", type: "string", description: "Domain type (primary, addon, subdomain)" },
      { name: "document_root", type: "string", description: "Document root path" },
    ],
    response: {
      success: true,
      data: {
        id: "1",
        domain: "example.com",
        type: "addon",
        status: "pending",
      },
    },
  },
  {
    method: "GET",
    path: "/api/cpanel/analytics",
    description: "Get system analytics",
    parameters: [
      { name: "period", type: "string", description: "Time period (1d, 7d, 30d, 90d)" },
      { name: "metric", type: "string", description: "Specific metric to retrieve" },
    ],
    response: {
      success: true,
      data: {
        system: {
          cpu: { current: 23, average: 18, peak: 45 },
          memory: { current: 67, average: 62, peak: 89 },
        },
      },
    },
  },
]

export default function APIDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0])
  const [apiKey, setApiKey] = useState("")
  const [testResponse, setTestResponse] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const testEndpoint = async () => {
    setTestResponse("Testing endpoint...")

    // Simulate API call
    setTimeout(() => {
      setTestResponse(JSON.stringify(selectedEndpoint.response, null, 2))
    }, 1000)
  }

  const generateCurlCommand = () => {
    const headers = ['-H "Content-Type: application/json"', apiKey ? `-H "Authorization: Bearer ${apiKey}"` : ""]
      .filter(Boolean)
      .join(" ")

    if (selectedEndpoint.method === "GET") {
      return `curl -X GET "https://api.limitless.com${selectedEndpoint.path}" ${headers}`
    } else {
      return `curl -X ${selectedEndpoint.method} "https://api.limitless.com${selectedEndpoint.path}" ${headers} -d '${JSON.stringify({})}'`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Limitless API Documentation</h1>
          <p className="text-xl text-gray-300">Complete API reference for Limitless CPanel and hosting services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="w-5 h-5" />
                  <span>API Endpoints</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {apiEndpoints.map((endpoint, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedEndpoint === endpoint
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge
                        className={`${
                          endpoint.method === "GET"
                            ? "bg-green-500/20 text-green-300"
                            : endpoint.method === "POST"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                    </div>
                    <div className="text-sm font-mono">{endpoint.path}</div>
                    <div className="text-xs text-gray-400 mt-1">{endpoint.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Endpoint Details */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Badge
                    className={`${
                      selectedEndpoint.method === "GET"
                        ? "bg-green-500/20 text-green-300"
                        : selectedEndpoint.method === "POST"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {selectedEndpoint.method}
                  </Badge>
                  <code className="text-lg font-mono">{selectedEndpoint.path}</code>
                </div>
                <p className="text-gray-300">{selectedEndpoint.description}</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="parameters" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="parameters">Parameters</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="test">Test</TabsTrigger>
                  </TabsList>

                  <TabsContent value="parameters" className="space-y-4">
                    <h3 className="text-lg font-semibold">Parameters</h3>
                    {selectedEndpoint.parameters.length > 0 ? (
                      <div className="space-y-3">
                        {selectedEndpoint.parameters.map((param, index) => (
                          <div key={index} className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <code className="font-mono text-sm">{param.name}</code>
                              <Badge variant="outline" className="text-xs">
                                {param.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400">{param.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">No parameters required</p>
                    )}
                  </TabsContent>

                  <TabsContent value="response" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Response Format</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(JSON.stringify(selectedEndpoint.response, null, 2))}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        {JSON.stringify(selectedEndpoint.response, null, 2)}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <h3 className="text-lg font-semibold">Code Examples</h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">cURL</h4>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(generateCurlCommand())}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4">
                          <pre className="text-sm text-gray-300 overflow-x-auto">{generateCurlCommand()}</pre>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">JavaScript</h4>
                          <Button size="sm" variant="outline">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`const response = await fetch('https://api.limitless.com${selectedEndpoint.path}', {
  method: '${selectedEndpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_api_key'
  }
});

const data = await response.json();
console.log(data);`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Python</h4>
                          <Button size="sm" variant="outline">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-black rounded-lg p-4">
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`import requests

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_api_key'
}

response = requests.${selectedEndpoint.method.toLowerCase()}(
    'https://api.limitless.com${selectedEndpoint.path}',
    headers=headers
)

data = response.json()
print(data)`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="test" className="space-y-4">
                    <h3 className="text-lg font-semibold">Test Endpoint</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">API Key</label>
                        <Input
                          placeholder="Enter your API key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                      </div>

                      <Button onClick={testEndpoint} className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Test Endpoint
                      </Button>

                      {testResponse && (
                        <div>
                          <h4 className="font-medium mb-2">Response</h4>
                          <div className="bg-black rounded-lg p-4">
                            <pre className="text-sm text-gray-300 overflow-x-auto">{testResponse}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Start Guide */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Quick Start Guide</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Key className="w-5 h-5 text-blue-400" />
                      <h4 className="font-medium">1. Get API Key</h4>
                    </div>
                    <p className="text-sm text-gray-400">Generate an API key from your CPanel dashboard</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="w-5 h-5 text-green-400" />
                      <h4 className="font-medium">2. Make Request</h4>
                    </div>
                    <p className="text-sm text-gray-400">Include your API key in the Authorization header</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-5 h-5 text-purple-400" />
                      <h4 className="font-medium">3. Handle Response</h4>
                    </div>
                    <p className="text-sm text-gray-400">Process the JSON response in your application</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
