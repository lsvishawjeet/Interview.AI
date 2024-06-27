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

const formSchema = z.object({
  education: z.string().min(2, {
    message: "Cant be empty",
  }),
  experience: z.string(),
  company: z.string().min(2, { message: "This cant be empty" }),
  role: z.string().min(2, { message: "This is required field" }),
  salary: z.string().min(2, { message: "This cant be empty" }),
});

export function UserDetailsForm() {
  return (
    <div></div>
  );
}
// Educational background
// experience
// company preparing for
// role preparing for
// salarty range
