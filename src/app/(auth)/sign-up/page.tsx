"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function page() {
  const [username, setUsername] = useState("");
  const [verifyingUserName, setverifyingUserName] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 900);
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  //check username
  async function checkUserUnique() {
    if (username) {
      setverifyingUserName(true);
      setUserNameMessage("");
      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${username}`
        );
        console.log(response);
        setUserNameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUserNameMessage(
          axiosError.response?.data.message ?? "Error checking user name"
        );
      } finally {
        setverifyingUserName(false);
      }
    }
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", values);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorDescription =
        axiosError.response?.data.message ?? "Error creating account";
      toast({
        variant: "destructive",
        title: "error",
        description: errorDescription,
      });
    } finally {
      setSubmitting(false);
    }
  }
  useEffect(() => {
    console.log(username);
    checkUserUnique();
  }, [username]);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="p-5 w-2/6">
        <p className=" flex align-middle justify-center m-5 font-semibold text-3xl">
          AnonyPoll
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="daku"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e), debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    <>
                      {verifyingUserName ? (
                        <>
                          <span className="loading loading-dots loading-xs"></span>
                        </>
                      ) : (
                        <span className={`${userNameMessage=="Username is unique" ? 'text-green-500':'text-red-500'}`}>{userNameMessage }</span>
                      )}
                    </>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="anony@email.com" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {submitting ? (
                <>
                  <span className="loading loading-dots loading-md"></span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default page;
