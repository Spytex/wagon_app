import { HttpMethod } from "@/enums/httpMethod.enum";
import { IMiddlewareOptions } from "@/interfaces/middleware.interface";

export type Middlewares = Partial<
    Record<HttpMethod, (options: IMiddlewareOptions) => any>
>
