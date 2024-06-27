"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema } from "@/schemas/signInSchema";
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session } = useSession();

  const {toast} = useToast()

  const router = useRouter()

  const [signingIn, setIsSigningIn] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsSigningIn(true)
    const response = await signIn("credentials",{
      redirect: false,
      identifier: values.email,
      password: values.password
    })
    if(response?.error){
      toast({
        variant: "destructive",
        title: "login Failed",
        description: "Incorrect email or password"
      })
    }
    if(response?.url){
      router.replace('/dashboard')
    }
    setIsSigningIn(false)
  }
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-authBg1 bg-center">
        <div className="w-96 card bg-authBg bg-cover bg-center m-5">
      <div className="card glass md:w-96">
        <div className="card-body">
        <h1 className="text-3xl font-bold text-center  text-blue-600">Interview.AI</h1>
        <h2 className="card-title text-center align-middle justify-center text-lg">Fill details to signIn</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="abc@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-[100%]" type="submit">
              {signingIn ? (
                  <>
                    <span className="loading loading-dots loading-md"></span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-2">
            <span className="text-gray-600">Donot have an account? </span>
            <a href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
