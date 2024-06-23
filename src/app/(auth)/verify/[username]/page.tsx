"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast, useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { Axios, AxiosError } from "axios";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";


export default function page() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const enteredUser = params.username;
  const [verifyingOtp, setIsVerifyingOtp] = useState(false)

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      identifier: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(data: z.infer<typeof verifySchema>) {
    
    setIsVerifyingOtp(true)
    try {
        const response = await axios.post('/api/verify-code',{
            username: enteredUser,
            code: data.identifier
        })
        toast({
            title: "OTP verified",
            description: (
                response.data.message
            ),
        });
        router.replace('/sign-in')
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
            variant: "destructive",
            title: "OTP verification failed",
            description: (
                axiosError.response?.data.message ?? "Error in verifying code"
            ),
          });
    } finally {
        setIsVerifyingOtp(false)
    }
  }
  return (
    <div className="flex justify-center items-center h-[100vh]">
        <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    value={enteredUser}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit"> {verifyingOtp ? (
                <>
                  <span className="loading loading-dots loading-md"></span>
                </>
              ) : (
                "Submit"
              )}</Button>
        </form>
      </Form>
      </div>
    </div>
  );
}
