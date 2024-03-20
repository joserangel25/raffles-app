import { handlers } from "@/auth.config";

export const { GET, POST } = handlers

// Sin este endpoint, el useSession no podrá hacer las validaciones de session del lado del client