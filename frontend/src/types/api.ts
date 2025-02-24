export type CalculationRequest = {
    expression: string;
};

export type Calculation = {
    id: string;
    expression: string;
    result: number;
};

export type CalculationError = {
    expression: string;
    error: string;
};

export type FeedbackRequest = {
    name: string;
    feedback: string;
};

export type Feedback = {
    id: string;
    name: string;
    feedback: string;
};
