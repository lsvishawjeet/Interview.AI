"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { timeStamp } from "console";
import { Textarea } from "@/components/ui/textarea";
import markdownit from "markdown-it";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import History from "./History";

const formSchema = z.object({
  education: z.string().min(2, {
    message: "Cant be empty",
  }),
  experience: z.string(),
  company: z.string().min(2, { message: "This cant be empty" }),
  role: z.string().min(2, { message: "This is required field" }),
  salary: z.string().min(2, { message: "This cant be empty" }),
});

type Message = {
  text: string;
  role: "user" | "bot";
  timeStamp: Date;
};

function Gemini() {
  const [message, setMessage] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarted, setIsStart] = useState(false);
  const [gettingResponse, setGettingResponse] = useState(false);
  const md = markdownit();
  const takeMeDownRef = useRef<HTMLDivElement>(null);

  const apiKey = "AIzaSyDuHnfldeQNzC-IgXoQTJK27bLw-_xvFQw";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "This model is for website that helps users to prepare for their interviews. FIrst ask user about their qualifiaction, company, role he is preparing for and package he is expecting. Take proper interview of user as taken in companies. For instance, for software development role, there are different rounds of interview, aptitude, DSA, etc. So, take interview accordingly. Talk in professional way and expect only the professional output. First describe the user about the steps, and then start taking interview question by question. When user answered it then tell user how he could better handle it. For coding rounds, always ask user prefered programming language, expect code from user and then after getting code from user, you can ask for more optimal solutions and can also suggest users how to solve it with better approach. Also explain user how he can better handle that question. Ask question according to the package he is expecting, and what trend is going in industry. Avoid talking on personal issues of user if it is not relevent to job and role he selected. If user asks out of context queation, give him warning. At end of interview, evalute user and tell him weather he is ready to crack the interview of that company, if not then provide where he need to focus. If you feel, the response is generated using AI, then immidiatly warn candidate without asking next question ",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = model.startChat({
          generationConfig,
          history: message.map((msg) => ({
            parts: [{ text: msg.text }],
            role: msg.role,
          })),
        });
        setChat(newChat);
      } catch (err) {
        setError("Failed to initialize chat. Please try again later");
      }
    };
    initChat();
  }, []);

  //scroll to down
  useEffect(() => {
    if (takeMeDownRef.current) {
      takeMeDownRef.current.scrollIntoView();
    }
  }, [message]);

  const handleSendButton = async () => {
    setGettingResponse(true);
    try {
      const userMessage: Message = {
        text: userInput,
        role: "user",
        timeStamp: new Date(),
      };

      setMessage((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage: Message = {
          text: result.response.text(),
          role: "bot",
          timeStamp: new Date(),
        };
        setMessage((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. ");
    } finally {
      setGettingResponse(false);
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSendButton();
    }
  };

  const formatMessage = (msg: string) => {
    return md.render(msg);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: "",
      experience: "none",
      company: "",
      role: "",
      salary: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setGettingResponse(true);
    setIsStart(true);
    try {
      if (chat) {
        const result = await chat.sendMessage(
          `Education: ${values.education}, Experience: ${values.experience}, Company: ${values.company}, Role: ${values.role}, Expected Package: ${values.salary} inr`
        );
        const botMessage: Message = {
          text: result.response.text(),
          role: "bot",
          timeStamp: new Date(),
        };
        setMessage((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. ");
    } finally {
      setGettingResponse(false);
    }
    console.log(JSON.stringify(values));
  }
  return (
    <div className="h-100vh ">
      <div className={isStarted ? "hidden" : "h-[90vh] flex"}>
        <div className="w-[100vw] flex justify-center align-middle items-center overflow-scroll scrollbar-none">
          <div className="md:w-[30%] w-[90%] p-5 rounded-xl bg-slate-50">
            <p className="text-center font-semibold text-2xl">
              Start Interview
            </p>
            <p className="text-center text-sm mb-3 mt-2">
              Interview Preparation will start instanty after filling below
              details
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input placeholder="Btech CSE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience (if any)</FormLabel>
                      <FormControl>
                        <Input placeholder="3 years MERN stack" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Google" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Package (in INR)</FormLabel>
                      <FormControl>
                        <Input placeholder="35 lakh INR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-[100%]" type="submit">
                  Start
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div>
        <div className=" h-[100%] w-1/5">
          <History />
        </div>
        <div className={isStarted ? "flex justify-center" : "hidden"}>
          <div className="flex flex-col md:w-[50vw] w-[90vw] absolute bottom-0 md:mb-10 mb-4 overflow-y-scroll max-h-[80vh] scrollbar-none ">
            {message.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "bot"
                    ? "flex justify-start w-[100%] chat chat-start"
                    : "flex justify-end chat chat-end"
                }
              >
                <div className="md:max-w-[80%] max-w-[90%] mb-1 md:mb-5 overflow-wrap p-2 bg-slate-100 rounded-xl text-gray-950">
                  <p
                    className="pb-2"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.text),
                    }}
                  ></p>
                  <p className="text-sm font-light">
                    {msg.role === "bot" ? "Interviewer" : "You"} -{" "}
                    {msg.timeStamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {gettingResponse ? (
              <>
                <div className={"flex justify-start w-[100%] chat chat-start"}>
                  <div className="md:max-w-[80%] max-w-[90%] mb-1 md:mb-5 overflow-wrap p-2 bg-slate-100 rounded-xl text-gray-950">
                    <p className="text-sm font-light">
                      <span className="loading loading-dots loading-md"></span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <div>
              {error && (
                <div className="text-red-500 text-sm mb-3">{error}</div>
              )}
            </div>
            <div className="flex sticky bottom-0 items-center">
              <Textarea
                value={userInput}
                onKeyDown={handleKeyPress}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="mr-2 max-h-56 rounded-lg p-4 active:no-underline"
              />

              <Button onClick={handleSendButton}>Submit</Button>
            </div>
            <div ref={takeMeDownRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gemini;
