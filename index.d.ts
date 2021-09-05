export {}

declare module global {
    interface FurnaterRuleSet {
        readonly method?: "fullname" | "t-v-n";
        readonly keyword?: string;
        readonly replaceTarget?: string;
        
    }
}