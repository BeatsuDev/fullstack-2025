import type { paths } from "./api";

type ValidKeys<T> = {
    [K in keyof T]: T[K] extends undefined ? never : K;
}[keyof T];

// Get the possible methods for a specific API URL path
export type MethodsFor<Path extends ValidKeys<paths>> = Exclude<
    ValidKeys<paths[Path]>,
    "parameters" | undefined
>;

// Get the possible response codes for a specific API URL path and method
export type ResponseCodesFor<
    Path extends ValidKeys<paths>,
    Method extends MethodsFor<Path> = MethodsFor<Path>,
> = keyof paths[Path][Method]["responses"];

// Helper function to replace the need to do: paths[Path][Method]["responses"][Code]["content"]["application/json"]
export type SuccessfulResponseFor<
    Path extends ValidKeys<paths>,
    Method extends MethodsFor<Path>,
    Code extends ResponseCodesFor<Path, Method> = ResponseCodesFor<
        Path,
        Method
    >,
> = paths[Path][Method]["responses"][Code]["content"]["application/json"];
