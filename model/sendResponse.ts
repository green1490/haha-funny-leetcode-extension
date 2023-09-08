export interface SendResponse {
    problemSolved: boolean
    problem: {
        url: string;
        name: string;
    }
}