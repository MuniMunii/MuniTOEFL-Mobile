import {z} from 'zod'
export type JSONContent = {
    /**
     * The type of the node
     */
    type?: string;
    /**
     * The attributes of the node. Attributes can have any JSON-serializable value.
     */
    attrs?: Record<string, any> | undefined;
    /**
     * The children of the node. A node can have other nodes as children.
     */
    content?: JSONContent[];
    /**
     * A list of marks of the node. Inline nodes can have marks.
     */
    marks?: {
        /**
         * The type of the mark
         */
        type: string;
        /**
         * The attributes of the mark. Attributes can have any JSON-serializable value.
         */
        attrs?: Record<string, any>;
        [key: string]: any;
    }[];
    /**
     * The text content of the node. This property is only present on text nodes
     * (i.e. nodes with `type: 'text'`).
     *
     * Text nodes cannot have children, but they can have marks.
     */
    text?: string;
    [key: string]: any;
};
type HTMLContent = string;
export type Content = HTMLContent | JSONContent | JSONContent[] | null;
const ContentDesc:z.ZodType<Content>=z.any()
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