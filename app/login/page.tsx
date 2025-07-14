import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import StarField from "@/components/StarField" // Import StarField

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white p-4 overflow-hidden">
      <StarField /> {/* Added StarField */}
      <Card className="relative z-10 w-full max-w-md bg-dark-800/50 backdrop-blur-sm border border-primary-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Log In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="bg-dark-900 border-primary-500/30 text-white placeholder-gray-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <Input
              id="password"
              type="password"
              className="bg-dark-900 border-primary-500/30 text-white placeholder-gray-500"
            />
          </div>
          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25">
            Log In
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <Link href="/signup" className="text-sm text-primary-400 hover:underline">
            Don't have an account? Sign Up
          </Link>
          <Link href="/forgot-password" className="text-sm text-gray-400 hover:underline">
            Forgot password?
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:underline">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
