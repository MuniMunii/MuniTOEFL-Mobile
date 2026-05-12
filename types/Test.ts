import {z} from 'zod'
// 1. The Marks (Inline styles)
const MarkSchema = z.object({
  type: z.string(),
  attrs: z.record(z.string(),z.any()).optional(),
});
// 2. The recursive Node schema
export const JSONContentSchema: z.ZodType<any> = z.lazy(() =>
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("text"),
      text: z.string().optional(),
      marks: z.array(MarkSchema).optional(),
    }),
    z.object({
      type: z.literal("heading"),
      attrs: z.object({
        level: z.number().min(1).max(6),
        textAlign: z.string().nullable().optional(),
      }),
      content: z.array(JSONContentSchema).optional(),
    }),
    z.object({
      type: z.literal("paragraph"),
      attrs: z.object({
        textAlign: z.string().nullable().optional(),
      }).optional(),
      content: z.array(JSONContentSchema).optional().default([]),
    }),
    z.object({
      type: z.literal("doc"),
      content: z.array(JSONContentSchema),
    }),
  ])
);
export type TipTapNode = z.infer<typeof JSONContentSchema>;
// Use this for your questionScheme
export const ContentDesc = JSONContentSchema;
export const metaTestDataScheme=z.object({
    _id:z.string(),
    type:z.enum(['listening','reading','speaking','writing'],'type does not exist'),
    titleSlug:z.string(),
    title:z.string().min(8,'Must be atleast 8 characters').max(20,'No more than 20 characters'),
    description:z.string().min(8,'Must be atleast 8 characters').max(300,'No more than 300 characters'),
    isFree:z.boolean(),
    time:z.enum(['30m','60m','120m','180m']),
    published:z.boolean(),
    createdAt:z.date(),
    publishedAt:z.date().optional(),
})
export const answersTestAttemptSchema=z.object({
        cTitle:z.string(),
        questionId:z.string(), // referencing _id from questions-test
        choiceId:z.string(),
        saved:z.boolean().default(false)
    }).strict()
export const answerChoiceTestAttempt=z.object({
    _id:z.string(),
    testId:z.string(),
    qDescription:ContentDesc,
    order:z.number(),
    qTitle:z.string(),
    choices:z.array(answersTestAttemptSchema),
})
export const questionScheme=z.object({
    _id:z.string(),
    testId:z.string(),//Ref from meta test
    order:z.number(),
    qTitle:z.string(),
    qDescription:ContentDesc,
    choices:z.array(z.object({
        cTitle:z.string(),
        choiceId:z.string(),
        correctAnswer:z.boolean(),
    })).min(2,'Must contain atleast 2 elements').max(5,'5 is max elements')
})
export type AnswerChoicesTestType=z.infer<typeof answerChoiceTestAttempt>
export type MetaTestDataInterface=z.infer<typeof metaTestDataScheme>
export type QuestionType=z.infer<typeof questionScheme>
export type TypeTest="writing"|"listening"|"reading"|"speaking"