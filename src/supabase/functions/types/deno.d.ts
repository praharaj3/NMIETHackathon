// Deno global declarations for Supabase Edge Functions
declare global {
  const Deno: {
    serve: (handler: (request: Request) => Response | Promise<Response>) => void;
    env: {
      get: (key: string) => string | undefined;
    };
  };
}

// Hono types for npm imports
declare module "npm:hono" {
  export class Hono {
    use(path: string, middleware: any): void;
    get(path: string, handler: (c: any) => any): void;
    post(path: string, handler: (c: any) => any): void;
    put(path: string, handler: (c: any) => any): void;
    delete(path: string, handler: (c: any) => any): void;
    fetch: (request: Request) => Response | Promise<Response>;
  }
}

declare module "npm:hono/cors" {
  export function cors(options: any): any;
}

declare module "npm:hono/logger" {
  export function logger(fn: (message: string) => void): any;
}

declare module "jsr:@supabase/supabase-js" {
  export function createClient(url: string, key: string): any;
}

export {};
