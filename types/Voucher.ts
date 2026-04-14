import {z} from 'zod'
export const VoucherSchema=z.object({
    _id:z.string(),
    typeV:z.enum(['writing','listening','speaking','reading']),
    activateAt:z.date(),
    expiredAt:z.date(),
    usedBy:z.string()
}
)
export type VoucherType=z.infer<typeof VoucherSchema>