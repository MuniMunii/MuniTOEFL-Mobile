import {z} from 'zod'
export const metaTestDataScheme=z.object({
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
export type MetaTestDataInterface=z.infer<typeof metaTestDataScheme>