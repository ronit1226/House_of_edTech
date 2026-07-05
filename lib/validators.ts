import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const answerSchema = z.object({
  questionId: z.string().min(1),
  submittedAnswer: z.string().min(1),
});

export const mockRespondSchema = z.object({
  interviewId: z.string().min(1),
  response: z.string().min(3).max(2000),
});

export const resumeInterviewSchema = z.object({
  resumeText: z.string().min(80).max(12000),
  targetCompany: z.string().min(2).max(80).optional(),
});

export const projectInterviewSchema = z.object({
  projectText: z.string().min(80).max(16000),
  projectName: z.string().min(2).max(100).optional(),
});

export const companyInterviewSchema = z.object({
  company: z.enum(["Google", "Amazon", "Microsoft", "TCS", "Infosys", "Accenture", "Capgemini", "Cognizant"]),
  level: z.enum(["easy", "medium", "hard"]).default("medium"),
});

export const studyPlanSchema = z.object({
  interviewDate: z.string().min(4).max(40).optional(),
  weakTopics: z.array(z.string().min(2).max(80)).min(1).max(8),
  dailyHours: z.number().min(1).max(10).default(3),
  targetCompany: z.string().min(2).max(80).optional(),
});
