import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import StarField from "@/components/StarField" // Import StarField

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white p-4 overflow-hidden">
      <StarField /> {/* Added StarField */}
      <Card className="relative z-10 w-full max-w-md bg-dark-800/50 backdrop-blur-sm border border-primary-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Forgot Password?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-300 text-center">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
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
          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25">
            Send Reset Link
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <Link href="/login" className="text-sm text-primary-400 hover:underline">
            Back to Log In
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:underline">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
